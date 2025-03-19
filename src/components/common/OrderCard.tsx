
import React from 'react';
import { Clock, Package, Truck, Check } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import { cn } from '@/lib/utils';

export type OrderStatus = 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string;
  deliveryPerson?: string;
}

interface OrderCardProps {
  order: Order;
  onClick?: (order: Order) => void;
  className?: string;
  showItems?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onClick,
  className,
  showItems = false,
}) => {
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'dispatched':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <Check className="h-4 w-4" />;
      case 'cancelled':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: OrderStatus): 'info' | 'warning' | 'success' | 'danger' | 'primary' => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'dispatched':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'info';
    }
  };

  return (
    <Card
      className={cn("", className)}
      onClick={() => onClick && onClick(order)}
      hover={!!onClick}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
            <h3 className="font-medium">{order.customer.name}</h3>
          </div>
          
          <Badge
            variant={getStatusVariant(order.status)}
            className="flex items-center gap-1 capitalize"
          >
            {getStatusIcon(order.status)} {order.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="text-sm">{order.date}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm">{order.customer.phone}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Delivery</p>
            <p className="text-sm">{order.deliveryPerson || 'Not assigned'}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Address</p>
          <p className="text-sm">{order.customer.address}</p>
        </div>

        {showItems && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Items</p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrderCard;
