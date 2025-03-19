
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'PharmaLink',
  showSidebar = true,
}) => {
  return (
    <div className="min-h-screen bg-background flex">
      {showSidebar && <Sidebar />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={title} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
