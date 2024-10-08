'use client';

import { useEffect, useState, useCallback } from 'react';
import { siteSettings } from '@/app/api/settings/siteSettings';

interface FindCardsProps {
    deckName: string;
}

export default function FindCards({ deckName }: FindCardsProps) {
    const [data, setData] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response: Response = await fetch(siteSettings.requestURL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "findCards",
                    params: {
                        query: `deck:${deckName} -is:suspended`,
                    }
                }),
            });
            const resultData: string[] = await response.json() as Array<string>;
            if (!Array.isArray(resultData) || resultData.length === 0) {
                setData([]);
            } else {
                const formattedData: string[] = resultData.map((cardId: string) => cardId);
                setData(formattedData);
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
            } else {
                setError(new Error('Unknown error'));
            }
        } finally {
            setLoading(false);
        }
    }, [deckName]);

    useEffect(() => {
        fetchData().catch((e) => {
            if (e instanceof Error) {
                setError(e);
            } else {
                setError(new Error('Unknown error'));
            }
        });
    }, [fetchData]);

    function renderContent() {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        if (!data || data.length === 0) return <div>No data available.</div>;

        return (
            <div>
                <h1>getDeckNames</h1>
                {data.map((deckName: string, index: number) => (
                    <p key={index}>{deckName}</p>
                ))}
            </div>
        );
    }

    return renderContent();
}

export async function getData({ deckName }: FindCardsProps) {
    const response: Response = await fetch(siteSettings.requestURL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            action: "findCards",
            params: {
                query: `deck:${deckName} -is:suspended`,
            }
        }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const resultData = await response.json() as number[];
    if (!Array.isArray(resultData) || resultData.length === 0) {
        return [];
    } else {
        return resultData.map((cardId: number) => cardId);
    }
}
