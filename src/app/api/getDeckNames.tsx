'use client'

import { useEffect, useState } from 'react';
import { siteSettings } from '@/app/api/settings/siteSettings';


export default function GetDeckNames() {
    const [data, setData] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchData().catch((e) => {
            if (e instanceof Error) {
                setError(e);
            } else {
                setError(new Error("Unknown error"));
            }
        });
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(siteSettings.requestURL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "deckNames" }),
            });
            // define the type for resultData
            const resultData: string[] = await response.json() as Array<string>;
            if (!Array.isArray(resultData) || resultData.length === 0) {
                setData([]);
            } else {
                const formattedData = resultData.map((deckName: string) => deckName)
                setData(formattedData);
            }
        }
        catch (e) {
            if(e instanceof Error) {
                setError(e);
            } else {
                setError(new Error('Unknown error'));
            }
        } finally {
            setLoading(false);
        }
    }

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

export async function getData() {
    const response: Response = await fetch(siteSettings.requestURL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "deckNames" }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const resultData: string[] = await response.json() as Array<string>;
    if (!Array.isArray(resultData) || resultData.length === 0) {
        return [];
    } else {
        return resultData.map((deckName: string) => deckName);
    }
}