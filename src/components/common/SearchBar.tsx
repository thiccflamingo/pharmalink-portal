
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...',
  className,
  initialValue = '',
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        'relative flex items-center w-full',
        className
      )}
    >
      <div
        className={cn(
          'relative flex items-center w-full rounded-lg transition-all duration-200',
          isFocused ? 'ring-2 ring-primary/30' : ''
        )}
      >
        <Search
          className="absolute left-3 text-muted-foreground"
          size={18}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-background border border-input rounded-lg focus:outline-none"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={handleClear}
              className="absolute right-3 p-1 rounded-full hover:bg-accent"
            >
              <X size={16} className="text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default SearchBar;
