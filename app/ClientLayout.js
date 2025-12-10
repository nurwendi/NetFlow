'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import BottomDock from '@/components/BottomDock';
import SessionTimeoutHandler from "@/components/SessionTimeoutHandler";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { DashboardProvider } from '@/contexts/DashboardContext';
import AeroBackground from '@/components/AeroBackground';

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const isInvoicePage = pathname.startsWith('/invoice');
    const isPublicPage = isLoginPage || isInvoicePage;

    return (
        <LanguageProvider>
            <DashboardProvider>
                <div className="relative min-h-screen overflow-hidden">
                    <SessionTimeoutHandler />
                    {/* Aero Background */}
                    <AeroBackground />

                    {!isPublicPage && (
                        <>
                            <BottomDock />
                        </>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`min-h-screen ${!isPublicPage ? 'pt-8 px-8 pb-32' : ''}`}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </DashboardProvider>
        </LanguageProvider>
    );
}
