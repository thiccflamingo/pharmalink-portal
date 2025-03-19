
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Package, Truck, ShoppingBag, Users, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition-all duration-200",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent"
      )}
    >
      <span className="text-lg">{icon}</span>
      {!isCollapsed && (
        <span className="font-medium">{label}</span>
      )}
    </Link>
  );
};

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children, isCollapsed }) => {
  return (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="text-xs uppercase font-semibold text-sidebar-foreground/50 px-3 mb-2">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ width: isCollapsed ? 72 : 240 }}
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-sidebar border-r border-border flex flex-col overflow-hidden"
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center w-full")}>
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            PL
          </div>
          {!isCollapsed && <span className="font-semibold text-xl">PharmaLink</span>}
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70",
            isCollapsed && "absolute right-2"
          )}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 pt-4">
        <SidebarSection title="Menu" isCollapsed={isCollapsed}>
          <SidebarLink to="/admin/dashboard" icon={<Home size={20} />} label="Dashboard" isCollapsed={isCollapsed} />
          <SidebarLink to="/admin/inventory" icon={<Package size={20} />} label="Inventory" isCollapsed={isCollapsed} />
          <SidebarLink to="/admin/orders" icon={<ShoppingBag size={20} />} label="Orders" isCollapsed={isCollapsed} />
          <SidebarLink to="/admin/delivery" icon={<Truck size={20} />} label="Delivery" isCollapsed={isCollapsed} />
          <SidebarLink to="/admin/users" icon={<Users size={20} />} label="Users" isCollapsed={isCollapsed} />
          <SidebarLink to="/admin/analytics" icon={<BarChart3 size={20} />} label="Analytics" isCollapsed={isCollapsed} />
        </SidebarSection>
        
        <SidebarSection title="System" isCollapsed={isCollapsed}>
          <SidebarLink to="/admin/settings" icon={<Settings size={20} />} label="Settings" isCollapsed={isCollapsed} />
        </SidebarSection>
      </div>
      
      <div className={cn(
        "border-t border-border p-4 flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="font-medium text-sm">JD</span>
          </div>
          {!isCollapsed && <span className="text-sm font-medium">Admin</span>}
        </div>
        
        {!isCollapsed && (
          <button className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70">
            <Settings size={16} />
          </button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
