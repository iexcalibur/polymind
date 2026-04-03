import { DynamicModule, ExecutionContext } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import {
  getRequestFromHost,
  getRequestIdFromHost,
  getRequestIdFromRequest,
  ScannerModule,
} from './base';
import { CacheModule } from './base/cache';
import { ConfigModule } from './base/config';
import { ErrorModule } from './base/error';
import { EventModule } from './base/event';
import { GqlModule } from './base/graphql';
import { HelpersModule } from './base/helpers';
import { JobModule } from './base/job';
import { LoggerModule } from './base/logger';
import { MetricsModule } from './base/metrics';
import { MutexModule } from './base/mutex';
import { PrismaModule } from './base/prisma';
import { RedisModule } from './base/redis';
import { StorageProviderModule } from './base/storage';
import { RateLimiterModule } from './base/throttler';
import { WebSocketModule } from './base/websocket';
import { AuthModule } from './core/auth';
import { CommentModule } from './core/comment';
import { ServerConfigModule, ServerConfigResolverModule } from './core/config';
import { DocStorageModule } from './core/doc';
import { DocRendererModule } from './core/doc-renderer';
import { DocServiceModule } from './core/doc-service';
import { FeatureModule } from './core/features';
import { LocalAuthModule } from './core/local-auth';
import { MailModule } from './core/mail';
import { MonitorModule } from './core/monitor';
import { NotificationModule } from './core/notification';
import { PermissionModule } from './core/permission';
import { QuotaModule } from './core/quota';
import { SelfhostModule } from './core/selfhost';
import { StaticFileModule } from './core/static-files';
import { StorageModule } from './core/storage';
import { SyncModule } from './core/sync';
import { UserModule } from './core/user';
import { VersionModule } from './core/version';
import { WorkspaceModule } from './core/workspaces';
import { Env } from './env';
import { ModelsModule } from './models';
import { CopilotModule } from './plugins/copilot';
import { IndexerModule } from './plugins/indexer';
import { WorkerModule } from './plugins/worker';

export const FunctionalityModules = [
  ClsModule.forRoot({
    global: true,
    middleware: {
      mount: true,
      generateId: true,
      idGenerator(req: Request) {
        return getRequestIdFromRequest(req, 'http');
      },
      setup(cls, req: Request, res: Response) {
        res.setHeader('X-Request-Id', cls.getId());
        cls.set(CLS_REQUEST_HOST, req.hostname);
      },
    },
    interceptor: {
      mount: true,
      generateId: true,
      idGenerator(context: ExecutionContext) {
        return getRequestIdFromHost(context);
      },
      setup(cls, context: ExecutionContext) {
        const req = getRequestFromHost(context);
        cls.set(CLS_REQUEST_HOST, req.hostname);
      },
    },
    plugins: [
      new ClsPluginTransactional({
        adapter: new TransactionalAdapterPrisma({
          prismaInjectionToken: PrismaClient,
        }),
      }),
    ],
  }),
  LoggerModule,
  ScannerModule,
  PrismaModule,
  EventModule,
  ConfigModule,
  RedisModule,
  CacheModule,
  MutexModule,
  MetricsModule,
  RateLimiterModule,
  StorageProviderModule,
  HelpersModule,
  ErrorModule,
  WebSocketModule,
  JobModule.forRoot(),
  ModelsModule,
  ScheduleModule.forRoot(),
  MonitorModule,
];

export class AppModuleBuilder {
  private readonly modules: PolyMindModule[] = [];

  use(...modules: PolyMindModule[]): this {
    modules.forEach(m => {
      this.modules.push(m);
    });

    return this;
  }

  useIf(predicator: () => boolean, ...modules: PolyMindModule[]): this {
    if (predicator()) {
      this.use(...modules);
    }

    return this;
  }

  compile(): DynamicModule {
    class AppModule {}

    return {
      module: AppModule,
      imports: this.modules,
      controllers: [AppController],
    };
  }
}

export function buildAppModule(env: Env) {
  const factor = new AppModuleBuilder();

  factor
    .use(...FunctionalityModules)

    .useIf(
      () => env.flavors.graphql || env.flavors.doc || env.flavors.front,
      IndexerModule
    )

    // auth + permissions (needed by copilot)
    .use(UserModule, AuthModule, PermissionModule, LocalAuthModule)

    // core persistence + config
    .use(
      ServerConfigModule,
      FeatureModule,
      QuotaModule,
      DocStorageModule,
      NotificationModule,
      MailModule
    )
    .useIf(() => env.flavors.renderer || env.flavors.front, DocRendererModule)
    .useIf(() => env.flavors.sync || env.flavors.front, SyncModule)

    // graphql API + copilot
    .useIf(
      () => env.flavors.graphql,
      GqlModule,
      VersionModule,
      StorageModule,
      ServerConfigResolverModule,
      WorkspaceModule,
      CopilotModule,
      CommentModule
    )
    .useIf(() => env.flavors.doc || env.flavors.front, DocServiceModule)
    .useIf(() => env.dev || env.selfhosted, WorkerModule, SelfhostModule)
    .useIf(() => env.flavors.front, StaticFileModule);

  return factor.compile();
}

export const AppModule = buildAppModule(env);
