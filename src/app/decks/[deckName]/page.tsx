'use client';
import { getData } from '@/app/api/findCards';
import { useEffect, useState } from 'react';
import type { CardProps } from '@/app/api/cardInfo';
import { getDataMultiple } from '@/app/api/cardInfo';
import { columns } from '@/app/decks/[deckName]/data/columns';
import { DataTable } from '@/app/decks/[deckName]/data/data-table-decks';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

//TODO: Instead of doing one request per card, make a single request for all cards in the deck
//

const DeckPage = ({ params }: { params: { deckName: string } }) => {
    //const { deckName } = params;
    const deckName = decodeURIComponent(params.deckName);


    const [cards, setCards] = useState<number[]>([]);
    const [cardDetails, setCardDetails] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData({ deckName });
                setCards(data);
                setLoading(true);
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
                const data = await getDataMultiple({ cardIds: cards });
                setCardDetails(data.result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching card details:", error);
                setLoading(false);
            }
        };

        if (cards.length > 0) void fetchMultipleData();

    }, [cards]);

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
