import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Mod } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    serverId: number;
    mod: Mod;
}

export default function ModCard({ serverId, mod }: Props) {
    const [isEnabled, setIsEnabled] = useState(mod.is_enabled);
    const [isLoading, setIsLoading] = useState(false);

    const { name, id, game_version, author, description, updated_at } = mod;

    const handleToggleChange = (checked: boolean) => {
        setIsLoading(true);
        setIsEnabled(checked);

        router.post(
            route('servers.mods.toggle', { server: serverId, mod: id }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onError: () => {
                    setIsEnabled(!checked);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            },
        );
    };

    return (
        <Card className="mb-4 flex flex-row items-center space-x-4 rounded-lg bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground">
                    {name.charAt(0).toUpperCase()}
                </div>
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="truncate text-lg font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground">
                        <span className="ml-1">Game version {game_version}</span> - by <span className="text-primary">{author}</span>
                    </p>
                </div>
                <p className="truncate text-sm text-muted-foreground">{description}</p>
            </div>

            <div className="ml-auto flex items-center space-x-4">
                <p className="text-sm whitespace-nowrap text-muted-foreground">Updated {new Date(updated_at).toLocaleDateString()}</p>
                <Switch
                    checked={isEnabled}
                    onCheckedChange={handleToggleChange}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-chart-1 data-[state=unchecked]:bg-muted"
                />
            </div>
        </Card>
    );
}
