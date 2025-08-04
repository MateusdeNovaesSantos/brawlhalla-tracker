export type LegendData = {
    gold: { L: string[], W: string[] };
    xp: { L: string[], W: string[] };
    colors: {
        "Event Colors": Record<string, boolean>;
        "Battle Pass Colors": Record<string, boolean>;
        "Others Colors": Record<string, boolean>;
    }
}

export type LegendCardProps = {
    legendName: string;
    legendData: LegendData;
}