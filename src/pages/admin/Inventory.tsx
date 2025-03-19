
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SearchBar from '@/components/common/SearchBar';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { Edit, FileDown, FilePlus, FileUp, MoreHorizontal, Plus, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock data
const inventoryData = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 9.99,
    stock: 150,
    status: 'In Stock',
    sku: 'PR-001-P5',
    lastUpdated: '2023-05-10',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 14.99,
    stock: 85,
    status: 'In Stock',
    sku: 'AB-002-A2',
    lastUpdated: '2023-05-09',
  },
  {
    id: '3',
    name: 'Vitamin C 1000mg',
    category: 'Vitamins',
    price: 12.49,
    stock: 200,
    status: 'In Stock',
    sku: 'VT-003-C1',
    lastUpdated: '2023-05-12',
  },
  {
    id: '4',
    name: 'Ibuprofen 200mg',
    category: 'Pain Relief',
    price: 8.99,
    stock: 120,
    status: 'In Stock',
    sku: 'PR-004-I2',
    lastUpdated: '2023-05-08',
  },
  {
    id: '5',
    name: 'Cetirizine 10mg',
    category: 'Allergy',
    price: 11.99,
    stock: 75,
    status: 'In Stock',
    sku: 'AL-005-C1',
    lastUpdated: '2023-05-11',
  },
  {
    id: '6',
    name: 'Aspirin 75mg',
    category: 'Pain Relief',
    price: 6.99,
    stock: 8,
    status: 'Low Stock',
    sku: 'PR-006-A7',
    lastUpdated: '2023-05-07',
  },
  {
    id: '7',
    name: 'Loratadine 10mg',
    category: 'Allergy',
    price: 10.49,
    stock: 0,
    status: 'Out of Stock',
    sku: 'AL-007-L1',
    lastUpdated: '2023-05-06',
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

const Inventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  // Filter and sort the inventory data
  const filteredData = inventoryData
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  
  const SortIcon = () => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "ml-1 transform transition-transform duration-200",
        sortOrder === 'desc' ? 'rotate-180' : ''
      )}
    >
      <path d="M8 4L4 8H12L8 4Z" fill="currentColor" />
    </svg>
  );
  
  return (
    <MainLayout title="Inventory Management">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="w-full md:w-1/3">
            <SearchBar 
              placeholder="Search products by name or SKU..."
              onSearch={handleSearch}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              icon={<FileDown size={16} />}
            >
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              icon={<FileUp size={16} />}
            >
              Import
            </Button>
            <Button 
              size="sm"
              icon={<Plus size={16} />}
              onClick={() => console.log('Add new product')}
            >
              Add Product
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
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
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium text-muted-foreground text-sm">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('name')}
                  >
                    Product Name
                    {sortBy === 'name' && <SortIcon />}
                  </button>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground text-sm">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('category')}
                  >
                    Category
                    {sortBy === 'category' && <SortIcon />}
                  </button>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground text-sm">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('price')}
                  >
                    Price
                    {sortBy === 'price' && <SortIcon />}
                  </button>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground text-sm">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('stock')}
                  >
                    Stock
                    {sortBy === 'stock' && <SortIcon />}
                  </button>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground text-sm">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortBy === 'status' && <SortIcon />}
                  </button>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground text-sm">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('sku')}
                  >
                    SKU
                    {sortBy === 'sku' && <SortIcon />}
                  </button>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground text-sm">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('lastUpdated')}
                  >
                    Last Updated
                    {sortBy === 'lastUpdated' && <SortIcon />}
                  </button>
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-border hover:bg-accent/30 transition-colors"
                >
                  <td className="p-3 text-sm">{item.name}</td>
                  <td className="p-3 text-sm">{item.category}</td>
                  <td className="p-3 text-sm">${item.price.toFixed(2)}</td>
                  <td className="p-3 text-sm">{item.stock}</td>
                  <td className="p-3 text-sm">
                    <Badge 
                      variant={
                        item.status === 'In Stock' 
                          ? 'success' 
                          : item.status === 'Low Stock' 
                            ? 'warning' 
                            : 'danger'
                      }
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm">{item.sku}</td>
                  <td className="p-3 text-sm">{item.lastUpdated}</td>
                  <td className="p-3 text-sm text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-1 rounded-md hover:bg-accent"
                        onClick={() => console.log('Edit product', item.id)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-1 rounded-md hover:bg-accent"
                        onClick={() => console.log('Delete product', item.id)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {inventoryData.length} products
          </p>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="px-3 bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default Inventory;
