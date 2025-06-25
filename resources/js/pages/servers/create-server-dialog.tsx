import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const minecraftVersions = [
    '1.21.0',
    '1.20.6',
    '1.20.4',
    '1.20.3',
    '1.20.2',
    '1.20.1',
    '1.19.4',
    '1.19.3',
    '1.19.2',
    '1.18.2',
    '1.17.1',
    '1.16.5',
    '1.12.2',
    '1.7.10',
];

export function CreateServerDialog() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        version: minecraftVersions[0] || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('servers.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
            onError: (formErrors) => {
                console.error('Server creation failed:', formErrors);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create new server</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create your server</DialogTitle>
                        <DialogDescription> Provide the details for your new Minecraft server.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="server-name">Server name</Label>
                            <Input
                                id="server-name"
                                name="name"
                                placeholder="Test server"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="server-version">Minecraft Version</Label>
                            <Select value={data.version} onValueChange={(value) => setData('version', value)} disabled={processing}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a version" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Minecraft Versions</SelectLabel>
                                        {minecraftVersions.map((version) => (
                                            <SelectItem key={version} value={version}>
                                                {version}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.version && <p className="text-sm text-red-500">{errors.version}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={processing}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
