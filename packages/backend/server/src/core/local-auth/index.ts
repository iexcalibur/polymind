import { Module } from '@nestjs/common';

import { AuthModule } from '../auth';
import { ServerConfigModule } from '../config';
import { LocalAuthController } from './controller';

@Module({
  imports: [AuthModule, ServerConfigModule],
  controllers: [LocalAuthController],
})
export class LocalAuthModule {}
