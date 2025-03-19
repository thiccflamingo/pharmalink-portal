
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SearchBar from '@/components/common/SearchBar';
import Button from '@/components/common/Button';
import ProductCard, { Product } from '@/components/common/ProductCard';
import Badge from '@/components/common/Badge';
import { Filter, Grid, List, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const products: Product[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: 'For fever and pain relief. Pack of 20 tablets.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pain Relief',
    stock: 150,
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    description: 'Antibiotic for bacterial infections. Pack of 10 tablets.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Antibiotics',
    stock: 85,
  },
  {
    id: '3',
    name: 'Vitamin C 1000mg',
    description: 'Supports immune health. Pack of 30 tablets.',
    price: 12.49,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Vitamins',
    stock: 200,
  },
  {
    id: '4',
    name: 'Ibuprofen 200mg',
    description: 'Anti-inflammatory for pain relief. Pack of 16 tablets.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1550572017-9a5ddd9d5861?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pain Relief',
    stock: 120,
  },
  {
    id: '5',
    name: 'Cetirizine 10mg',
    description: 'For allergy relief. Pack of 14 tablets.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Allergy',
    stock: 75,
  },
  {
    id: '6',
    name: 'Aspirin 75mg',
    description: 'Blood thinning medication. Pack of 28 tablets.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pain Relief',
    stock: 8,
  },
];

const categories = [
  'All Categories',
  'Pain Relief',
  'Antibiotics',
  'Vitamins',
  'Allergy',
  'Cold & Flu',
  'Skin Care',
];

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <MainLayout title="Browse Products" showSidebar={false}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Browse Products</h1>
        
        <div className="relative">
          <button 
            className="flex items-center justify-center p-2 rounded-md bg-primary text-primary-foreground relative"
            onClick={() => console.log('View cart')}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="w-full sm:w-2/3">
            <SearchBar 
              placeholder="Search products..."
              onSearch={handleSearch}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              icon={<Filter size={16} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter
            </Button>
            
            <div className="flex border border-border rounded-md overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-accent' : 'bg-background'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'bg-accent' : 'bg-background'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="flex items-center gap-2 overflow-x-auto py-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }
        >
          {filteredProducts.map(product => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard 
                product={product}
                onAddToCart={handleAddToCart}
                className={viewMode === 'list' ? "flex flex-col md:flex-row md:h-[180px]" : ""}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
            </p>
            <p className="font-semibold">${totalPrice.toFixed(2)}</p>
          </div>
          
          <Button onClick={() => console.log('Checkout')}>
            Checkout
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default ProductsPage;
