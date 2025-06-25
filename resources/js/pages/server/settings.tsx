import SettingsTab from '@/components/server/settings-tab';
import ServerDetailLayout from '@/layouts/server-detail-layout';
import { Server } from '@/types';
import { Head, usePoll } from '@inertiajs/react';

export default function SettingsPage({ server }: { server: Server }) {
    usePoll(2000, { only: ['server'] });

    return (
        <>
            <Head title={`${server.name} - Settings`} />
            <SettingsTab server={server} />
        </>
    );
}

SettingsPage.layout = (page: React.ReactNode) => <ServerDetailLayout children={page} />;
