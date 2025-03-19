
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glassmorphism?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glassmorphism = false,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        glassmorphism && "glass",
        hover && "transition-all duration-200 hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
