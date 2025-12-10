'use client';

import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';

export default function TrafficHistoryChart({ data }) {
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
                <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/20 rounded-lg shadow-lg shadow-blue-500/20 text-blue-600 dark:text-blue-400">
                    <Activity size={20} />
                </div>
                Internet Traffic Speed (Last 7 Days)
            </h2>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorDownload7d" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorUpload7d" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            tickFormatter={(str) => {
                                const date = new Date(str);
                                return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                            }}
                            tick={{ fontSize: 11, fill: '#6B7280' }}
                            minTickGap={60}
                        />
                        <YAxis
                            tickFormatter={(val) => `${val} Mbps`}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Area
                            type="monotone"
                            dataKey="download"
                            name="Download"
                            unit=" Mbps"
                            stroke="#10B981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorDownload7d)"
                        />
                        <Area
                            type="monotone"
                            dataKey="upload"
                            name="Upload"
                            unit=" Mbps"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorUpload7d)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
