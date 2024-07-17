'use client';

import React, { useEffect, useState } from 'react';
import { getData } from '@/app/api/cardInfo';
import type { CardProps } from '@/app/api/cardInfo';

export default function CardInfoPage({ params }: { params: { element: number } }) {
    const { element } = params;
    const [cardData, setCardData] = useState<CardProps | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getData({ cardId: element })
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
    }, [element]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!cardData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Info Page for {element}</h1>
            <p className="mb-4">This is detailed information about {element}.</p>

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
