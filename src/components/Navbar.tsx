"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

const Navbar: React.FC = () => {
    const pages = [
        { path: "kana", name: "Kana" },
        { path: "/", name: "Root" },
        { path: "test", name: "TEST" },
        { path: "decks", name: "Decks" },
    ];

    const MAX_VISIBLE_PAGES = 10; // Maximum number of visible entries
    const visiblePages = pages.slice(0, MAX_VISIBLE_PAGES);
    const overflowPages = pages.slice(MAX_VISIBLE_PAGES);

    return (
        <nav className="flex justify-between p-4 bg-background text-foreground">
            <div className="flex space-x-4 items-center">
                {visiblePages.map((page, index) => (
                    <Link key={index} href={`/${page.path}`}>
                        {page.name}
                    </Link>
                ))}

                {overflowPages.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="px-4 py-2 bg-muted rounded">More</DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-background">
                            {overflowPages.map((page, index) => (
                                <DropdownMenuItem key={index} className="bg-background hover:bg-muted">
                                    <Link href={`/${page.path}`}>
                                        {page.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            <ModeToggle />
        </nav>
    );
};

export default Navbar;