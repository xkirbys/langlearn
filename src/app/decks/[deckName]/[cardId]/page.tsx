'use client';

import React, { useEffect, useState } from 'react';
import { getData } from '@/app/api/cardInfo';
import type { CardProps } from '@/app/api/settings/cardProps';
import { useDemoMode } from '@/components/DemoModeContext';
import { siteSettings } from '@/app/api/settings/siteSettings';

export const runtime = "edge";

export default function CardInfoPage({ params }: { params: { cardId: number } }) {
    const { cardId } = params;
    const [cardData, setCardData] = useState<CardProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    useDemoMode();

    useEffect(() => {
        getData({ cardId: cardId })
            .then((response) => {
                if (response.error) {
                    setError(response.error);
                } else {
                    const firstCard = response.result[0];
                    if (firstCard) {
                        setCardData(firstCard);
                    } else {
                        setCardData(null); // or handle the case where firstCard is undefined
                        setError('Card not found');
                    }
                }
            })
            .catch((err) => {
                setError(`Error fetching data: ${(err as Error).message}`);
            });
    }, [cardId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!cardData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Currently in {siteSettings.demoMode ? 'DEMO' : 'LIVE'} Mode</h1>
            <h1 className="text-2xl font-bold mb-4">Info Page for {cardId}</h1>
            <p className="mb-4">This is detailed information about {cardId}.</p>

            {cardData.fields.Word?.value && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Card Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="font-semibold">Word:</div>
                        <div>{cardData.fields.Word.value}</div>

                        <div className="font-semibold">Word Reading:</div>
                        <div>{cardData.fields['Word Reading']?.value}</div>

                        <div className="font-semibold">Word Meaning:</div>
                        <div>{cardData.fields['Word Meaning']?.value}</div>

                        {/* Render other fields similarly */}
                    </div>
                </div>
            )}

            {cardData.fields.Sentence?.value && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Example Sentence</h2>
                    <div className="mb-2" dangerouslySetInnerHTML={{__html: cardData.fields.Sentence.value}}/>
                    <p>{cardData.fields['Sentence Meaning']?.value}</p>
                </div>
            )}

            {cardData.fields.Notes?.value && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Additional Information</h2>
                    <div dangerouslySetInnerHTML={{__html: cardData.fields.Notes.value}}/>
                </div>
            )}
        </div>


    );
}
