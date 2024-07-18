'use client'

import { useEffect, useState } from 'react';
import { getData } from '@/app/api/findCards';
import { getDataMultiple } from '@/app/api/cardInfo';
import { columns } from '@/app/decks/[deckName]/data/columns';
import { DataTable } from '@/app/decks/[deckName]/data/data-table-decks';
import type { SimplifiedCardProps } from '@/app/api/cardInfo';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import cacheSettings from "@/app/api/data/cacheSettings";

const getCacheKey = (deckName: string) => `deckData_${deckName}`;
const getCardDetailsCacheKey = (deckName: string) => `deckDataCardDetails_${deckName}`;

interface CachedData<T> {
    data: T;
    timestamp: number;
}

const DeckPage = ({ params }: { params: { deckName: string } }) => {
    const deckName = decodeURIComponent(params.deckName);

    const [cards, setCards] = useState<number[]>([]);
    const [cardDetails, setCardDetails] = useState<SimplifiedCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedData = localStorage.getItem(getCacheKey(deckName));
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData) as CachedData<number[]>;
                    if (!cacheSettings.CacheExpired(timestamp)) {
                        setCards(data);
                        setLoading(false);
                        return;
                    }
                }

                const data = await getData({ deckName });
                setCards(data);
                localStorage.setItem(getCacheKey(deckName), JSON.stringify({ data, timestamp: Date.now() }));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching deck names:", error);
                setLoading(false);
            }
        };

        void fetchData();
    }, [deckName]);

    useEffect(() => {
        const fetchMultipleData = async () => {
            try {
                const cachedData = localStorage.getItem(getCardDetailsCacheKey(deckName));
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData) as CachedData<SimplifiedCardProps[]>;
                    if (!cacheSettings.CacheExpired(timestamp)) {
                        setCardDetails(data);
                        setLoading(false);
                        return;
                    }
                }

                const data = await getDataMultiple({ cardIds: cards });
                const simplifiedData: SimplifiedCardProps[] = data.result.map((card) => ({
                    cardId: card.cardId,
                    deckName: card.deckName,
                    word: card.fields.Word?.value,
                    reading: card.fields['Word Reading']?.value,
                    meaning: card.fields['Word Meaning']?.value,
                    cardType: card.cardType,
                }));
                setCardDetails(simplifiedData);
                localStorage.setItem(getCardDetailsCacheKey(deckName), JSON.stringify({ data: simplifiedData, timestamp: Date.now() }));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching card details:", error);
                setLoading(false);
            }
        };

        if (cards.length > 0) void fetchMultipleData();

    }, [cards, deckName]);

    if (loading) {
        return <div>Trying to fetch {cards.length} cards..</div>;
    }

    return (
        <div>
            <div className={"absolute top-16 left-16 py-4"}>
                <Card>
                    <CardHeader>
                        <CardTitle>Deck: {deckName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={cardDetails} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DeckPage;
