import { Home, PlusCircle, User, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/herbier', label: 'Mon Herbier', icon: BookOpen },
    { path: '/nouveau', label: 'Nouveau', icon: PlusCircle },
    { path: '/profil', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#87a878]/20 shadow-2xl z-50 safe-area-bottom">
      <div className="max-w-5xl mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-all min-w-[70px] ${
                  isActive
                    ? 'bg-[#87a878]/10 text-[#87a878]'
                    : 'text-[#717182] hover:text-[#87a878]'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
