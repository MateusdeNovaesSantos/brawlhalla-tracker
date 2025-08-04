import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma';

export type GameStatsFilters = {
    filterBy: 'legend' | 'weapon';
    id: number;
    period?: '1d' | '7d' | '15d' | '30d' | '6m' | '1y';
    result?: 'victory' | 'loss' | 'all';
}

const getStartDate = (period: GameStatsFilters['period']): Date | undefined => {
    const now = new Date();
    switch (period) {
        case '1d':
            return new Date(now.setDate(now.getDate() - 1));
        case '7d':
            return new Date(now.setDate(now.getDate() - 7));
        case '15d':
            return new Date(now.setDate(now.getDate() - 15));
        case '30d':
            return new Date(now.setDate(now.getDate() - 30));
        case '6m':
            return new Date(now.setMonth(now.getMonth() - 6));
        case '1y':
            return new Date(now.setFullYear(now.getFullYear() - 1));
        default:
            return undefined;
    }
}

export const GameService = {
    getStats: async (filters: GameStatsFilters) => {
        const whereClause: Prisma.GameWhereInput = {};

        // Filtro principal: por Legend ou Weapon
        if (filters.filterBy === 'legend') {
            whereClause.legendId = filters.id;
        } else if (filters.filterBy === 'weapon') {
            whereClause.legend = {
                weapons: {
                    some: {
                        id: filters.id,
                    },
                },
            };
        }

        // Filtro de período de tempo
        const startDate = getStartDate(filters.period);
        if (startDate) {
            whereClause.date = {
                gte: startDate
            };
        }

        // Filtro de resultado (Vitória/Derrota)
        if (filters.result === 'victory') {
            whereClause.victory = true;
        } else if (filters.result === 'loss') {
            whereClause.victory = false;
        }

        
        const games = await prisma.game.findMany({
            where: whereClause,
            orderBy: {
                date: 'desc',
            },
        });

        // Calcular os resultados a partir dos jogos encontrados
        const totalGames = games.length;
        const totalGold = games.reduce((sum, game) => sum + game.gold, 0);
        const totalXp = games.reduce((sum, game) => sum + game.xp, 0);
        const victories = games.filter(game => game.victory).length;
        const losses = totalGames - victories;

        const averageGold = totalGames > 0 ? totalGold / totalGames : 0;
        const averageXp = totalGames > 0 ? totalXp / totalGames : 0;

        // Retornar um objeto com todas as estatísticas calculadas
        return {
            filters,
            stats: {
                totalGames,
                victories,
                losses,
                totalGold,
                totalXp,
                averageGold,
                averageXp,
            },
            games,
        }
    },

    // Adiciona dados de partidas
    create: async (data: {
        legendId: number;
        gold: number;
        xp: number;
        victory: boolean;
    }) => {
        return prisma.game.create({
            data: {
                legendId: data.legendId,
                gold: data.gold,
                xp: data.xp,
                victory: data.victory,
            }
        });
    }
}

