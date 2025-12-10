'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Preset accent colors
export const accentColors = {
    blue: '#3B82F6',
    purple: '#A855F7',
    green: '#10B981',
    orange: '#F97316',
    pink: '#EC4899',
    cyan: '#06B6D4'
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState({
        mode: 'light', // 'light', 'dark', 'system'
        glass: true,   // Glassmorphism effect
        accentColor: accentColors.blue,
        accentName: 'blue'
    });

    const [systemPreference, setSystemPreference] = useState('light');

    // Detect system preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateSystemPreference = (e) => {
            setSystemPreference(e.matches ? 'dark' : 'light');
        };

        // Set initial value
        setSystemPreference(mediaQuery.matches ? 'dark' : 'light');

        // Listen for changes
        mediaQuery.addEventListener('change', updateSystemPreference);

        return () => mediaQuery.removeEventListener('change', updateSystemPreference);
    }, []);

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme_preference');
        if (savedTheme) {
            try {
                const parsed = JSON.parse(savedTheme);
                setTheme(parsed);
            } catch (e) {
                console.error('Failed to parse theme preference', e);
            }
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark', 'glass-mode');

        // Determine effective mode
        const effectiveMode = theme.mode === 'system' ? systemPreference : theme.mode;

        // Apply mode
        root.classList.add(effectiveMode);

        // Apply glass mode
        if (theme.glass) {
            root.classList.add('glass-mode');
        }

        // Apply accent color
        root.style.setProperty('--accent-color', theme.accentColor);

        // Save to localStorage
        localStorage.setItem('theme_preference', JSON.stringify(theme));
    }, [theme, systemPreference]);

    const updateTheme = (updates) => {
        setTheme(prev => ({ ...prev, ...updates }));
    };

    const setAccentColor = (colorName) => {
        updateTheme({
            accentColor: accentColors[colorName],
            accentName: colorName
        });
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            updateTheme,
            setAccentColor,
            systemPreference,
            effectiveMode: theme.mode === 'system' ? systemPreference : theme.mode
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
