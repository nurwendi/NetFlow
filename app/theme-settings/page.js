'use client';

import { useTheme, accentColors } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor, Palette, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeSettingsPage() {
    const { theme, updateTheme, setAccentColor, effectiveMode } = useTheme();

    const modes = [
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'system', label: 'System', icon: Monitor }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Theme Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Customize the appearance of your application
                </p>
            </div>

            {/* Preview Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-white/5"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                        <Sparkles className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">Current Theme</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {theme.mode === 'system' ? `System (${effectiveMode})` : theme.mode.charAt(0).toUpperCase() + theme.mode.slice(1)}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Theme Mode Selection */}
            <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-white/5">
                <div className="flex items-center gap-2 mb-6">
                    <Monitor className="text-blue-600 dark:text-blue-400" size={20} />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Theme Mode</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {modes.map((mode) => {
                        const Icon = mode.icon;
                        const isActive = theme.mode === mode.value;

                        return (
                            <motion.button
                                key={mode.value}
                                onClick={() => updateTheme({ mode: mode.value })}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    relative p-6 rounded-xl border-2 transition-all duration-300
                                    ${isActive
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }
                                `}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`
                                        p-3 rounded-xl transition-colors
                                        ${isActive
                                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                            : 'bg-gray-100 dark:bg-gray-700'
                                        }
                                    `}>
                                        <Icon
                                            size={24}
                                            className={isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}
                                        />
                                    </div>
                                    <span className={`font-semibold ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {mode.label}
                                    </span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-mode"
                                        className="absolute inset-0 rounded-xl border-2 border-blue-500"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Accent Color Selection */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6">
                    <Palette className="text-purple-600 dark:text-purple-400" size={20} />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Accent Color</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.entries(accentColors).map(([name, color]) => {
                        const isActive = theme.accentName === name;

                        return (
                            <motion.button
                                key={name}
                                onClick={() => setAccentColor(name)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`
                                    relative p-4 rounded-xl border-2 transition-all duration-300
                                    ${isActive
                                        ? 'border-gray-400 dark:border-gray-500 shadow-lg'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }
                                `}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className="w-12 h-12 rounded-full shadow-lg"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                        {name}
                                    </span>
                                </div>
                                {isActive && (
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Glassmorphism Toggle */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                            Glassmorphism Effect
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enable translucent glass-like effects
                        </p>
                    </div>
                    <button
                        onClick={() => updateTheme({ glass: !theme.glass })}
                        className={`
                            relative w-14 h-8 rounded-full transition-colors duration-300
                            ${theme.glass ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                        `}
                    >
                        <motion.div
                            className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                            animate={{ x: theme.glass ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
