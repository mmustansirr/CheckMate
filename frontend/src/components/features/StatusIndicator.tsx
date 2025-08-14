'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useHealthCheck } from '@/hooks/usePrediction';

type StatusType = 'online' | 'offline' | 'checking';

export function StatusIndicator() {
  const { data: healthData, isLoading, error } = useHealthCheck();

  const getStatus = (): { status: StatusType; color: string; icon: typeof CheckCircle } => {
    if (isLoading) return { status: 'checking', color: 'yellow', icon: Wifi };
    if (error || !healthData) return { status: 'offline', color: 'red', icon: WifiOff };
    return { status: 'online', color: 'green', icon: CheckCircle };
  };

  const { status, color, icon: Icon } = getStatus();

  const statusConfig: Record<StatusType, { text: string; bgColor: string; textColor: string }> = {
    online: { text: 'API Online', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    offline: { text: 'API Offline', bgColor: 'bg-red-100', textColor: 'text-red-800' },
    checking: { text: 'Checking...', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 right-4 z-40"
    >
      <Badge 
        variant="outline" 
        className={`${config.bgColor} ${config.textColor} border-0 shadow-lg backdrop-blur-sm`}
      >
        <motion.div
          animate={status === 'checking' ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mr-2"
        >
          <Icon className="h-3 w-3" />
        </motion.div>
        {config.text}
      </Badge>
    </motion.div>
  );
}
