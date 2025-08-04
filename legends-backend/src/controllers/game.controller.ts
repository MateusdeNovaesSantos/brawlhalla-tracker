import { Request, Response } from 'express';
import { GameService, GameStatsFilters } from '../services/game.service'

export const GameController = {
    getStats: async (req: Request, res: Response) => {
        try {
            const { filterBy, id, period, result } = req.query;

            if (!filterBy || !id || (filterBy !== 'legend' && filterBy !== 'weapon')) {
                return res.status(400).json({ error: 'Parâmetros filterBy e id são obrigatórios.' });
            }

            const filters: GameStatsFilters = {
                filterBy: filterBy as 'legend' | 'weapon',
                id: parseInt(id as string, 10),
                period: period as GameStatsFilters['period'] | undefined,
                result: result as GameStatsFilters['result'] | undefined,
            };

            if (isNaN(filters.id)) {
                return res.status(400).json({ error: 'O parâmetro id deve ser um número.'})
            }

            const stats = await GameService.getStats(filters);
            res.status(200).json(stats);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    // Controla a adição de novos dados de partidas
    create: async (req: Request, res: Response) => {
        try {
            const { legendId, gold, xp, victory} = req.body;

            if (typeof legendId !== 'number' || typeof gold !== 'number' || typeof xp !== 'number' || typeof victory !== 'boolean') {
                return res.status(400).json({ error: 'Parâmetros inválidos.' });
            }
            const newGame = await GameService.create({ legendId, gold, xp, victory });
            res.status(201).json(newGame);
        } catch (error) {
            res.status(500).json({ error: 'Falha ao criar novo jogo.' });
        }
    }  
}