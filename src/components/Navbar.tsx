"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { useDemoMode } from "@/components/DemoModeContext";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
    const pages = [
        { path: "/", name: "HOME" },
        { path: "test", name: "TEST" },
        { path: "kana", name: "Kana" },
        { path: "decks", name: "Decks" },
    ];

    const MAX_VISIBLE_PAGES = 10; // Maximum number of visible entries
    const visiblePages = pages.slice(0, MAX_VISIBLE_PAGES);
    const overflowPages = pages.slice(MAX_VISIBLE_PAGES);
    const { isDemoMode, toggleDemoMode } = useDemoMode();

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
            <div className={"flex items-center space-x-4"}>
            <Button
                className={"justify-center"}
                variant="outline"
                onClick={toggleDemoMode}
                style={{
                    borderColor: isDemoMode ? 'red' : undefined,
                    color: isDemoMode ? 'red' : undefined,
                    backgroundColor: isDemoMode ? 'black' : undefined,
                }}
            >
                {isDemoMode ? 'DEMO MODE ACTIVE, PRESS TO SWITCH' : 'Switch to Demo Mode'}
            </Button>

            <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;