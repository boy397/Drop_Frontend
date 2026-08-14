'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomBar() {
  const pathname = usePathname();
  
  const navItems = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Shop', icon: 'storefront', path: '/products' },
    { label: 'Rewards', icon: 'redeem', path: '/rewards' },
    { label: 'About Us', icon: 'info', path: '/about' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-[20px] pb-8 pt-2 bg-primary/80 dark:bg-primary/80 backdrop-blur-xl shadow-[0_-4px_30px_rgba(125,211,252,0.05)] rounded-t-xl md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.path || (item.path === '/products' && pathname.startsWith('/products'));
        return (
          <Link 
            key={item.label}
            href={item.path}
            className={isActive 
              ? "flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-4 py-1 hover:bg-surface-variant/20 scale-98 transition-all duration-200"
              : "flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant/20 transition-all duration-200 px-4 py-1"
            }
          >
            <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
              {item.icon}
            </span>
            <span className="text-label-md font-label-md">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
