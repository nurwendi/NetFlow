'use client';

import { motion } from 'framer-motion';
import { colorSchemes } from './constants';

const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue', alert = false, onClick }) => {
    const scheme = colorSchemes[color] || colorSchemes.blue;

    const solidColors = {
        blue: 'text-blue-500 dark:text-blue-400',
        green: 'text-emerald-500 dark:text-emerald-400',
        purple: 'text-purple-500 dark:text-purple-400',
        orange: 'text-orange-500 dark:text-orange-400',
        red: 'text-red-500 dark:text-red-400',
    };

    const iconColor = solidColors[color] || solidColors.blue;


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={onClick}
            className={`
                relative group
                bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl 
                shadow-xl ${scheme.shadow} ${scheme.hoverGlow}
                p-6 
                border border-white/20 dark:border-white/5
                transition-all duration-300 
                cursor-pointer overflow-hidden
                ${alert ? 'ring-2 ring-red-500 ring-offset-2' : ''}
            `}
        >
            {/* Gradient background overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-transparent dark:from-gray-800 dark:via-gray-900/50 opacity-60 pointer-events-none`} />

            {/* Content */}
            <div className="relative z-10">
                {/* Icon container with gradient */}
                <motion.div
                    className={`
                        inline-flex p-4 rounded-2xl mb-4
                        bg-gradient-to-br ${scheme.iconBg}
                        shadow-lg ${scheme.shadow}
                        transition-all duration-300
                        group-hover:scale-110 group-hover:rotate-3
                    `}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <Icon className={`${iconColor}`} size={28} strokeWidth={2.5} />
                </motion.div>


                {/* Title */}
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2 tracking-wide uppercase">
                    {title}
                </h3>

                {/* Value with gradient text */}
                <p className={`
                    text-3xl font-bold mb-1 truncate
                    bg-gradient-to-r ${scheme.textGradient}
                    bg-clip-text text-transparent
                `} title={value}>
                    {value}
                </p>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium mt-2">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Hover shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-r ${scheme.gradient} opacity-5`} />
            </div>
        </motion.div>
    );
};

export default StatCard;
