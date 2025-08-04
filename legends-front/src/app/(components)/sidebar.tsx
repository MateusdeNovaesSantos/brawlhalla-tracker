import { MainNav } from './main-nav';

export function Sidebar() {
    return (
        <aside className="hidden md:block fixed left-0 top-0 h-full w-64 border-r bg-background z-10">
            <div className="flex flex-col h-full">
                <header className="p-4.5 border-b">
                    <h2 className="text-2xl font-bold text-center">Brawhalla</h2>
                </header>
                <div className="flex-1 px-4 py-6">
                    <MainNav />
                </div>
            </div>
        </aside>
    )
}