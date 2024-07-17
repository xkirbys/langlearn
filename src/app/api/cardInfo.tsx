'use client';

interface CardsIdProps {
    cardId: number;
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
    queue: number;
    due: number;
    reps: number;
    lapses: number;
    left: number;
    mod: number;
    nextReviews: string[];
}

interface ApiResponse {
    result: CardProps[];
    error: string | null;
}

async function fetchCardInfo(cardId: number): Promise<CardProps[]> {
    try {
        const response = await fetch("http://localhost:8765", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "cardsInfo",
                params: {
                    cards: [Number(cardId)],
                },
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json() as CardProps[];
    } catch (error) {
        throw error; // Propagate the error to handle it in getData or caller
    }
}

function formatCardData(rawData: CardProps[] | undefined): CardProps[] {
    if (!rawData) {
        return []; // Return an empty array or handle as per your application logic
    }

    return rawData.map((card) => ({
        cardId: card.cardId,
        fields: card.fields,
        fieldOrder: card.fieldOrder,
        question: card.question,
        answer: card.answer,
        modelName: card.modelName,
        ord: card.ord,
        deckName: card.deckName,
        css: card.css,
        factor: card.factor,
        interval: card.interval,
        note: card.note,
        type: card.type,
        queue: card.queue,
        due: card.due,
        reps: card.reps,
        lapses: card.lapses,
        left: card.left,
        mod: card.mod,
        nextReviews: card.nextReviews,
    }));
}

export async function getData({ cardId }: CardsIdProps): Promise<ApiResponse> {
    try {
        const rawData = await fetchCardInfo(cardId);
        const formattedData = formatCardData(rawData);
        return { result: formattedData, error: null };
    } catch (error) {
        return { result: [], error: (error as Error).message };
    }
}

export type { CardProps };
