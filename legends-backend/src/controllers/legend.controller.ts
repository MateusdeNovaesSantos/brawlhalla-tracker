import { Request, Response } from 'express';
import { LegendService } from '../services/legend.service';

export const LegendController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const legends = await LegendService.getAll();
            res.status(200).json(legends);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch legends' });
        }
    },
}