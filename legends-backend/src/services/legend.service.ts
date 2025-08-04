import { prisma } from '../lib/prisma';

export const LegendService = {
    getAll: async () => {
        return prisma.legend.findMany({
            orderBy: {
                name: 'asc',
            }
        })
    }
}