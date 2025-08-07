const API_BASE_URL = 'http://localhost:3001/api'

// Busca todos os legends
export const fetchLegends = async () => {
    const response = await fetch(`${API_BASE_URL}/legends`)
    if(!response.ok) throw new Error('Failed to fetch legends');
    return response.json();
}

// Busca as cores para um legend específico
export const fetchColorsForLegend = async (legendId: number) => {
    const response = await fetch(`${API_BASE_URL}/legends/${legendId}/colors`)
    if (!response.ok) throw new Error('Failed to fetch colors');
    return response.json();
}

// Atualiza o status de uma cor
export const updateColorOwnership = async (legendId: number, colorId: number, hasColor: boolean) => {
    const response = await fetch(`${API_BASE_URL}/colors/ownership`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legendId, colorId, hasColor }),
    });
    if (!response.ok) throw new Error('Failed to update color ownership');
    return response.json();
}

// Busca todas as armas
export const fetchWeapons = async () => {
    const response = await fetch(`${API_BASE_URL}/weapons`);
    if (!response.ok) throw new Error('Failed to fetch weapons');
    return response.json();
}

//Busca as estatísticas dos jogos com base nos filtros
export const fetchGameStats = async (filters: {
    filterBy: 'legend' | 'weapon';
    id: number;
    period: string;
    result: string;
}) => {
    // Constrói a URL com os query parameters
    const params = new URLSearchParams({
        filterBy: filters.filterBy,
        id: filters.id.toString(),
        period:filters.period,
        result: filters.result,
    });

    const response = await fetch(`${API_BASE_URL}/games?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch game stats');
    return response.json();
}

// Adiciona novos registros de jogos
export const createGame = async (gameData: {
    legendId: number;
    gold: number;
    xp: number;
    victory: boolean;
}) => {
    const response = await fetch(`${API_BASE_URL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
    });
    if (!response.ok) throw new Error('Failed to create game');
    return response.json();
}

// Atualiza o status de uma cor para TODOS os legends
export const updateUniversalColorOwnership = async (colorId: number, hasColor: boolean) => {
    const response = await fetch(`${API_BASE_URL}/colors/ownership/universal`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colorId, hasColor }),
    });
    if (!response.ok) throw new Error('Failed to update universal color ownership');
    return response.json();
}

export const fetchLegendsByColor = async (colorId: number) => {
    const response = await fetch(`${API_BASE_URL}/colors/${colorId}/legends`);
    if (!response.ok) throw new Error('Failed to fetch legends by color');
    return response.json();
}

export const fetchColors = async () => {
    const response = await fetch(`${API_BASE_URL}/colors`);
    if(!response.ok) throw new Error('Failed to fetch colors');
    return response.json();
}