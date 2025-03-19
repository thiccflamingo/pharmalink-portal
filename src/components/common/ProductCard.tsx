
import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  className 
}) => {
  const isLowStock = product.stock < 10 && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  return (
    <Card 
      className={cn("p-0 overflow-hidden", className)} 
      hover
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-[200px] object-cover object-center"
        />
        
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-700 hover:text-red-500 transition-colors"
          >
            <Heart size={16} />
          </motion.button>
        </div>
        
        {isLowStock && (
          <Badge 
            variant="warning" 
            className="absolute top-2 left-2"
          >
            Low Stock
          </Badge>
        )}
        
        {isOutOfStock && (
          <Badge 
            variant="danger" 
            className="absolute top-2 left-2"
          >
            Out of Stock
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
          
          <Button 
            variant="primary" 
            size="sm"
            disabled={isOutOfStock}
            onClick={() => onAddToCart && onAddToCart(product)}
            icon={<ShoppingCart size={16} />}
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
