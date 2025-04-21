
import { ShoppingItem, User } from '@/types';
import { mockShoppingItems } from './mockData';

// Save shopping items to localStorage
export const saveShoppingItems = (items: ShoppingItem[]): void => {
  localStorage.setItem('kilkari-shopping-items', JSON.stringify(items));
};

// Get shopping items from localStorage
export const getShoppingItems = (): ShoppingItem[] => {
  const itemsStr = localStorage.getItem('kilkari-shopping-items');
  return itemsStr ? JSON.parse(itemsStr) : mockShoppingItems;
};

// Toggle item purchased status
export const toggleItemPurchased = (id: string): void => {
  const items = getShoppingItems();
  saveShoppingItems(
    items.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    )
  );
};

// Get recommended shopping items based on user profile
export const getRecommendedItems = (user: User): ShoppingItem[] => {
  const allItems = getShoppingItems();
  
  if (user.pregnancyWeek !== undefined) {
    // For pregnant women
    return allItems.filter(
      item => item.stage === 'pregnancy' && item.stageValue <= user.pregnancyWeek!
    );
  } else if (user.babyMonths !== undefined) {
    // For new mothers
    return allItems.filter(
      item => item.stage === 'baby' && item.stageValue <= user.babyMonths!
    );
  }
  
  return [];
};

// Add new shopping item
export const addShoppingItem = (item: Omit<ShoppingItem, 'id'>): ShoppingItem => {
  const items = getShoppingItems();
  const newItem = {
    ...item,
    id: Date.now().toString(),
  };
  
  saveShoppingItems([...items, newItem]);
  return newItem;
};

// Delete shopping item
export const deleteShoppingItem = (id: string): void => {
  const items = getShoppingItems();
  saveShoppingItems(items.filter(item => item.id !== id));
};
