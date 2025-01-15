import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as httpProxy from 'http-proxy';
import { LoadBalancerService, LoadBalancerStrategy, ServerInfo } from "./load-balancer.service";

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
    private logger = new Logger(ProxyMiddleware.name);
    private readonly proxy = httpProxy.createProxyServer();

    private readonly servers: ServerInfo[] = [
        { url: 'http://localhost:3001', connections: 0 },
        { url: 'http://localhost:3002', connections: 0 },
        { url: 'http://localhost:3003', connections: 0 },
    ];

    private readonly loadBalancer = new LoadBalancerService(this.servers)
    private readonly strategy: LoadBalancerStrategy = 'round-robin';

    use(req: Request, res: Response, next: NextFunction) {
        const server = this.loadBalancer.getNextServer(this.strategy);
        this.loadBalancer.incrementConnections(server);

        this.logger.log(`Proxying to: ${server.url}${req.url} (strategy: ${this.strategy})`);

        this.proxy.web(req, res, { target: server.url }, (err) => {
            this.logger.error(`Proxy Error: ${err.message}`);
            return res.status(500).send('Internal Proxy Error');
        });

        res.on('finish', () => {
            this.loadBalancer.decrementConnections(server);
        })
    }
}
