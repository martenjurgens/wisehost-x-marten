import ServerInfo from '@/components/server/server-info';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Server } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';
import AppLayout from './app-layout';

const serverNavItems = [
    { title: 'Settings', route: 'servers.settings' },
    { title: 'Mods', route: 'servers.mods' },
    { title: 'File Manager', route: 'servers.files' },
    { title: 'Console', route: 'servers.console' },
];

export default function ServerDetailLayout({ children }: PropsWithChildren) {
    const { server } = usePage<{ server: Server }>().props;
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const NavLinks = () => (
        <nav className="flex flex-col space-y-1">
            {serverNavItems.map((item) => (
                <Button
                    key={item.route}
                    asChild
                    variant="ghost"
                    className={cn('w-full justify-start', {
                        'bg-muted hover:bg-muted': route().current(item.route),
                    })}
                    onClick={() => setIsSheetOpen(false)}
                >
                    <Link href={route(item.route, { server: server.id })}>{item.title}</Link>
                </Button>
            ))}
        </nav>
    );

    return (
        <AppLayout>
            <div className="flex h-full min-h-[calc(100vh-65px)]">
                <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
                    <ServerInfo server={server} />
                    <Separator />
                    <div className="p-4">
                        <NavLinks />
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-between lg:hidden">
                        <h2 className="text-xl font-semibold">{serverNavItems.find((item) => route().current(item.route))?.title}</h2>
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72 p-4">
                                <ServerInfo server={server} />
                                <Separator className="my-4" />
                                <NavLinks />
                            </SheetContent>
                        </Sheet>
                    </div>
                    <Separator className="my-4 lg:hidden" />

                    {children}
                </main>
            </div>
        </AppLayout>
    );
}
