'use client'

import { useEffect, useState } from 'react';
import { DataTable } from '@/app/test/data-table';
import { AnkiCard, columns } from '@/app/test/columns';



interface DataType {
    result: AnkiCard[] | null;
    error: string | null;
}

export default function GetNumCardsReviewedByDay() {
    const [data, setData] = useState<AnkiCard[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8765", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({action: "getNumCardsReviewedByDay"}),
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
                    const total = formattedData.reduce((sum, { amount }) => sum + amount, 0);

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

        fetchData().catch((e) => {
            if (e instanceof Error) {
                setError(e);
            } else {
                setError(new Error('Unknown error'));
            }
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || data.length === 0) return <div>No data available.</div>;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )



    /*
    return (
        <div>
            <div>ANKI CARDS REVIEWED BY DAY:</div>
            <div>Total Number of Cards Reviewed: {totalNumCards}</div>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Number of Cards</th>
                </tr>
                </thead>
                <tbody>
                {data.map(([date, numCards]) => (
                    <tr key={date}>
                        <td>{date}</td>
                        <td>{numCards}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    ); */
}