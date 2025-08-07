'use client';

import { useEffect, useState, useMemo } from 'react';
import { Combobox } from '@/components/combobox';
import { fetchColors, fetchLegendsByColor } from '@/lib/api';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'; 

type Color = { id: number; name: string; category: string; };
type Legend = { id: number; name: string; };

export default function BuscaCorPage() {
    const [allColors, setAllColors] = useState<Color[]>([]);
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

    const [legends, setLegends] = useState<Legend[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [colorCategory, setColorCategory] = useState<'Event Colors' | 'Battle Pass Colors' | 'Other Colors' | 'All'>('All')


    useEffect(() => {
        const getColors = async () => {
            const data = await fetchColors();
            setAllColors(data);
        };
        getColors();
    }, []);

    useEffect(() => {
        if(!selectedColorId) {
            setLegends([]);
            return;
        }
        const getLegends = async () => {
            setIsLoading(true);
            try {
                const data = await fetchLegendsByColor(selectedColorId);
                setLegends(data);
            } finally {
                setIsLoading(false);
            }
        };
        getLegends();
    }, [selectedColorId]);

    const filteredColors = useMemo(() => {
        if (colorCategory === 'All') {
            return allColors;
        }
        return allColors.filter(color => color.category === colorCategory);
    }, [allColors, colorCategory]);

    const comboboxItems = filteredColors.map(color => ({
        value: color.id.toString(),
        label: color.name,
    }))

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Busca de Legend por Cor</h1>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-64">
                    <Combobox
                        items={comboboxItems}
                        value={selectedColorId?.toString()}
                        onChange={(value) => setSelectedColorId(value ? Number(value) : null)}
                        placeholder="Selecione uma Cor..."
                        searchPlaceholder="Buscar Cor..."
                    />
                </div>
                <ToggleGroup
                    type="single"
                    defaultValue="All"
                    value={colorCategory}
                    onValueChange={(value: 'All' | 'Event Colors' | 'Battle Pass Colors' | 'Other Colors') => {
                        if (value) {
                            setColorCategory(value);
                            setSelectedColorId(null);
                        }
                    }}
                >
                    <ToggleGroupItem value="All">Todas</ToggleGroupItem>
                    <ToggleGroupItem value="Event Colors">Evento</ToggleGroupItem>
                    <ToggleGroupItem value="Battle Pass Colors">Passe</ToggleGroupItem>
                    <ToggleGroupItem value="Other Colors">Outras</ToggleGroupItem>
                </ToggleGroup>
            </div>

            {isLoading && (
                <div className="grid grid-col-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-lg"/>)}
                </div>
            )}
            
            {!isLoading && selectedColorId && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {legends.map(legend => (
                        <Card key={legend.id}>
                            <CardHeader className="p-4">
                                <CardTitle className="text-center text-lg">{legend.name}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}