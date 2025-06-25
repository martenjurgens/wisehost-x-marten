import ConsoleTab from '@/components/server/console-tab';
import ServerDetailLayout from '@/layouts/server-detail-layout';
import { Server } from '@/types';
import { Head } from '@inertiajs/react';

export default function ConsolePage({ server }: { server: Server }) {
    return (
        <>
            <Head title={`${server.name} - Mods`} />
            <ConsoleTab />
        </>
    );
}

ConsolePage.layout = (page: React.ReactNode) => <ServerDetailLayout children={page} />;
