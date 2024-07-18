interface Field {
    value: string;
    order: number;
}

export interface AnkiCardProps {
    cardId: number;
    fields: Record<string, Field>;
    fieldOrder: number;
    question: string;
    answer: string;
    modelName: string;
    ord: number;
    deckName: string;
    css: string;
    factor: number;
    interval: number;
    note: number;
    type: number;
    cardType: string;
    queue: number;
    due: number;
    reps: number;
    lapses: number;
    left: number;
    mod: number;
    nextReviews: string[];
}


export interface RTKCardProps {
    cardId: number;
    fields: Record<string, Field>;
    fieldOrder: number;
    question: string;
    answer: string;
    modelName: string;
    ord: number;
    deckName: string;
    css: string;
    factor: number;
    interval: number;
    note: number;
    type: number;
    cardType: string;
    queue: number;
    due: number;
    reps: number;
    lapses: number;
    left: number;
    mod: number;
    nextReviews: string[];
}


