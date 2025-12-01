import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('crack_user', JSON.stringify({
      username: formData.username,
      fullName: formData.fullName || formData.username,
      avatar: '🧑‍💻',
    }));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="text-center space-y-6">
            <div className="text-8xl mb-6 animate-scale-in">⚡</div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Crack
            </h1>
            <p className="text-xl text-muted-foreground">
              Новое поколение социальных сетей
            </p>
            <div className="flex gap-4 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="MessageCircle" size={20} />
                <span>Мессенджер</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={20} />
                <span>Профили</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={20} />
                <span>Истории</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="p-8 animate-fade-in">
          <div className="mb-6 text-center md:hidden">
            <div className="text-5xl mb-3">⚡</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Crack
            </h2>
          </div>

          <div className="flex gap-2 mb-6">
            <Button
              variant={isLogin ? 'default' : 'ghost'}
              className="flex-1"
              onClick={() => setIsLogin(true)}
            >
              Вход
            </Button>
            <Button
              variant={!isLogin ? 'default' : 'ghost'}
              className="flex-1"
              onClick={() => setIsLogin(false)}
            >
              Регистрация
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Имя и Фамилия</label>
                <Input
                  placeholder="Александр Иванов"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required={!isLogin}
                  className="bg-muted border-0"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  placeholder="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="pl-8 bg-muted border-0"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required={!isLogin}
                  className="bg-muted border-0"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Пароль</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-muted border-0"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              {isLogin ? 'Войти' : 'Создать аккаунт'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? (
              <p>
                Нет аккаунта?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:underline"
                >
                  Зарегистрируйтесь
                </button>
              </p>
            ) : (
              <p>
                Уже есть аккаунт?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:underline"
                >
                  Войдите
                </button>
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
