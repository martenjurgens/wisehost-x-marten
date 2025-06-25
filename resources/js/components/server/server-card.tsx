import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserServer } from '@/types';
import { Link, router } from '@inertiajs/react';
import { CircleStop, Copy, Cpu, Eye, Globe, HardDrive, Loader2, Play, Zap } from 'lucide-react';
import { useState } from 'react';
import MinecraftLogoIcon from '../minecraft-logo-icon';
import ServerStatusChip from '../server-status-chip';

interface Props {
    server: UserServer;
}

export function ServerCard({ server }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(server.ip_address ?? '');
    };

    const canStart = server.status === 'offline';
    const isOnline = server.status === 'online';
    const canStop = server.status === 'online';
    const isTransitioning = server.status === 'starting' || server.status === 'stopping';

    const handleServerAction = (action: 'start' | 'stop') => {
        setIsProcessing(true);

        router.post(
            route(`servers.${action}`, server.id),
            {},
            {
                onFinish: () => setIsProcessing(false),
                preserveScroll: true,
            },
        );
    };

    const getButtonConfig = () => {
        if (canStart) {
            return {
                onClick: () => handleServerAction('start'),
                className: 'bg-green-600 text-white hover:bg-green-700',
                text: 'Start',
                icon: Play,
            };
        }

        if (canStop) {
            return {
                onClick: () => handleServerAction('stop'),
                className: 'bg-red-600 text-white hover:bg-red-700',
                text: 'Stop',
                icon: CircleStop,
            };
        }

        return {
            onClick: () => {},
            className: 'cursor-not-allowed bg-gray-400',
            text: server.status === 'starting' ? 'Starting...' : 'Stopping...',
            icon: Loader2,
        };
    };

    const buttonConfig = getButtonConfig();
    const IconComponent = buttonConfig.icon;

    return (
        <Card className="relative w-full bg-white/30 transition-all duration-300 hover:shadow-lg dark:from-slate-900 dark:to-slate-800">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <MinecraftLogoIcon className="h-7 w-7" />
                    <CardTitle>{server.name}</CardTitle>
                </div>
                <CardDescription>Version: {server.version}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="flex-1 truncate">{server.ip_address ?? 'Unassigned'}</span>

                    <Button variant="ghost" size="icon" className="size-8" onClick={handleCopy}>
                        <Copy />
                    </Button>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/30">
                        <div className="mb-1 flex items-center justify-center gap-1">
                            <Cpu className="h-3 w-3 text-blue-500" />
                        </div>
                        <div className="text-xs font-medium">{isOnline ? 45 : 0}%</div>
                        <div className="text-xs text-muted-foreground">CPU</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/30">
                        <div className="mb-1 flex items-center justify-center gap-1">
                            <HardDrive className="h-3 w-3 text-purple-500" />
                        </div>
                        <div className="text-xs font-medium">{isOnline ? 67 : 0}%</div>
                        <div className="text-xs text-muted-foreground">RAM</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/30">
                        <div className="mb-1 flex items-center justify-center gap-1">
                            <Zap className="h-3 w-3 text-green-500" />
                        </div>
                        <div className="text-xs font-medium">
                            {isOnline ? 11 : 0}/{20}
                        </div>
                        <div className="text-xs text-muted-foreground">Players</div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-end justify-end gap-4">
                <Link href={route('servers.show', server.id)} prefetch>
                    <Button variant="outline" className="flex-1 bg-white/50 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800" size={'lg'}>
                        <Eye className="h-4 w-4" />
                        View
                    </Button>
                </Link>

                <Button className={buttonConfig.className} disabled={isTransitioning || isProcessing} onClick={buttonConfig.onClick} size="lg">
                    <IconComponent className={`h-4 w-4 ${isTransitioning ? 'animate-spin' : ''}`} />
                    {buttonConfig.text}
                </Button>
            </CardFooter>

            <div className="absolute top-2 right-2">
                <ServerStatusChip status={server.status} />
            </div>
        </Card>
    );
}
