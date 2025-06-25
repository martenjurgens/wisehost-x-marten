import ModsTab from '@/components/server/mods-tab';
import ServerDetailLayout from '@/layouts/server-detail-layout';
import { Mod, Server } from '@/types';
import { Head } from '@inertiajs/react';

export default function ModsPage({ server, mods }: { server: Server; mods: Mod[] }) {
    return (
        <>
            <Head title={`${server.name} - Mods`} />
            <ModsTab server={server} mods={mods} />
        </>
    );
}

ModsPage.layout = (page: React.ReactNode) => <ServerDetailLayout children={page} />;
