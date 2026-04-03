import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { PolyMindLogger } from './service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PolyMindLogger],
  exports: [PolyMindLogger],
})
export class LoggerModule {}

export { PolyMindLogger } from './service';
