'use client'

import { useEffect, useState, useMemo } from 'react';
import { Combobox } from '@/components/combobox';
import { fetchLegends, fetchColorsForLegend, updateColorOwnership, updateUniversalColorOwnership } from '@/lib/api';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';

// Tipos para os dados
type Legend = { id: number, name: string };
type ColorOwnership = {
    id: number;
    legendId:number;
    colorId: number;
    hasColor: boolean;
    color: { id: number, name: string, category: string };
};

export default function CoresPage() {
    const [legends, setLegends] = useState<Legend[]>([]);
    const [selectedLegendId, setSelectedLegendId] = useState<number | null>(null);

    const [colors, setColors] = useState<ColorOwnership[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isUniversal, setIsUniversal] = useState(false);

    // Busca a lista de legends quando a página carrega
    useEffect(() => {
        const getLegends = async ()=> {
            try {
                const data = await fetchLegends();
                setLegends(data);
            } catch (error) {
                console.error(error);
            }
        };
        getLegends();
    }, []);

    //Busca as cores sempre que um novo legend é selecionado
    useEffect(() => {
        if (!selectedLegendId) {
            setColors([]);
            return;
        }

        const getColors = async ()=> {
            setIsLoading(true);

            try {
                const data = await fetchColorsForLegend(selectedLegendId);
                setColors(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        getColors();
    }, [selectedLegendId]);

    // Função que lida com a mudança no Switch
    const handleColorToggle = async (colorOwnership: ColorOwnership, newCheckedState: boolean) => {
        // Cenário otimista: atualiza o UI imediatamente
        setColors (currentColors =>
            currentColors.map(c =>
                c.id === colorOwnership.id ? { ...c, hasColor: newCheckedState }: c
            )
        );

        // Tenta atualizar o backend
        try {
            if (isUniversal) {
                // Se o modo universal está ativo, chama a API universal
                await updateUniversalColorOwnership(colorOwnership.colorId, newCheckedState);
            } else {
                // Senão, chama a API normal para um único legend  
                await updateColorOwnership(colorOwnership.legendId, colorOwnership.colorId, newCheckedState);
            }
        } catch (error) {
            console.error(error);
            // Reverte UI em caso de erro
            setColors(currentColors => 
                currentColors.map(c => 
                    c.id === colorOwnership.id ? { ...c, hasColor: !newCheckedState }: c
                )
            );
        }
    };

    const groupedColors = useMemo(() => {
        if (!colors) return {};

        // O .reduce agrupa o array 'colors em um novo objeto
        return colors.reduce((acc, colorOwnership) => {
            const category = colorOwnership.color.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(colorOwnership);
            return acc;
        }, {} as Record<string, ColorOwnership[]>);
    }, [colors]);

    // Prepara os dados para o Combobox
    const comboboxItems = legends.map(legend => ({
        value: legend.id.toString(),
        label: legend.name,
    }));

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Gerenciamento de Cores</h1>
            <div className="w-full max-w-xs">
                <div className="w-full max-w-xs">
                    <Combobox 
                        items={comboboxItems}
                        value={selectedLegendId?.toString()}
                        onChange={(value) => setSelectedLegendId(value ? Number(value) : null)}
                        placeholder="Selecione um Legend..."
                        searchPlaceholder="Buscar Legend..."
                    />
                </div>
                <div className="flex items-center space-x-2 pt-5">
                    <Checkbox 
                        id="universal-toggle"
                        checked={isUniversal}
                        onCheckedChange={(checked) => setIsUniversal(Boolean(checked))}
                    />
                    <Label htmlFor="universal-toggle">Aplicar a todos os Legends</Label>
                </div>
            </div>

            {isLoading && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-lg" />
                    ))}
                </div>
            )}

            {!isLoading && selectedLegendId && (
                <div className="space-y-4">
                    {Object.entries(groupedColors).map(([category, colors]) => (
                        <div key={category}>
                            <h2 className="text-2xl font-semibold mb-3 border-b pb-2">{category}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {colors.map((ownership) => (
                                    <div key={ownership.id} className="flex items-center space-x-2 rounded-lg border p-3">
                                        <Switch 
                                            id={`color-${ownership.id}`}
                                            checked={ownership.hasColor}
                                            onCheckedChange={(newState) => handleColorToggle(ownership, newState)}
                                        />
                                        <Label htmlFor={`color-${ownership.id}`}>{ownership.color.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}