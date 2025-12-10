'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function AeroBackground() {
    const { effectiveMode } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Base Background Color */}
            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950 transition-colors duration-700" />

            {/* Blob 1 - Top Left */}
            <div className={`
                absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 rounded-full mix-blend-multiply filter blur-[64px] opacity-70 animate-blob
                transition-colors duration-700
                ${effectiveMode === 'dark' ? 'bg-purple-900 mix-blend-screen opacity-40' : 'bg-purple-200'}
            `} />

            {/* Blob 2 - Top Right */}
            <div className={`
                absolute top-0 -right-4 w-72 h-72 md:w-96 md:h-96 rounded-full mix-blend-multiply filter blur-[64px] opacity-70 animate-blob animation-delay-2000
                transition-colors duration-700
                ${effectiveMode === 'dark' ? 'bg-blue-900 mix-blend-screen opacity-40' : 'bg-blue-200'}
            `} />

            {/* Blob 3 - Bottom Left */}
            <div className={`
                absolute -bottom-8 left-20 w-72 h-72 md:w-96 md:h-96 rounded-full mix-blend-multiply filter blur-[64px] opacity-70 animate-blob animation-delay-4000
                transition-colors duration-700
                ${effectiveMode === 'dark' ? 'bg-indigo-900 mix-blend-screen opacity-40' : 'bg-pink-200'}
            `} />

            {/* Glass Grain Overlay for Texture */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
