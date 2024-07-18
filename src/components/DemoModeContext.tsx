'use client';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface DemoModeContextProps {
    isDemoMode: boolean;
    toggleDemoMode: () => void;
}
const defaultToggleDemoMode = () => {
    console.warn('toggleDemoMode function is not implemented');
};

const DemoModeContext = createContext<DemoModeContextProps>({
    isDemoMode: false,
    toggleDemoMode: defaultToggleDemoMode,
});

export function DemoModeProvider({ children }: { children: ReactNode }) {
    const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const storedMode = localStorage.getItem('isDemoMode');
            return storedMode ? JSON.parse(storedMode) as boolean : false;

        }
        return false;
    });

    const toggleDemoMode = () => {
        setIsDemoMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('isDemoMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const baseTitle = document.title.replace(' (DEMO MODE)', '');
            document.title = isDemoMode ? `${baseTitle} (DEMO MODE)` : baseTitle;
            localStorage.setItem('isDemoMode', JSON.stringify(isDemoMode));
        }
    }, [isDemoMode]);

    return (
        <DemoModeContext.Provider value={{ isDemoMode, toggleDemoMode }}>
            {children}
        </DemoModeContext.Provider>
    );
}

export function useDemoMode() {
    return useContext(DemoModeContext);
}
