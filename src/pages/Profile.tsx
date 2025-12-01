import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: number;
  text: string;
  likes: number;
  comments: number;
  time: string;
}

interface User {
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
}

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const allUsers: { [key: string]: User } = {
    '@anna_smirnova': {
      username: '@anna_smirnova',
      fullName: 'Анна Смирнова',
      avatar: '👩',
      bio: 'UX/UI дизайнер | Создаю красивые интерфейсы | Люблю минимализм',
      followers: 892,
      following: 234,
      posts: 45,
    },
    '@max_petrov': {
      username: '@max_petrov',
      fullName: 'Максим Петров',
      avatar: '👨',
      bio: 'Backend разработчик | Python | Node.js | Open source contributor',
      followers: 1543,
      following: 456,
      posts: 78,
    },
    '@elena_k': {
      username: '@elena_k',
      fullName: 'Елена Кузнецова',
      avatar: '👩‍🦰',
      bio: 'Digital маркетолог | SMM | Помогаю брендам расти',
      followers: 2341,
      following: 789,
      posts: 156,
    },
    '@dmitriy_work': {
      username: '@dmitriy_work',
      fullName: 'Дмитрий',
      avatar: '👨‍💼',
      bio: 'Предприниматель | Startup founder | Инвестор',
      followers: 5678,
      following: 234,
      posts: 234,
    },
    '@maria_art': {
      username: '@maria_art',
      fullName: 'Мария',
      avatar: '👩‍🎨',
      bio: 'Художник | Иллюстратор | Продаю NFT',
      followers: 3456,
      following: 567,
      posts: 189,
    },
    '@oleg_dev': {
      username: '@oleg_dev',
      fullName: 'Олег',
      avatar: '🧑‍💻',
      bio: 'Full-stack developer | React | TypeScript | AI enthusiast',
      followers: 1876,
      following: 345,
      posts: 92,
    },
  };

  const user = username ? allUsers[username] : null;

  const posts: Post[] = [
    { id: 1, text: 'Работаю над новым проектом! Скоро покажу результаты 🚀', likes: 234, comments: 45, time: '3 часа назад' },
    { id: 2, text: 'Отличный день для творчества ✨', likes: 156, comments: 23, time: '1 день назад' },
    { id: 3, text: 'Кто хочет поработать вместе? Ищу партнёров для стартапа', likes: 89, comments: 67, time: '2 дня назад' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="UserX" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Пользователь не найден</h2>
          <p className="text-muted-foreground mb-4">Профиль не существует или был удалён</p>
          <Button onClick={() => navigate('/')}>Вернуться назад</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="h-48 bg-gradient-to-br from-primary via-secondary to-accent relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full"
            onClick={() => navigate('/')}
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full bg-card ring-4 ring-background flex items-center justify-center text-6xl">
              {user.avatar}
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-6 bg-card border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <h1 className="text-3xl font-bold mb-1 truncate">{user.fullName}</h1>
              <p className="text-muted-foreground mb-3">{user.username}</p>
              <p className="text-foreground/90 mb-4">{user.bio}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-bold text-lg">{user.posts}</span>
                  <span className="text-muted-foreground ml-1">постов</span>
                </div>
                <div>
                  <span className="font-bold text-lg">{user.followers}</span>
                  <span className="text-muted-foreground ml-1">подписчиков</span>
                </div>
                <div>
                  <span className="font-bold text-lg">{user.following}</span>
                  <span className="text-muted-foreground ml-1">подписок</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant={isFollowing ? 'outline' : 'default'}
                className="rounded-full"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? (
                  <>
                    <Icon name="UserCheck" size={18} className="mr-2" />
                    Подписан
                  </>
                ) : (
                  <>
                    <Icon name="UserPlus" size={18} className="mr-2" />
                    Подписаться
                  </>
                )}
              </Button>
              <Button variant="outline" className="rounded-full">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Написать
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => navigate('/gifts')}>
                <Icon name="Gift" size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Посты</h2>
            <Badge variant="secondary">{user.posts} публикаций</Badge>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{user.fullName}</h3>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                
                <p className="text-foreground/90 mb-4">{post.text}</p>
                
                <div className="flex items-center gap-6 pt-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <Icon name="Heart" size={18} />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-accent">
                    <Icon name="MessageCircle" size={18} />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-secondary">
                    <Icon name="Share2" size={18} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
