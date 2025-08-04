import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatCardProps = {
    title: string;
    total: number;
    average: number;
    totalGames: number;
}

export function StatCard({ title, total, average, totalGames }: StatCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className="text4xl front-bold">{total.toLocaleString('pt-BR')}</div>
                <p className="text-sm text-muted-foreground">
                    Média de {average.toFixed(1)} por partida
                </p>
                <p className="text-xs text-muted-foreground">
                    em {totalGames} {totalGames === 1 ? 'partida' : 'partidas'}
                </p>
            </CardContent>
        </Card>
    )
}