import { Module } from '@nestjs/common';

export { CallMetric, metrics, wrapCallMetric } from './metrics';

@Module({})
export class MetricsModule {}
