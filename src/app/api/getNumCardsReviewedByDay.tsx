'use client'

import { useEffect, useState } from 'react';
import { DataTable } from '@/app/test/data-table';
import { columns } from '@/app/test/columns';
import type { AnkiCard } from '@/app/test/columns';
import { TestChart } from '@/app/test/testgraph';

export default function GetNumCardsReviewedByDay() {
    const [data, setData] = useState<AnkiCard[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchData().catch((e) => {
            if (e instanceof Error) {
                setError(e);
            } else {
                setError(new Error('Unknown error'));
            }
        });
    }, []);

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8765", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "getNumCardsReviewedByDay" }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resultData: unknown = await response.json();
            if (!Array.isArray(resultData) || resultData.length === 0) {
                setData([]);
            } else {
                const formattedData = resultData.map(([date, amount]: [string, number]) => ({ date, amount }));
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
    }

    function renderContent() {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        if (!data || data.length === 0) return <div>No data available.</div>;

        return (
            <div>
                <DataTable columns={columns} data={data} />
                <TestChart />
            </div>
        );
    }

    return renderContent();
}

export async function getData() {
    const response = await fetch("http://localhost:8765", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "getNumCardsReviewedByDay" }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const resultData: unknown = await response.json();
    if (!Array.isArray(resultData) || resultData.length === 0) {
        return [];
    } else {
        return resultData.map(([date, amount]: [string, number]) => ({ date, amount }));
    }
}