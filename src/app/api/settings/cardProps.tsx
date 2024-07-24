interface AnkiCardProps {
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


interface RTKCardProps {
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


interface CardsIdProps {
    cardId: number;
}

interface CardsIdsProps {
    cardIds: number[];
}

interface Field {
    value: string;
    order: number;
}

interface CardProps {
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

interface SimplifiedCardProps {
    cardId: number;
    deckName: string;
    word: string | undefined;
    reading: string | undefined;
    meaning: string | undefined;
    cardType: string;
}


interface ApiResponse {
    result: CardProps[];
    error: string | null;
}

export {
    type CardsIdProps,
    type AnkiCardProps,
    type RTKCardProps,
    type CardsIdsProps,
    type Field,
    type CardProps,
    type SimplifiedCardProps,
    type ApiResponse,
}


