
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import { Check, Clock, MapPin, Phone, User, CheckCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

// Define delivery status type
type DeliveryStatus = 'assigned' | 'picked_up' | 'in_transit' | 'delivered';

// Mock data with proper types
const deliveryOrders: {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  total: number;
  status: DeliveryStatus;
  assignedAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
}[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      address: '123 Main St, Anytown, AT 12345',
      phone: '(123) 456-7890',
    },
    items: [
      { id: 'P1', name: 'Paracetamol 500mg', quantity: 2 },
      { id: 'P2', name: 'Vitamin C 1000mg', quantity: 1 },
    ],
    total: 34.97,
    status: 'assigned',
    assignedAt: '2023-05-15 10:30 AM',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      address: '456 Oak Ave, Somewhere, SW 67890',
      phone: '(987) 654-3210',
    },
    items: [
      { id: 'P3', name: 'Antacid 200mg', quantity: 1 },
      { id: 'P4', name: 'Bandages (Pack of 10)', quantity: 2 },
    ],
    total: 28.97,
    status: 'picked_up',
    assignedAt: '2023-05-15 09:15 AM',
    pickedUpAt: '2023-05-15 11:20 AM',
  },
];

const completedDeliveries: {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  total: number;
  status: DeliveryStatus;
  assignedAt: string;
  pickedUpAt: string;
  deliveredAt: string;
}[] = [
  {
    id: 'ORD-003',
    customer: {
      name: 'Robert Johnson',
      address: '789 Pine Rd, Elsewhere, EW 13579',
      phone: '(456) 789-0123',
    },
    items: [
      { id: 'P5', name: 'Ibuprofen 200mg', quantity: 1 },
      { id: 'P6', name: 'Cough Syrup 100ml', quantity: 1 },
    ],
    total: 22.98,
    status: 'delivered',
    assignedAt: '2023-05-14 14:20 PM',
    pickedUpAt: '2023-05-14 15:30 PM',
    deliveredAt: '2023-05-14 16:45 PM',
  },
];

interface DeliveryOrderProps {
  order: {
    id: string;
    customer: {
      name: string;
      address: string;
      phone: string;
    };
    items: Array<{
      id: string;
      name: string;
      quantity: number;
    }>;
    total: number;
    status: DeliveryStatus;
    assignedAt: string;
    pickedUpAt?: string;
    deliveredAt?: string;
  };
  onUpdateStatus: (orderId: string, newStatus: DeliveryStatus) => void;
}

const DeliveryOrderCard: React.FC<DeliveryOrderProps> = ({ order, onUpdateStatus }) => {
  const statusInfo = {
    assigned: {
      label: 'Assigned to you',
      color: 'info',
      icon: <Clock size={16} />,
      nextAction: 'picked_up',
      nextLabel: 'Mark as Picked Up',
    },
    picked_up: {
      label: 'Picked Up',
      color: 'warning',
      icon: <Truck size={16} />,
      nextAction: 'in_transit',
      nextLabel: 'Mark as In Transit',
    },
    in_transit: {
      label: 'In Transit',
      color: 'primary',
      icon: <Truck size={16} />,
      nextAction: 'delivered',
      nextLabel: 'Mark as Delivered',
    },
    delivered: {
      label: 'Delivered',
      color: 'success',
      icon: <CheckCheck size={16} />,
      nextAction: null,
      nextLabel: null,
    },
  };
  
  const currentStatus = statusInfo[order.status];
  
  return (
    <Card className="mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
          <h3 className="font-medium">{order.customer.name}</h3>
        </div>
        
        <Badge
          variant={currentStatus.color as any}
          className="flex items-center gap-1"
        >
          {currentStatus.icon} {currentStatus.label}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <MapPin size={18} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Delivery Address</p>
              <p className="text-sm text-muted-foreground">{order.customer.address}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Contact</p>
              <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Items</p>
          <div className="space-y-1">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-border flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-medium">${order.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Assigned:</span> {order.assignedAt}
          </div>
          
          {order.pickedUpAt && (
            <div className="text-sm">
              <span className="text-muted-foreground">Picked up:</span> {order.pickedUpAt}
            </div>
          )}
          
          {order.deliveredAt && (
            <div className="text-sm">
              <span className="text-muted-foreground">Delivered:</span> {order.deliveredAt}
            </div>
          )}
        </div>
        
        {currentStatus.nextAction && (
          <Button
            className="w-full mt-2"
            icon={order.status === 'assigned' ? <Truck size={16} /> : <Check size={16} />}
            onClick={() => onUpdateStatus(order.id, currentStatus.nextAction as DeliveryStatus)}
          >
            {currentStatus.nextLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};

const DeliveryDashboard: React.FC = () => {
  const [orders, setOrders] = useState(deliveryOrders);
  const [completed, setCompleted] = useState(completedDeliveries);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  
  const handleUpdateStatus = (orderId: string, newStatus: DeliveryStatus) => {
    const now = new Date().toLocaleString();
    
    if (newStatus === 'delivered') {
      // Move to completed
      const orderToUpdate = orders.find(o => o.id === orderId);
      
      if (orderToUpdate) {
        const updatedOrder = {
          ...orderToUpdate,
          status: newStatus,
          pickedUpAt: orderToUpdate.pickedUpAt || now, // Ensure pickedUpAt exists
          deliveredAt: now,
        };
        
        setCompleted([updatedOrder, ...completed]);
        setOrders(orders.filter(o => o.id !== orderId));
      }
    } else {
      // Update status
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          const updates: Partial<typeof order> = { status: newStatus };
          
          if (newStatus === 'picked_up') {
            updates.pickedUpAt = now;
          } else if (newStatus === 'in_transit') {
            updates.inTransitAt = now as any; // Type coercion for inTransitAt
          }
          
          return { ...order, ...updates };
        }
        
        return order;
      }));
    }
  };
  
  return (
    <MainLayout title="Delivery Dashboard" showSidebar={false}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Hello, Mike!</h1>
          <p className="text-muted-foreground">You have {orders.length} active deliveries</p>
        </div>
        
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <User size={24} />
        </div>
      </div>
      
      <div className="flex border-b border-border mb-6">
        <button
          className={`flex-1 py-3 font-medium text-center border-b-2 ${
            activeTab === 'active' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Deliveries ({orders.length})
        </button>
        <button
          className={`flex-1 py-3 font-medium text-center border-b-2 ${
            activeTab === 'completed' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({completed.length})
        </button>
      </div>
      
      <div className="space-y-4">
        {activeTab === 'active' ? (
          orders.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {orders.map(order => (
                <DeliveryOrderCard
                  key={order.id}
                  order={order}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <Check size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">All caught up!</h3>
              <p className="text-muted-foreground">
                You don't have any active deliveries right now.
              </p>
            </div>
          )
        ) : (
          completed.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {completed.map(order => (
                <DeliveryOrderCard
                  key={order.id}
                  order={order}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <Truck size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No completed deliveries</h3>
              <p className="text-muted-foreground">
                Complete some deliveries to see them here.
              </p>
            </div>
          )
        )}
      </div>
    </MainLayout>
  );
};

export default DeliveryDashboard;
