import ServerStatusChip from '@/components/server-status-chip';
import { Button } from '@/components/ui/button';
import { Server } from '@/types';
import { Copy } from 'lucide-react';

export default function ServerInfo({ server }: { server: Server }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(server.ip_address ?? '');
    };

    return (
        <div className="p-4">
            <div className="flex flex-col items-start">
                <p className="mt-2 mb-2 text-sm text-muted-foreground">Status</p>
                <ServerStatusChip status={server.status} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Server name</p>
            <p className="text-md font-medium">{server.name}</p>

            <p className="mt-2 text-sm text-muted-foreground">IP Address</p>

            <span className="flex items-center justify-between gap-2">
                <p className="text-md font-medium">
                    {server.ip_address}:{server.port}
                </p>
                <Button variant="ghost" size="icon" className="size-8" onClick={handleCopy}>
                    <Copy />
                </Button>
            </span>
        </div>
    );
}
