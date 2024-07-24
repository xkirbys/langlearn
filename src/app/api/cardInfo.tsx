'use client';

import { formatCardData } from "@/app/api/formatCardData";
import { siteSettings } from '@/app/api/settings/siteSettings';
import type { CardProps, ApiResponse, CardsIdProps, CardsIdsProps } from '@/app/api/settings/cardProps';

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
        throw new Error('Invalid data format');
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
        throw new Error('Invalid data format');
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
