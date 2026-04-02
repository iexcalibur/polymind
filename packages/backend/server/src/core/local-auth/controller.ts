import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { Models } from '../../models';
import {
  CurrentUser,
  type CurrentUser as CurrentUserType,
  Public,
} from '../auth';
import { AuthService } from '../auth/service';
import { ServerService } from '../config';

const LOCAL_USER_EMAIL = 'local@ploy-note.local';
const LOCAL_USER_NAME = 'Local Admin';

@Controller('/api/local')
export class LocalAuthController {
  constructor(
    private readonly models: Models,
    private readonly auth: AuthService,
    private readonly serverService: ServerService
  ) {}

  @Public()
  @Get('/auth')
  async localAuth(@Req() req: Request, @Res() res: Response) {
    let user = await this.models.user.getUserByEmail(LOCAL_USER_EMAIL, {
      withDisabled: false,
    });

    if (!user) {
      user = await this.models.user.create({
        email: LOCAL_USER_EMAIL,
        name: LOCAL_USER_NAME,
        emailVerifiedAt: new Date(),
        registered: true,
      });
    }

    await this.auth.setCookies(req, res, user.id);
    return res.json({ id: user.id, email: user.email, name: user.name });
  }

  @Post('/ai-config')
  async setAIConfig(
    @CurrentUser() user: CurrentUserType,
    @Body() body: { provider: string; apiKey: string; baseURL?: string }
  ) {
    const { provider, apiKey, baseURL } = body;

    const updates: Array<{ module: string; key: string; value: unknown }> = [
      { module: 'copilot', key: 'enabled', value: true },
      {
        module: 'copilot',
        key: `providers.${provider}`,
        value: baseURL ? { apiKey, baseURL } : { apiKey },
      },
    ];

    await this.serverService.updateConfig(user.id, updates);
    return { success: true };
  }
}
