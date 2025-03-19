
import React from 'react';
import { BarChart3, Package, ShoppingBag, TrendingUp, Truck, Users } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/common/Card';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { OrderCard, type Order } from '@/components/common/OrderCard';

// Mock data for dashboard
const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
  { month: 'Jul', sales: 7000 },
];

const categoryData = [
  { category: 'Pain Relief', value: 35 },
  { category: 'Vitamins', value: 25 },
  { category: 'Cold & Flu', value: 20 },
  { category: 'Skin Care', value: 15 },
  { category: 'Others', value: 5 },
];

const recentOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      address: '123 Main St, Anytown, AT 12345',
      phone: '(123) 456-7890',
    },
    items: [
      { id: 'P1', name: 'Paracetamol', quantity: 2, price: 9.99 },
      { id: 'P2', name: 'Vitamin C', quantity: 1, price: 14.99 },
    ],
    total: 34.97,
    status: 'pending',
    date: '2023-05-15',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      address: '456 Oak Ave, Somewhere, SW 67890',
      phone: '(987) 654-3210',
    },
    items: [
      { id: 'P3', name: 'Antacid', quantity: 1, price: 12.99 },
      { id: 'P4', name: 'Bandages', quantity: 2, price: 7.99 },
    ],
    total: 28.97,
    status: 'processing',
    date: '2023-05-14',
    deliveryPerson: 'Mike Johnson',
  },
];

const Dashboard: React.FC = () => {
  return (
    <MainLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Products</p>
            <h3 className="text-2xl font-semibold">1,248</h3>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <h3 className="text-2xl font-semibold">842</h3>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Truck size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending Deliveries</p>
            <h3 className="text-2xl font-semibold">24</h3>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <h3 className="text-2xl font-semibold">$34,589</h3>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Sales Overview</h3>
            <select className="bg-background border border-input rounded-md text-sm px-2 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </select>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#0ea5e9" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Product Categories</h3>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis 
                  type="category" 
                  dataKey="category" 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#0ea5e9" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Recent Orders</h3>
            <a href="/admin/orders" className="text-primary text-sm">View all</a>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onClick={() => console.log('View order', order.id)}
              />
            ))}
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Delivery Team</h3>
            <a href="/admin/delivery" className="text-primary text-sm">View all</a>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-md hover:bg-accent">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Users size={18} />
              </div>
              <div>
                <h4 className="font-medium">Mike Johnson</h4>
                <p className="text-sm text-muted-foreground">5 deliveries today</p>
              </div>
              <div className="ml-auto bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Active</div>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-md hover:bg-accent">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Users size={18} />
              </div>
              <div>
                <h4 className="font-medium">Sarah Williams</h4>
                <p className="text-sm text-muted-foreground">3 deliveries today</p>
              </div>
              <div className="ml-auto bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Active</div>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-md hover:bg-accent">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Users size={18} />
              </div>
              <div>
                <h4 className="font-medium">David Lee</h4>
                <p className="text-sm text-muted-foreground">8 deliveries today</p>
              </div>
              <div className="ml-auto bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">On break</div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
