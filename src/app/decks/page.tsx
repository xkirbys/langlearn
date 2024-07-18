'use client';

import { useEffect, useState } from "react";
import { getData } from "@/app/api/getDeckNames";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cacheSettings, type CachedData } from "@/app/api/settings/cacheSettings";

const getCacheKey = `deckNames`;

const DecksPage = () => {
    const [deckNames, setDeckNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedData = localStorage.getItem(getCacheKey);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData) as CachedData<string[]>;
                    if (!cacheSettings.CacheExpired(timestamp)) {
                        setDeckNames(data);
                        setLoading(false);
                        return;
                    }
                }

                const data = await getData();
                setDeckNames(data);
                localStorage.setItem(getCacheKey, JSON.stringify({ data, timestamp: Date.now() }));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching deck names:", error);
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ScrollArea className={"h72 w-48 rounded-md border"}>
            <div className={"p-4"}>
                <h4 className={"mb-4 text-sm font-medium leading-none"}>Decks</h4>
                {deckNames.map((deckName) => (
                    <>
                        <div key={deckName} className={"text-sm"}>
                            <Link href={`/decks/${deckName.replace(/[\s/]+/g, '_')}`} className="text-blue-500 hover:underline">
                                {deckName}
                            </Link>
                        </div>
                    </>
                ))}
            </div>
        </ScrollArea>
    );
}

export default DecksPage;
