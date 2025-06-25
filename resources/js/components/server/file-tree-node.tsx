import { FileNode } from '@/types';
import { FileIcon, Folder } from 'lucide-react';

export default function FileTreeNode({ node }: { node: FileNode }) {
    const isDirectory = node.type === 'directory';

    return (
        <div className="pl-4">
            <div className="flex items-center space-x-2 py-1">
                {isDirectory ? <Folder className="h-5 w-5 text-sky-500" /> : <FileIcon className="h-5 w-5 text-gray-500" />}
                <span>{node.name}</span>
            </div>

            {isDirectory && node.children && (
                <div className="border-l border-gray-200 dark:border-gray-700">
                    {node.children.map((childNode) => (
                        <FileTreeNode key={childNode.path} node={childNode} />
                    ))}
                </div>
            )}
        </div>
    );
}
