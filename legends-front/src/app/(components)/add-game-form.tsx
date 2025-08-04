'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Combobox } from '@/components/combobox';
import { createGame } from '@/lib/api';

type AddGameFormProps = {
    legends: { value: string; label: string; }[];
    onGameAdded: () => void; // Callback para notificar o pai que um jogo foi adicionado
}

export function AddGameForm({ legends, onGameAdded }: AddGameFormProps) {
    const [open, setOpen] = useState(false);
    const [legendId, setLegendId] = useState<string | undefined>();
    const [gold, setGold] = useState(0);
    const [xp, setXp] = useState(0);
    const [victory, setVictory] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!legendId) {
            alert("Por favor, selecione um Legend.");
            return;
        }
        setIsSubmitting(true);
        try {
            await createGame({
                legendId: Number(legendId),
                gold,
                xp,
                victory
            });
            onGameAdded(); // Executa callback
            setOpen(false); // fecha o dialog

            // Limpa os compos do formulário
            setLegendId(undefined);
            setGold(0);
            setXp(0);
            setVictory(false);
        } catch (error) {
            console.log(error)
            alert("Falha ao salvar a partida.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Adicionar Partidas</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar Nova Partida</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <Label>Legend</Label>
                        <Combobox 
                            items={legends}
                            value={legendId}
                            onChange={setLegendId}
                            placeholder="Selecione..."
                            searchPlaceholder="Buscar..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="gold">Gold</Label>
                            <Input 
                                id="gold" 
                                type="number" 
                                value={gold} 
                                onChange={e => setGold(Number(e.target.value))} 
                                required 
                                min="0"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="xp">XP</Label>
                            <Input
                                id="xp"
                                type="number"
                                value={xp}
                                onChange={e => setXp(Number(e.target.value))}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="victory"
                            checked={victory}
                            onCheckedChange={setVictory}
                        />
                        <Label htmlFor="victory">Vitória?</Label>
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Salvando..." : "Salvar Partida"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}