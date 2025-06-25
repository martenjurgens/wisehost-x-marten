import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import { ServerMod } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { UploadModDialog } from './upload-mod-dialog';

interface Props {
    mods: ServerMod[];
}

const breadcrumbs = [
    { title: 'Admin', href: '/dashboard' },
    { title: 'Mod Management', href: '/admin/mods' },
];

export default function AdminModsIndex({ mods }: Props) {
    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleDeleteMod = (modId: number) => {
        if (confirm('Are you sure you want to delete this mod? This action cannot be undone.')) {
            router.delete(route('admin.mods.destroy', modId), {
                onSuccess: () => {
                    console.log('Mod deleted successfully!');
                },
                onError: (errors) => {
                    console.error('Failed to delete mod:', errors);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mod Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Uploaded Mods</CardTitle>
                                <CardDescription>Manage all the Minecraft mods available for your servers.</CardDescription>
                            </div>
                            <UploadModDialog />
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Game Version</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>File Name</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Uploaded At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mods.length > 0 ? (
                                        mods.map((mod) => (
                                            <TableRow key={mod.id}>
                                                <TableCell className="font-medium">{mod.name}</TableCell>
                                                <TableCell>{mod.game_version}</TableCell>
                                                <TableCell>{mod.author || 'N/A'}</TableCell>
                                                <TableCell>{mod.file_name}</TableCell>
                                                <TableCell>{formatBytes(mod.file_size)}</TableCell>
                                                <TableCell>{new Date(mod.updated_at).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => handleDeleteMod(mod.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-24 text-center">
                                                No mods uploaded yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
