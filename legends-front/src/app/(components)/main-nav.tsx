'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Swords, Palette, Search } from 'lucide-react';

const navItems = [
    { href: '/games', label: 'Games', icon: Swords },
    { href: '/cores', label: 'Cores', icon: Palette },
    { href: '/busca-cor', label: 'Busca por cor', icon: Search },
]

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

    return (
        <nav className={cn('flex flex-col space-y-2', className)} {...props}>
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return(
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            isActive && 'bg-muted text-primary'
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                )
            })}
        </nav>
    )
}