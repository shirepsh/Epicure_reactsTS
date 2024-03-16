import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderProviderProps {
  children: ReactNode;
}

interface OrderItem {
  restaurantId: string;
  restaurantName: string;
  dishName: string;
  dishImage: string;
  dishQuantity: number;
  dishChanges: string[];
  dishSide: string;
  dishPrice: number;
}

const OrderContext = createContext<{
  order: OrderItem[];
  addToOrder: (item: OrderItem) => void;
  clearOrder: () => void;
}>({
  order: [],
  addToOrder: (item: OrderItem) => {},
  clearOrder: () => {},
});

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const addToOrder = (item: OrderItem) => {
    setOrder((prevOrder) => [...prevOrder, item]);
  };

  const clearOrder = () => {
    setOrder([]);
  };

  return (
    <OrderContext.Provider value={{ order, addToOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
