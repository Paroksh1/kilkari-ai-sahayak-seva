
import { useEffect, useState } from 'react';
import { Plus, ShoppingBag, X } from 'lucide-react';
import { User, ShoppingItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getRecommendedItems, toggleItemPurchased, addShoppingItem, deleteShoppingItem } from '@/lib/shoppingUtils';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShoppingListProps {
  user: User;
}

const ShoppingList = ({ user }: ShoppingListProps) => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ShoppingItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemForm, setNewItemForm] = useState({
    name: '',
    category: 'essentials',
    essential: true,
  });
  
  useEffect(() => {
    loadItems();
  }, [user]);
  
  useEffect(() => {
    if (searchQuery) {
      setFilteredItems(
        items.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [items, searchQuery]);
  
  const loadItems = () => {
    const recommendedItems = getRecommendedItems(user);
    setItems(recommendedItems);
    setFilteredItems(recommendedItems);
  };
  
  const handleTogglePurchased = (id: string) => {
    toggleItemPurchased(id);
    loadItems();
  };

  const handleAddItem = () => {
    if (!newItemForm.name.trim()) {
      toast.error('कृपया वस्तु का नाम दर्ज करें / Please enter an item name');
      return;
    }
    
    const newItem: Omit<ShoppingItem, 'id'> = {
      name: newItemForm.name,
      category: newItemForm.category,
      stage: user.pregnancyWeek !== undefined ? 'pregnancy' : 'baby',
      stageValue: user.pregnancyWeek !== undefined ? user.pregnancyWeek : (user.babyMonths || 0),
      essential: newItemForm.essential,
      purchased: false,
    };
    
    addShoppingItem(newItem);
    toast.success('आइटम जोड़ा गया / Item added');
    setNewItemForm({
      name: '',
      category: 'essentials',
      essential: true,
    });
    setIsAddingItem(false);
    loadItems();
  };
  
  const handleDeleteItem = (id: string) => {
    deleteShoppingItem(id);
    toast.success('आइटम हटा दिया गया / Item removed');
    loadItems();
  };
  
  const categoryCounts = Object.entries(
    items.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  
  const purchasedCount = items.filter(item => item.purchased).length;
  const essentialCount = items.filter(item => item.essential).length;
  const progress = items.length > 0 ? (purchasedCount / items.length) * 100 : 0;
  
  return (
    <>
      <Card className="kilkari-card">
        <CardHeader className="bg-kilkari-purple/10 pb-2">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>आवश्यक सामान की सूची / Essential Shopping List</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingItem(true)}
              className="text-kilkari-purple hover:text-kilkari-purple/90 border-kilkari-purple/20"
            >
              <Plus className="h-4 w-4 mr-1" />
              आइटम जोड़ें / Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="आइटम खोजें / Search items"
                className="kilkari-input"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-3 bg-kilkari-purple/10 rounded-lg text-center">
                <p className="text-lg font-medium">{items.length}</p>
                <p className="text-xs">कुल आइटम / Total Items</p>
              </div>
              <div className="p-3 bg-kilkari-blue/20 rounded-lg text-center">
                <p className="text-lg font-medium">{purchasedCount}</p>
                <p className="text-xs">खरीदे गए / Purchased</p>
              </div>
              <div className="p-3 bg-kilkari-pink rounded-lg text-center">
                <p className="text-lg font-medium">{essentialCount}</p>
                <p className="text-xs">आवश्यक / Essential</p>
              </div>
            </div>
            
            {categoryCounts.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categoryCounts.map(([category, count]) => (
                  <div 
                    key={category}
                    className="px-2 py-1 text-xs rounded-full bg-kilkari-purple/10 text-kilkari-purple"
                  >
                    {category} ({count})
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-2">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border flex items-center justify-between ${
                      item.purchased 
                        ? 'bg-muted/20 border-muted' 
                        : 'border-kilkari-purple/10 hover:border-kilkari-purple/30'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={item.purchased}
                        onCheckedChange={() => handleTogglePurchased(item.id)}
                        className="data-[state=checked]:bg-kilkari-purple data-[state=checked]:border-kilkari-purple"
                      />
                      <div className={item.purchased ? 'opacity-60' : ''}>
                        <label 
                          htmlFor={`item-${item.id}`}
                          className={`font-medium cursor-pointer ${item.purchased ? 'line-through' : ''}`}
                        >
                          {item.name}
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-kilkari-gray text-muted-foreground">
                            {item.category}
                          </span>
                          {item.essential && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-kilkari-pink text-kilkari-purple">
                              आवश्यक / Essential
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-kilkari-purple/5 rounded-lg">
                  {searchQuery ? (
                    <p className="text-muted-foreground">कोई आइटम नहीं मिला / No items found</p>
                  ) : (
                    <div className="space-y-2">
                      <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">आपकी शॉपिंग लिस्ट खाली है / Your shopping list is empty</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingItem(true)}
                        className="text-kilkari-purple hover:text-kilkari-purple/90 border-kilkari-purple/20"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        आइटम जोड़ें / Add Item
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {filteredItems.length > 0 && (
              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-sm">
                  {purchasedCount}/{items.length} आइटम खरीदे गए / items purchased ({Math.round(progress)}%)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>नया आइटम जोड़ें / Add New Item</DialogTitle>
            <DialogDescription>
              अपनी शॉपिंग लिस्ट में नया आइटम जोड़ें / Add a new item to your shopping list
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">आइटम का नाम / Item Name *</Label>
              <Input
                id="item-name"
                value={newItemForm.name}
                onChange={(e) => setNewItemForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="आइटम का नाम दर्ज करें / Enter item name"
                className="kilkari-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-category">श्रेणी / Category *</Label>
              <Select
                value={newItemForm.category}
                onValueChange={(value) => setNewItemForm(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger id="item-category" className="kilkari-input">
                  <SelectValue placeholder="श्रेणी चुनें / Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="essentials">आवश्यक सामान / Essentials</SelectItem>
                  <SelectItem value="clothing">कपड़े / Clothing</SelectItem>
                  <SelectItem value="feeding">फीडिंग / Feeding</SelectItem>
                  <SelectItem value="hygiene">स्वच्छता / Hygiene</SelectItem>
                  <SelectItem value="comfort">आराम / Comfort</SelectItem>
                  <SelectItem value="preparation">तैयारी / Preparation</SelectItem>
                  <SelectItem value="supplements">सप्लिमेंट्स / Supplements</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="item-essential"
                checked={newItemForm.essential}
                onCheckedChange={(checked) => 
                  setNewItemForm(prev => ({ ...prev, essential: checked === true }))
                }
                className="data-[state=checked]:bg-kilkari-purple data-[state=checked]:border-kilkari-purple"
              />
              <label
                htmlFor="item-essential"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                आवश्यक आइटम / Essential item
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingItem(false)}
            >
              रद्द करें / Cancel
            </Button>
            <Button
              onClick={handleAddItem}
              className="kilkari-button-primary"
            >
              जोड़ें / Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShoppingList;
