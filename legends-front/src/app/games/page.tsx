'use client';

import { useEffect, useState } from 'react';
import { Combobox } from '@/components/combobox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { fetchLegends, fetchWeapons, fetchGameStats } from '@/lib/api';
import { StatCard } from '../(components)/stat-card';
import { Skeleton } from '@/components/ui/skeleton';
import { AddGameForm } from '../(components)/add-game-form';

// Tipos para dados que vão ser buscados
type Legend = { id: number; name: string };
type Weapon = { id: number; name: string };

type StatsObject = {
    totalGames: number;
    victories: number;
    losses: number;
    totalGold: number;
    totalXp: number;
    averageGold: number;
    averageXp: number;
};
type GameStats = {
    stats: StatsObject;
};
 
export default function GamesPage() {
    // Estados p/ popular os seletores
    const [legends, setLegends] = useState<Legend[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);

    // Estado para controlar os filtros selecionados pelo usuário
    const [filterType, setFilterType] = useState<'legend' | 'weapon'>('legend');
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [period, setPeriod] = useState<'7d' | '15d' | '30d' | '6m' | '1y'>('7d');
    const [result, setResult] = useState<'all' | 'win' | 'lose'>('all');

    // Estado para guardar os dados recebidos da API
    const [stats, setStats] = useState<GameStats | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [refetchTrigger, setRefetchTrigger] = useState(0);

    // // Efeito para buscar os dados dos seletores (legends e weapons) uma vez
    useEffect(() => {
        const getSelectorData = async () => {
            try {
                const [legendsData, weaponsData] = await Promise.all([
                    fetchLegends(),
                    fetchWeapons(),
                ]);
                setLegends(legendsData);
                setWeapons(weaponsData);
            } catch (error) {
                console.error("Failed ro fetch selector data", error);
            }
        };
        getSelectorData();
    }, []);

    // Efeito principal: busca as estatísticas toda vez que um filtro muda
    useEffect(() => {
        if(!selectedId) {
            setStats(null);
            return;
        }

        const getStats = async () => {
            setIsLoading(true);
            try {
                const data = await fetchGameStats({
                    filterBy: filterType,
                    id: selectedId,
                    period,
                    result,
                });
                console.log("Estatísticas recebidas:", data);
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setIsLoading(false);
            }
        };

        getStats();
    }, [filterType, selectedId, period, result, refetchTrigger]);

    const handleRefetchStats = () => {
        if (!selectedId) return;
        setRefetchTrigger(currentValue => currentValue + 1);
    }

    const comboboxItems = (filterType === 'legend' ? legends : weapons).map((item) => ({
        value: item.id.toString(),
        label: item.name,
    }))


    return(
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Análise de Partidas</h1>
                <AddGameForm
                    legends={legends.map(l => ({ value: l.id.toString(), label: l.name }))}
                    onGameAdded={handleRefetchStats}
                />
            </div>

            <div className="flex flex-wrap items-center gap-4 p-4 border rounded-lg">
                <ToggleGroup 
                    type="single" 
                    value={filterType} 
                    onValueChange={(value) => { if (value) { setFilterType(value as any); setSelectedId(null); } }}
                >
                    <ToggleGroupItem value="legend">Legend</ToggleGroupItem>
                    <ToggleGroupItem value="weapon">Arma</ToggleGroupItem>
                </ToggleGroup>

                <div>
                    <Combobox
                        items={comboboxItems}
                        value={selectedId?.toString()}
                        onChange={(value) => setSelectedId(value ? Number(value) : null)}
                        placeholder={`Selecione ${filterType === 'legend' ? 'um Legend' : 'uma Arma'}...`}
                        searchPlaceholder={`Buscar ${filterType === 'legend' ? 'Legend' : 'Arma'}...`}
                    />
                </div>

                <ToggleGroup
                    type="single"
                    value={period}
                    onValueChange={(value) => { if (value) setPeriod(value as any); }}
                >
                    <ToggleGroupItem value="7d">7D</ToggleGroupItem>
                    <ToggleGroupItem value="15d">15D</ToggleGroupItem>
                    <ToggleGroupItem value="30d">30D</ToggleGroupItem>
                    <ToggleGroupItem value="6m">6M</ToggleGroupItem>
                    <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
                </ToggleGroup>

                <ToggleGroup
                    type="single"
                    value={result}
                    onValueChange={(value) => { if (value) setResult(value as any); }}
                >
                    <ToggleGroupItem value="all">Todas</ToggleGroupItem>
                    <ToggleGroupItem value="victory">Vitórias</ToggleGroupItem>
                    <ToggleGroupItem value="loss">Derrotas</ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {isLoading ? (
                    <>
                        <Skeleton className="h-40" />
                        <Skeleton className="h-40" />
                    </>
                ) : stats && stats.stats.totalGames > 0 ? (
                    <>
                        <StatCard 
                            title="Gold Acumulado"
                            total={stats.stats.totalGold}
                            average={stats.stats.averageGold}
                            totalGames={stats.stats.totalGames}
                        />
                        <StatCard 
                            title="XP Acumulado"
                            total={stats.stats.totalXp}
                            average={stats.stats.averageXp}
                            totalGames={stats.stats.totalGames}
                        />
                    </>
                ) : selectedId && (
                    <div className="md:col-span-2 text-center text-muted-foreground">
                        Nenhuma partida encontrada para os filtros selecionados.
                    </div>
                )}
            </div>
        </div>
    )
}