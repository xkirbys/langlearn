'use client';

import type {ColumnDef} from '@tanstack/react-table';
import type { SimplifiedCardProps } from '@/app/api/settings/cardProps';
import Link from "next/link";


export const columns: ColumnDef<SimplifiedCardProps>[] = [
    {
        accessorKey: 'cardId',
        header: 'Card ID',
        cell:
            (info) => (
                <Link href={`/decks/${info.row.original.deckName.replace(/[\s/]+/g, '_')}/${info.row.original.cardId}`} className="text-blue-500 hover:underline">
                    {String(info.getValue())}
                </Link>
            )
    },
    {
        accessorKey: 'word',
        header: 'Word',
        cell: ( info ) => {
            // make it so the size of the column is the same as the word and remember it so it doesnt change

            return <div style={{ whiteSpace: 'nowrap' }} className={"text-sm"}>{String(info.getValue())}</div>
        }
    },
    {
        accessorKey: 'reading',
        header: 'Reading',
        cell: ( info ) => {
            // make it so the size of the column is the same as the word and remember it so it doesnt change

            return <div style={{ whiteSpace: 'nowrap' }} className={"text-sm"}>{String(info.getValue())}</div>
        }
    },
    {
        accessorKey: 'meaning',
        header: 'Meaning',
        cell: (info) => {
            // make it so the size of the column is the same as the word and remember it so it doesnt change

            return <div style={{whiteSpace: 'nowrap'}} className={"text-sm"}>{String(info.getValue())}</div>
        },
    },
    {
        accessorKey: 'cardType',
        header: 'Card Type',
    },
]
