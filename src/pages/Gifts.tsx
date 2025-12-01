import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Gift {
  id: number;
  emoji: string;
  name: string;
  price: number;
  category: 'premium' | 'standard' | 'basic';
}

interface User {
  username: string;
  fullName: string;
  avatar: string;
}

const Gifts = () => {
  const [balance, setBalance] = useState(0);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('crack_user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    const savedBalance = localStorage.getItem('crack_balance');
    setBalance(savedBalance ? parseInt(savedBalance) : 500);
  }, []);

  const gifts: Gift[] = [
    { id: 1, emoji: '🌟', name: 'Звезда', price: 5, category: 'basic' },
    { id: 2, emoji: '💎', name: 'Бриллиант', price: 50, category: 'standard' },
    { id: 3, emoji: '👑', name: 'Корона', price: 100, category: 'premium' },
    { id: 4, emoji: '🎁', name: 'Подарок', price: 10, category: 'basic' },
    { id: 5, emoji: '🔥', name: 'Огонь', price: 15, category: 'basic' },
    { id: 6, emoji: '💖', name: 'Сердце', price: 20, category: 'basic' },
    { id: 7, emoji: '🚀', name: 'Ракета', price: 75, category: 'standard' },
    { id: 8, emoji: '🏆', name: 'Кубок', price: 150, category: 'premium' },
    { id: 9, emoji: '🎨', name: 'Палитра', price: 30, category: 'standard' },
    { id: 10, emoji: '⚡', name: 'Молния', price: 25, category: 'standard' },
    { id: 11, emoji: '🎭', name: 'Маски', price: 40, category: 'standard' },
    { id: 12, emoji: '🌈', name: 'Радуга', price: 35, category: 'standard' },
    { id: 13, emoji: '💫', name: 'Комета', price: 200, category: 'premium' },
    { id: 14, emoji: '🦄', name: 'Единорог', price: 250, category: 'premium' },
    { id: 15, emoji: '🎪', name: 'Цирк', price: 45, category: 'standard' },
  ];

  const allUsers = [
    { username: '@anna_smirnova', fullName: 'Анна Смирнова', avatar: '👩' },
    { username: '@max_petrov', fullName: 'Максим Петров', avatar: '👨' },
    { username: '@elena_k', fullName: 'Елена Кузнецова', avatar: '👩‍🦰' },
    { username: '@dmitriy_work', fullName: 'Дмитрий', avatar: '👨‍💼' },
    { username: '@maria_art', fullName: 'Мария', avatar: '👩‍🎨' },
    { username: '@oleg_dev', fullName: 'Олег', avatar: '🧑‍💻' },
  ];

  const buyCoins = (amount: number, price: number) => {
    toast.success(`Куплено ${amount} Crack за ${price}₽`);
    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem('crack_balance', newBalance.toString());
  };

  const sendGift = (user: User, gift: Gift) => {
    if (balance >= gift.price) {
      const newBalance = balance - gift.price;
      setBalance(newBalance);
      localStorage.setItem('crack_balance', newBalance.toString());
      toast.success(`Подарок ${gift.emoji} ${gift.name} отправлен ${user.fullName}`);
      setShowUserSelect(false);
      setSelectedGift(null);
    } else {
      toast.error('Недостаточно Crack! Пополните баланс');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium': return 'from-primary via-secondary to-accent';
      case 'standard': return 'from-accent to-primary';
      case 'basic': return 'from-muted to-muted-foreground';
      default: return 'from-muted to-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Магазин подарков</h1>
              <p className="text-muted-foreground">Отправляйте подарки друзьям</p>
            </div>
          </div>
          <Card className="p-4 flex items-center gap-3">
            <div className="text-3xl">⚡</div>
            <div>
              <p className="text-sm text-muted-foreground">Ваш баланс</p>
              <p className="text-2xl font-bold">{balance} Crack</p>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/20 to-secondary/20">
          <h2 className="text-xl font-bold mb-4">Пополнить Crack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => buyCoins(50, 59)}
            >
              <div className="text-2xl">⚡</div>
              <div className="font-bold">50 Crack</div>
              <div className="text-sm text-muted-foreground">59₽</div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => buyCoins(100, 99)}
            >
              <div className="text-2xl">⚡⚡</div>
              <div className="font-bold">100 Crack</div>
              <div className="text-sm text-muted-foreground">99₽</div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => buyCoins(250, 219)}
            >
              <div className="text-2xl">⚡⚡⚡</div>
              <div className="font-bold">250 Crack</div>
              <div className="text-sm text-muted-foreground">219₽</div>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => buyCoins(500, 399)}
            >
              <div className="text-2xl">⚡⚡⚡⚡</div>
              <div className="font-bold">500 Crack</div>
              <div className="text-sm text-muted-foreground">399₽</div>
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>💎</span>
              Премиум подарки
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {gifts.filter(g => g.category === 'premium').map((gift) => (
                <Card
                  key={gift.id}
                  className={`p-6 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br ${getCategoryColor(gift.category)}`}
                  onClick={() => {
                    setSelectedGift(gift);
                    setShowUserSelect(true);
                  }}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-3">{gift.emoji}</div>
                    <h3 className="font-bold text-white mb-2">{gift.name}</h3>
                    <Badge className="bg-white/20 text-white">
                      ⚡ {gift.price}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🎁</span>
              Стандартные подарки
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {gifts.filter(g => g.category === 'standard').map((gift) => (
                <Card
                  key={gift.id}
                  className={`p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br ${getCategoryColor(gift.category)}`}
                  onClick={() => {
                    setSelectedGift(gift);
                    setShowUserSelect(true);
                  }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{gift.emoji}</div>
                    <h3 className="font-semibold text-sm text-white mb-1">{gift.name}</h3>
                    <Badge className="bg-white/20 text-white text-xs">
                      ⚡ {gift.price}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>✨</span>
              Базовые подарки
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {gifts.filter(g => g.category === 'basic').map((gift) => (
                <Card
                  key={gift.id}
                  className="p-3 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    setSelectedGift(gift);
                    setShowUserSelect(true);
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-1">{gift.emoji}</div>
                    <h3 className="font-semibold text-xs mb-1">{gift.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      ⚡ {gift.price}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showUserSelect} onOpenChange={setShowUserSelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Кому отправить {selectedGift?.emoji} {selectedGift?.name}?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div className="p-4 bg-muted rounded-xl text-center">
              <div className="text-5xl mb-2">{selectedGift?.emoji}</div>
              <p className="font-bold">{selectedGift?.name}</p>
              <p className="text-sm text-muted-foreground">⚡ {selectedGift?.price} Crack</p>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allUsers.map((user) => (
                <div
                  key={user.username}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => selectedGift && sendGift(user, selectedGift)}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{user.fullName}</h3>
                    <p className="text-xs text-muted-foreground">{user.username}</p>
                  </div>
                  <Icon name="Send" size={20} className="text-primary" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gifts;
