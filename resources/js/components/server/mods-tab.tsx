import ModCard from '@/components/server/mod-card';
import { Mod, Server } from '@/types';

interface Props {
    server: Server;
    mods: Mod[];
}

export default function ModsTab({ server, mods }: Props) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">Mod Manager</h2>
                <p className="text-sm text-muted-foreground">Enable or disable mods for your server.</p>
            </div>

            {mods && mods.length > 0 ? (
                <div className="space-y-4">
                    {mods.map((mod) => (
                        <ModCard key={mod.id} serverId={server.id} mod={mod} />
                    ))}
                </div>
            ) : (
                <div className="col-span-full rounded-xl border bg-gray-50 p-8 text-center text-gray-500 dark:bg-gray-800">
                    <p className="text-lg">No available mods found. Please check back later!</p>
                </div>
            )}
        </div>
    );
}
