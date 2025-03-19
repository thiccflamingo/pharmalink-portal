
import React, { useState } from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = 'Dashboard' }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <header className="border-b border-border bg-card z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-md hover:bg-accent"
          >
            <Menu size={20} />
          </button>
        </div>
        
        <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
        
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md bg-accent text-foreground border-none outline-none focus:ring-2 focus:ring-primary/50 w-[240px]"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-accent">
            <Bell size={20} />
          </button>
          
          <div className="w-px h-6 bg-border mx-1"></div>
          
          <Link to="/profile" className="flex items-center gap-2 p-1 rounded-full hover:bg-accent">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <User size={16} />
            </div>
          </Link>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className={cn(
        "md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border z-20 shadow-lg transform transition-transform",
        showMobileMenu ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md bg-accent text-foreground border-none outline-none focus:ring-2 focus:ring-primary/50 w-full"
            />
          </div>
          
          <nav className="space-y-1">
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/admin/inventory" className="nav-link">Inventory</Link>
            <Link to="/admin/orders" className="nav-link">Orders</Link>
            <Link to="/admin/delivery" className="nav-link">Delivery</Link>
            <Link to="/admin/users" className="nav-link">Users</Link>
            <Link to="/admin/analytics" className="nav-link">Analytics</Link>
            <Link to="/admin/settings" className="nav-link">Settings</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
