'use client';

import type {ColumnDef} from '@tanstack/react-table';
import type {CardProps} from "@/app/api/cardInfo";
import Link from "next/link";


export const columns: ColumnDef<CardProps>[] = [
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
        accessorKey: 'fields.Word.value',
        header: 'Word',
        cell: ( info ) => {
            // make it so the size of the column is the same as the word and remember it so it doesnt change

            return <div style={{ whiteSpace: 'nowrap' }} className={"text-sm"}>{String(info.getValue())}</div>
        }
    },
    {
        accessorKey: 'fields.Word Reading.value',
        header: 'Reading',
        cell: ( info ) => {
            // make it so the size of the column is the same as the word and remember it so it doesnt change

            return <div style={{ whiteSpace: 'nowrap' }} className={"text-sm"}>{String(info.getValue())}</div>
        }
    },
    {
        accessorKey: 'fields.Word Meaning.value',
        header: 'Meaning',
        cell: ( info ) => {
            // make it so the size of the column is the same as the word and remember it so it doesnt change

            return <div style={{ whiteSpace: 'nowrap' }} className={"text-sm"}>{String(info.getValue())}</div>
        }
    }
]
