import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', href, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-200 transform motion-safe:hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";
    
    const variants = {
      primary: "bg-[var(--color-accent)] text-black hover:brightness-110 hover:shadow-[0_0_20px_var(--color-accent-glow)]",
      outline: "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_20px_var(--color-accent-glow)] bg-transparent",
      ghost: "text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] bg-transparent"
    };
    
    if (href) {
      return (
        <a href={href} className={`${baseStyles} ${variants[variant]} ${className || ''}`}>
          {children}
        </a>
      );
    }
    
    return (
      <button 
        ref={ref} 
        className={`${baseStyles} ${variants[variant]} ${className || ''}`} 
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
