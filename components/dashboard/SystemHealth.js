'use client';

import { Cpu, HardDrive, Thermometer, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from './StatCard';

export default function SystemHealth({ stats, formatBytes, t }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div variants={itemVariants}>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-gray-100 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-lg shadow-lg shadow-gray-500/20 text-gray-600 dark:text-gray-400">
                    <Cpu size={20} />
                </div>
                {t('dashboard.systemHealth')}
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${stats.voltage ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
                <StatCard
                    icon={Cpu}
                    title="CPU Usage"
                    value={`${stats.cpuLoad}%`}
                    subtitle="Current load"
                    color="blue"
                />
                <StatCard
                    icon={HardDrive}
                    title="Memory Usage"
                    value={`${Math.round((stats.memoryUsed / stats.memoryTotal) * 100)}%`}
                    subtitle={`${formatBytes(stats.memoryUsed)} / ${formatBytes(stats.memoryTotal)}`}
                    color="purple"
                />
                <StatCard
                    icon={Thermometer}
                    title="CPU Temperature"
                    value={stats.temperature ? `${stats.temperature}°C` : 'N/A'}
                    subtitle="System temperature"
                    color="orange"
                />

                {stats.voltage && (
                    <StatCard
                        icon={HardDrive} // Using HardDrive temporarily or import Zap
                        title="System Voltage"
                        value={`${stats.voltage} V`}
                        subtitle="Input Voltage"
                        color="green"
                    />
                )}
            </div>
        </motion.div>
    );
}
