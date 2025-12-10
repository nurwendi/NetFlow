'use client';

import { Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';

export default function TemperatureChart({ data }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    if (!data || data.length <= 1) return null;

    return (
        <motion.div variants={itemVariants} className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-white/5">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/20 rounded-lg shadow-lg shadow-orange-500/20 text-orange-600 dark:text-orange-400">
                    <Thermometer size={20} />
                </div>
                Temperature Monitor
            </h2>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 10, fill: '#6B7280' }}
                            minTickGap={60}
                        />
                        <YAxis
                            domain={['dataMin - 5', 'dataMax + 5']}
                            tickFormatter={(val) => `${val}°C`}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="temperature"
                            name="Temperature"
                            unit="°C"
                            stroke="#F97316"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
