import FileManagerTab from '@/components/server/file-manager-tab';
import ServerDetailLayout from '@/layouts/server-detail-layout';
import { FileNode, Server } from '@/types';
import { Head } from '@inertiajs/react';

export default function FileManagerPage({ server, files }: { server: Server; files: FileNode[] }) {
    return (
        <>
            <Head title={`${server.name} - File manager`} />
            <FileManagerTab files={files} />
        </>
    );
}

FileManagerPage.layout = (page: React.ReactNode) => <ServerDetailLayout children={page} />;
