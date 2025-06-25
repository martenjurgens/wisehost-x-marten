import { FileNode } from '@/types';
import FileTreeNode from './file-tree-node';

export default function FileManagerTab({ files }: { files: FileNode[] }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">File Manager</h2>
                <p className="text-sm text-muted-foreground">Browse and manage your server's files.</p>
            </div>
            <div className="rounded-md border bg-card p-4 font-mono text-sm">
                {files?.length > 0 ? (
                    files?.map((node) => <FileTreeNode key={node.path} node={node} />)
                ) : (
                    <p className="text-muted-foreground">No files or folders found.</p>
                )}
            </div>
        </div>
    );
}
