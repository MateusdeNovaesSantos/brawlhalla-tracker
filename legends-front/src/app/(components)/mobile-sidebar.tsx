'use client';

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { MainNav } from './main-nav';

export function MobileSidebar() {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6"/>
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="p-4 border-b">
                            <SheetTitle className="text-2xl font-bold text-center">Brawlhalla</SheetTitle>
                        </SheetHeader>
                        <div className="flex-1 px-4 py-6">
                            <MainNav />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}