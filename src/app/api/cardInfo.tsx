'use client';

import {AnkiCardProps, RTKCardProps} from "@/app/api/settings/cardProps";

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
import { siteSettings } from '@/app/api/settings/siteSettings';

async function fetchCardInfo(cardId: number): Promise<CardProps[]> {
    const response = await fetch(siteSettings.requestURL, {
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
    if (!Array.isArray(rawData)) {
        throw new Error('Invalid settings format');
    }

    return formatCardData(rawData);
}

async function fetchMultipleCardInfo(cardIds: number[]): Promise<CardProps[]> {
    const response = await fetch(siteSettings.requestURL, {
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
    if (!Array.isArray(rawData)) {
        throw new Error('Invalid settings format');
    }

    return formatCardData(rawData);
}


export async function getData({ cardId }: CardsIdProps): Promise<ApiResponse> {
    try {
        const formattedData = await fetchCardInfo(cardId);
        return { result: formattedData, error: null };
    } catch (error) {
        if (error instanceof Error) {
            return { result: [], error: error.message };
        } else {
            // Handle unexpected errors gracefully
            return { result: [], error: 'An unexpected error occurred' };
        }
    }
}

export async function getDataMultiple({ cardIds }: CardsIdsProps): Promise<ApiResponse> {
    try {
        const formattedData = await fetchMultipleCardInfo(cardIds);
        return { result: formattedData, error: null };
    } catch (error) {
        if (error instanceof Error) {
            return { result: [], error: error.message };
        } else {
            // Handle unexpected errors gracefully
            return { result: [], error: 'An unexpected error occurred' };
        }
    }
}






export type { CardProps };
