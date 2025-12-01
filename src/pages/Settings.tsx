import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface User {
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  phone?: string;
}

const Settings = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: '',
    phone: '',
  });
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    likes: true,
    comments: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showPhone: false,
    showLastSeen: true,
  });

  const avatars = ['👨', '👩', '🧑', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🎨', '👩‍🎨', '🧑‍🎨', '👨‍🔬', '👩‍🔬', '🧑‍🔬', '👨‍🎓', '👩‍🎓', '🧑‍🎓', '👨‍🍳', '👩‍🍳', '🧑‍🍳', '🧙‍♂️', '🧙‍♀️', '🦸‍♂️', '🦸‍♀️', '🧝‍♂️', '🧝‍♀️', '🧛‍♂️', '🧛‍♀️', '🧚‍♂️', '🧚‍♀️', '👼', '🎅', '🤶', '🦹‍♂️', '🦹‍♀️'];

  useEffect(() => {
    const userData = localStorage.getItem('crack_user');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        bio: user.bio || '',
        phone: user.phone || '',
      });
    }
  }, []);

  const handleSaveProfile = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        fullName: formData.fullName,
        username: formData.username,
        bio: formData.bio,
        phone: formData.phone,
      };
      localStorage.setItem('crack_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      toast.success('Профиль обновлён');
    }
  };

  const handleChangeAvatar = (avatar: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, avatar };
      localStorage.setItem('crack_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setShowAvatarPicker(false);
      toast.success('Аватар обновлён');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('crack_user');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Настройки</h1>
            <p className="text-muted-foreground">Управляйте своим профилем</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="User" size={24} />
              Профиль
            </h2>
            
            <div className="flex items-center gap-6 mb-6">
              <Dialog open={showAvatarPicker} onOpenChange={setShowAvatarPicker}>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-5xl group-hover:ring-4 ring-primary transition-all">
                      {currentUser?.avatar}
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="Camera" size={32} className="text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Выберите аватар</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-8 gap-3 max-h-96 overflow-y-auto p-4">
                    {avatars.map((avatar, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 flex items-center justify-center text-3xl cursor-pointer hover:bg-muted rounded-xl transition-colors"
                        onClick={() => handleChangeAvatar(avatar)}
                      >
                        {avatar}
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{currentUser?.fullName}</h3>
                <p className="text-muted-foreground">{currentUser?.username}</p>
                <Button variant="link" className="p-0 h-auto mt-1" onClick={() => setShowAvatarPicker(true)}>
                  Изменить фото
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Имя и Фамилия</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Александр Иванов"
                  className="bg-muted border-0"
                />
              </div>

              <div className="space-y-2">
                <Label>Username</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <Input
                    value={formData.username.replace('@', '')}
                    onChange={(e) => setFormData({ ...formData, username: '@' + e.target.value.replace('@', '') })}
                    placeholder="username"
                    className="pl-8 bg-muted border-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Био</Label>
                <Input
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Расскажите о себе..."
                  className="bg-muted border-0"
                />
              </div>

              <div className="space-y-2">
                <Label>Номер телефона</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (999) 123-45-67"
                  className="bg-muted border-0"
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full">
                Сохранить изменения
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Bell" size={24} />
              Уведомления
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Новые сообщения</p>
                  <p className="text-sm text-muted-foreground">Уведомления о новых сообщениях</p>
                </div>
                <Switch checked={notifications.messages} onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Упоминания</p>
                  <p className="text-sm text-muted-foreground">Когда вас упоминают</p>
                </div>
                <Switch checked={notifications.mentions} onCheckedChange={(checked) => setNotifications({ ...notifications, mentions: checked })} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Лайки</p>
                  <p className="text-sm text-muted-foreground">Когда кто-то лайкает ваши посты</p>
                </div>
                <Switch checked={notifications.likes} onCheckedChange={(checked) => setNotifications({ ...notifications, likes: checked })} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Комментарии</p>
                  <p className="text-sm text-muted-foreground">Новые комментарии к постам</p>
                </div>
                <Switch checked={notifications.comments} onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Lock" size={24} />
              Приватность
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Публичный профиль</p>
                  <p className="text-sm text-muted-foreground">Любой может найти ваш профиль</p>
                </div>
                <Switch checked={privacy.profileVisible} onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Показывать номер телефона</p>
                  <p className="text-sm text-muted-foreground">Другие могут видеть ваш номер</p>
                </div>
                <Switch checked={privacy.showPhone} onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Показывать "был(а) в сети"</p>
                  <p className="text-sm text-muted-foreground">Другие видят когда вы онлайн</p>
                </div>
                <Switch checked={privacy.showLastSeen} onCheckedChange={(checked) => setPrivacy({ ...privacy, showLastSeen: checked })} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Info" size={24} />
              О приложении
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Версия</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Платформа</span>
                <span className="font-medium">Crack Social</span>
              </div>
              <Separator />
              <Button variant="link" className="p-0 h-auto">Политика конфиденциальности</Button>
              <Button variant="link" className="p-0 h-auto">Условия использования</Button>
              <Button variant="link" className="p-0 h-auto">Поддержка</Button>
            </div>
          </Card>

          <Card className="p-6 border-destructive">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-destructive">
              <Icon name="LogOut" size={24} />
              Выход
            </h2>
            <p className="text-muted-foreground mb-4">
              Вы уверены, что хотите выйти из аккаунта?
            </p>
            <Button variant="destructive" onClick={handleLogout} className="w-full">
              Выйти из аккаунта
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
