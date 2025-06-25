import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

interface ConsoleLine {
    id: number;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'SYSTEM';
    message: string;
    color: string;
}

interface ServerConsoleProps {
    isServerRunning?: boolean;
    initialLogs?: ConsoleLine[];
}

export default function ServerConsole({ isServerRunning = true, initialLogs }: ServerConsoleProps) {
    const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>(
        initialLogs || [
            {
                id: 1,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                level: 'INFO',
                message: 'Server console initialized.',
                color: 'text-gray-300',
            },
            {
                id: 2,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                level: 'SYSTEM',
                message: 'Type anything in the input below.',
                color: 'text-green-400',
            },
            {
                id: 3,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                level: 'INFO',
                message: 'Welcome to your server console demo!',
                color: 'text-gray-300',
            },
            {
                id: 4,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                level: 'DEBUG',
                message: 'Current time: ' + new Date().toLocaleString(),
                color: 'text-blue-400',
            },
        ],
    );
    const [consoleInput, setConsoleInput] = useState('');

    const handleSendMessage = () => {
        if (!consoleInput.trim()) return;

        const newMessage: ConsoleLine = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            level: 'INFO',
            message: `> ${consoleInput}`,
            color: 'text-cyan-400',
        };

        setConsoleLines((prev) => [...prev, newMessage]);
        setConsoleInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="space-y-4">
            <div className="rounded-lg border border-gray-700 bg-black">
                <div className="rounded-t-lg border-b border-gray-700 bg-gray-900 p-3">
                    <div className="flex items-center gap-2">
                        <span className="ml-2 text-sm text-gray-400">Console Output</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-xs text-gray-400 hover:text-white"
                            onClick={() => setConsoleLines([])}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
                <ScrollArea className="h-96 p-4">
                    <div className="space-y-1 font-mono text-sm">
                        {consoleLines.length === 0 ? (
                            <div className="text-gray-500 italic">Console is empty.</div>
                        ) : (
                            consoleLines.map((line) => (
                                <div key={line.id} className="flex gap-2">
                                    <span className="min-w-[70px] text-xs text-gray-500">[{line.timestamp}]</span>
                                    <span
                                        className={`min-w-[45px] rounded px-1 text-center text-xs ${
                                            line.level === 'INFO'
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : line.level === 'WARN'
                                                  ? 'bg-yellow-500/20 text-yellow-400'
                                                  : line.level === 'ERROR'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : line.level === 'SYSTEM'
                                                      ? 'bg-purple-500/20 text-purple-400'
                                                      : 'bg-gray-500/20 text-gray-400'
                                        }`}
                                    >
                                        {line.level}
                                    </span>
                                    <span className={line.color}>{line.message}</span>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>

            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Input
                        value={consoleInput}
                        onChange={(e) => setConsoleInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isServerRunning ? 'Type something...' : 'Server is offline'}
                        disabled={!isServerRunning}
                        className="border-gray-700 bg-gray-800 pl-8 font-mono text-white placeholder-gray-400 focus:border-orange-500"
                    />
                    <span className="absolute top-1/2 left-2 -translate-y-1/2 transform font-mono text-gray-400">&gt;</span>
                </div>
            </div>
        </div>
    );
}
