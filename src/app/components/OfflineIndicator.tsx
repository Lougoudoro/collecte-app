import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-20 right-4 rounded-full px-4 py-2 shadow-lg border-2 text-sm z-40 transition-all ${
        isOnline
          ? 'bg-white border-[#87a878]/30 text-[#5a5245]'
          : 'bg-[#d4a574] border-[#d4a574] text-white animate-pulse'
      }`}
    >
      <div className="flex items-center gap-2">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4 text-[#87a878]" />
            <span>Mode local</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Hors ligne</span>
          </>
        )}
      </div>
    </div>
  );
}
