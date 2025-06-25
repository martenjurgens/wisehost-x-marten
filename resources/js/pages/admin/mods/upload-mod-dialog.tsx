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
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';

export function UploadModDialog() {
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        game_version: '',
        author: '',
        description: '',
        mod_file: null as File | null,
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('mod_file', e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.mods.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onError: (formErrors) => {
                console.error('Mod upload failed:', formErrors);
            },

            forceFormData: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Upload new mod</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Upload New Mod</DialogTitle>
                        <DialogDescription>Provide details and upload the mod file (JAR or ZIP).</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="mod-name" className="text-right">
                                Mod Name
                            </Label>
                            <Input
                                id="mod-name"
                                name="name"
                                placeholder="JEI (Just Enough Items)"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                className="col-span-3"
                            />
                            {errors.name && <p className="col-span-4 text-center text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="game-version" className="text-right">
                                Game Version
                            </Label>
                            <Input
                                id="game-version"
                                name="game_version"
                                placeholder="1.20.1"
                                value={data.game_version}
                                onChange={(e) => setData('game_version', e.target.value)}
                                disabled={processing}
                                className="col-span-3"
                            />
                            {errors.game_version && <p className="col-span-4 text-center text-sm text-red-500">{errors.game_version}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="author" className="text-right">
                                Author (Optional)
                            </Label>
                            <Input
                                id="author"
                                name="author"
                                placeholder="Mod Developer"
                                value={data.author}
                                onChange={(e) => setData('author', e.target.value)}
                                disabled={processing}
                                className="col-span-3"
                            />
                            {errors.author && <p className="col-span-4 text-center text-sm text-red-500">{errors.author}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description (Optional)
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="A brief description of the mod."
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                disabled={processing}
                                className="col-span-3"
                            />
                            {errors.description && <p className="col-span-4 text-center text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="mod-file" className="text-right">
                                Mod File
                            </Label>
                            <Input
                                id="mod-file"
                                name="mod_file"
                                type="file"
                                accept=".jar,.zip"
                                onChange={handleFileChange}
                                disabled={processing}
                                className="col-span-3"
                                ref={fileInputRef}
                            />
                            {errors.mod_file && <p className="col-span-4 text-center text-sm text-red-500">{errors.mod_file}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={processing}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Upload Mod'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
