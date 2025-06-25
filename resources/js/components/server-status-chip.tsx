import { ServerStatus } from '@/types';
import { Badge } from './ui/badge';

const statusConfig = {
    online: { color: 'bg-green-500', text: 'Online', pulse: true },
    offline: { color: 'bg-red-500', text: 'Offline', pulse: false },
    starting: { color: 'bg-yellow-500', text: 'Starting', pulse: true },
    stopping: { color: 'bg-orange-500', text: 'Stopping', pulse: true },
};

interface Props {
    status: ServerStatus;
}

export default function ServerStatusChip({ status }: Props) {
    const config = statusConfig[status];

    return (
        <Badge variant="secondary" className="gap-2">
            <div className={`h-2 w-2 rounded-full ${config.color} ${config.pulse ? 'animate-pulse' : ''}`} />
            {config.text}
        </Badge>
    );
}
