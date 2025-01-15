import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProxyMiddleware } from './proxy.middleware';

@Module({})
export class ProxyModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ProxyMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
