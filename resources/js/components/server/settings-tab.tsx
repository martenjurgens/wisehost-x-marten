import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Server } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    server: Server;
}

export default function SettingsTab({ server }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: server.name,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('servers.settings.update', { server: server.id }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">Server Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your server's core configuration.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <Label htmlFor="server-name-setting">Server Name</Label>
                    <Input
                        id="server-name-setting"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                    />

                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save Settings'}
                </Button>
            </div>
        </form>
    );
}
