import { ServerCard } from '@/components/server/server-card';
import AppLayout from '@/layouts/app-layout';
import { UserServer, type BreadcrumbItem } from '@/types';
import { Head, usePoll } from '@inertiajs/react';
import { CreateServerDialog } from './create-server-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My servers',
        href: '/my-servers',
    },
];

interface Props {
    servers: UserServer[];
}

export default function ServersList({ servers }: Props) {
    usePoll(2000);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="font-medium">My servers</h2>
                    <div className="flex justify-end">
                        <CreateServerDialog />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {servers?.length > 0 ? (
                        servers.map((server) => {
                            return <ServerCard key={server.id} server={server} />;
                        })
                    ) : (
                        <div className="col-span-full rounded-xl border bg-gray-50 p-8 text-center text-gray-500 dark:bg-gray-800">
                            <p className="text-lg">No servers found.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
