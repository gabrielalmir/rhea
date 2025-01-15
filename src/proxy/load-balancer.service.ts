export type LoadBalancerStrategy = 'round-robin' | 'least-connections' | 'random';

export interface ServerInfo {
    url: string;
    connections: number;
}

export class LoadBalancerService {
    private currentServerIndex = 0;

    constructor(private servers: ServerInfo[]) { }

    getNextServerRoundRobin(): ServerInfo {
        const server = this.servers[this.currentServerIndex];
        this.currentServerIndex = (this.currentServerIndex + 1) % this.servers.length;
        return server;
    }

    getNextServerLeastConnections(): ServerInfo {
        return this.servers.reduce((prev, curr) => (curr.connections < prev.connections ? curr : prev));
    }

    getNextServerRandom(): ServerInfo {
        const randomIndex = Math.floor(Math.random() * this.servers.length);
        return this.servers[randomIndex];
    }

    getNextServer(strategy: LoadBalancerStrategy): ServerInfo {
        switch (strategy) {
            case 'round-robin':
                return this.getNextServerRoundRobin();
            case 'least-connections':
                return this.getNextServerLeastConnections();
            case 'random':
                return this.getNextServerRandom();
            default:
                throw new Error(`Unknown Balancing Strategy: ${strategy}`);
        }
    }

    incrementConnections(server: ServerInfo): void {
        server.connections++;
    }

    decrementConnections(server: ServerInfo): void {
        server.connections = Math.max(0, server.connections - 1);
    }
}
