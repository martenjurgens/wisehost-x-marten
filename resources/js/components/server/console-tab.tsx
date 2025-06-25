import ServerConsole from '@/components/server/server-console';

export default function ConsoleTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">Server console</h2>
                <p className="text-sm text-muted-foreground">Manage your server's console</p>
            </div>

            <ServerConsole />
        </div>
    );
}
