'use client';

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

export interface SimplifiedCardProps {
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


import { formatCardData } from "@/app/api/formatCardData";

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

        const rawData = await response.json() as CardProps[];
        return formatCardData(rawData); // Format the fetched data
    } catch (error) {
        throw error; // Propagate the error to handle it in getData or caller
    }
}

async function fetchMultipleCardInfo(cardIds: number[]): Promise<CardProps[]> {
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
                    cards: cardIds.map(Number),
                },
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const rawData = await response.json() as CardProps[];
        return formatCardData(rawData); // Format the fetched data
    } catch (error) {
        throw error; // Propagate the error to handle it in getData or caller
    }
}

export async function getData({ cardId }: CardsIdProps): Promise<ApiResponse> {
    try {
        const formattedData = await fetchCardInfo(cardId);
        return { result: formattedData, error: null };
    } catch (error) {
        return { result: [], error: (error as Error).message };
    }
}

export async function getDataMultiple({ cardIds }: CardsIdsProps): Promise<ApiResponse> {
    try {
        const formattedData = await fetchMultipleCardInfo(cardIds);
        return { result: formattedData, error: null };
    } catch (error) {
        return { result: [], error: (error as Error).message };
    }
}



export type { CardProps };
