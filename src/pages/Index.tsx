
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, ShoppingBag, Truck, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}> = ({ icon, title, description, className }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100",
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              PL
            </div>
            <span className="font-semibold text-xl">PharmaLink</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="#features" className="text-foreground hover:text-primary transition-colors">Features</Link>
            <Link to="#about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="#contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Link 
              to="/customer/products" 
              className="px-4 py-2 rounded-md bg-primary/10 text-primary font-medium transition-colors hover:bg-primary/20"
            >
              Shop Now
            </Link>
            <Link 
              to="/admin/dashboard" 
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-accent py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Modern Pharmacy Management System
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Streamline your pharmacy operations with our comprehensive inventory management system. Manage products, 
                track orders, and deliver medications efficiently.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/customer/products" 
                  className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  Get Started <ChevronRight size={18} />
                </Link>
                <Link 
                  to="/admin/dashboard" 
                  className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  Admin Dashboard
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
                alt="Pharmacy" 
                className="rounded-xl shadow-2xl w-full max-w-lg mx-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Pharmacy Management
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a complete solution for pharmacy inventory management, order tracking, delivery coordination, and customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Package size={24} />}
              title="Inventory Management"
              description="Track stock levels, manage product details, and receive low-stock alerts to ensure you never run out of essential medications."
            />
            <FeatureCard 
              icon={<ShoppingBag size={24} />}
              title="Order Processing"
              description="Efficiently process customer orders, manage prescriptions, and prepare packages for delivery with minimal effort."
            />
            <FeatureCard 
              icon={<Truck size={24} />}
              title="Delivery Coordination"
              description="Assign deliveries to your team, track order status in real-time, and ensure timely delivery to your customers."
            />
            <FeatureCard 
              icon={<Users size={24} />}
              title="Customer Management"
              description="Build relationships with your customers by tracking their preferences, purchase history, and medication needs."
            />
            <FeatureCard 
              icon={<Package size={24} />}
              title="Analytics & Reports"
              description="Gain insights into your pharmacy's performance with detailed reports on sales, inventory, and popular products."
            />
            <FeatureCard 
              icon={<Package size={24} />}
              title="Multi-platform Access"
              description="Access your pharmacy management system from anywhere using our responsive web application optimized for desktops and mobile devices."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to modernize your pharmacy operations?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start using our pharmacy management system today and experience the benefits of streamlined inventory management, efficient order processing, and improved customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/admin/dashboard" 
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Try Admin Dashboard <ChevronRight size={18} />
              </Link>
              <Link 
                to="/delivery/dashboard" 
                className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                Delivery Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  PL
                </div>
                <span className="font-semibold text-xl">PharmaLink</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Modern pharmacy inventory management system designed to streamline operations, manage stock, and improve customer service.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li><Link to="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link to="#about" className="text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link to="#contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Dashboards</h3>
              <ul className="space-y-2">
                <li><Link to="/admin/dashboard" className="text-muted-foreground hover:text-primary">Admin</Link></li>
                <li><Link to="/delivery/dashboard" className="text-muted-foreground hover:text-primary">Delivery</Link></li>
                <li><Link to="/customer/products" className="text-muted-foreground hover:text-primary">Customer</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>info@pharmalink.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Pharmacy Street</li>
                <li>Healthcare City, HC 12345</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2023 PharmaLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
