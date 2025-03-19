
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'default', 
    size = 'default', 
    loading = false,
    icon,
    iconPosition = 'left',
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <motion.button
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
          
          // Variant styles
          variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
          variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          variant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
          variant === 'link' && 'text-primary underline-offset-4 hover:underline',
          
          // Size styles
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-9 px-3 text-sm',
          size === 'lg' && 'h-11 px-8 text-lg',
          size === 'icon' && 'h-10 w-10 p-0',
          
          className
        )}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        
        {icon && iconPosition === 'left' && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
