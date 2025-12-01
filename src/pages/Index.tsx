import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
}

interface Story {
  id: number;
  username: string;
  avatar: string;
  viewed: boolean;
}

interface Post {
  id: number;
  text: string;
  likes: number;
  comments: number;
  time: string;
  image?: string;
}

const Index = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [activeView, setActiveView] = useState<'messenger' | 'profile'>('messenger');

  const stories: Story[] = [
    { id: 1, username: 'Анна', avatar: '👩', viewed: false },
    { id: 2, username: 'Максим', avatar: '👨', viewed: false },
    { id: 3, username: 'Елена', avatar: '👩‍🦰', viewed: true },
    { id: 4, username: 'Дмитрий', avatar: '👨‍💼', viewed: false },
    { id: 5, username: 'Мария', avatar: '👩‍🎨', viewed: true },
    { id: 6, username: 'Олег', avatar: '🧑‍💻', viewed: false },
  ];

  const chats: Chat[] = [
    { id: 1, name: 'Анна Смирнова', avatar: '👩', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, online: true },
    { id: 2, name: 'Разработчики', avatar: '💻', lastMessage: 'Кто будет на созвоне?', time: '13:20', unread: 5, online: false },
    { id: 3, name: 'Максим Петров', avatar: '👨', lastMessage: 'Отправил файлы', time: '12:05', unread: 0, online: true },
    { id: 4, name: 'Семья ❤️', avatar: '👨‍👩‍👧‍👦', lastMessage: 'Мама: Не забудь позвонить', time: 'Вчера', unread: 1, online: false },
    { id: 5, name: 'Елена Кузнецова', avatar: '👩‍🦰', lastMessage: 'Спасибо большое!', time: 'Вчера', unread: 0, online: false },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как дела?', time: '14:30', sent: false },
    { id: 2, text: 'Привет! Всё отлично, спасибо!', time: '14:31', sent: true },
    { id: 3, text: 'А у тебя как?', time: '14:31', sent: true },
    { id: 4, text: 'Тоже хорошо! Работаю над проектом 😊', time: '14:32', sent: false },
  ];

  const posts: Post[] = [
    { id: 1, text: 'Запустил новый проект! 🚀 Очень рад поделиться результатами работы. Это было непросто, но оно того стоило.', likes: 127, comments: 15, time: '2 часа назад' },
    { id: 2, text: 'Прекрасный день для кодинга ☕️💻', likes: 89, comments: 8, time: '5 часов назад' },
    { id: 3, text: 'Кто-нибудь знает хорошие курсы по TypeScript?', likes: 45, comments: 23, time: 'Вчера' },
  ];

  const userProfile = {
    name: 'Александр Иванов',
    username: '@alex_dev',
    avatar: '🧑‍💻',
    bio: 'Frontend разработчик | React энтузиаст | Люблю создавать крутые интерфейсы',
    followers: 1247,
    following: 389,
    posts: posts.length,
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform">
          🚀
        </div>
        
        <div className="flex flex-col gap-4 flex-1">
          <Button
            variant={activeView === 'messenger' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-xl"
            onClick={() => setActiveView('messenger')}
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
          
          <Button
            variant={activeView === 'profile' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-xl"
            onClick={() => setActiveView('profile')}
          >
            <Icon name="User" size={24} />
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl">
          <Icon name="Settings" size={24} />
        </Button>
      </div>

      {activeView === 'messenger' && (
        <>
          <div className="w-96 bg-card border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h2 className="text-2xl font-bold mb-4">Сообщения</h2>
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Поиск..." className="pl-10 bg-muted border-0" />
              </div>
            </div>

            <div className="px-4 py-3 border-b border-border">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {stories.map((story) => (
                  <div key={story.id} className="flex flex-col items-center gap-1 min-w-fit cursor-pointer group">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${story.viewed ? 'ring-2 ring-muted' : 'ring-2 ring-primary'} group-hover:scale-110 transition-transform`}>
                      {story.avatar}
                    </div>
                    <span className="text-xs text-muted-foreground truncate max-w-[60px]">{story.username}</span>
                  </div>
                ))}
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-muted ${activeChat === chat.id ? 'bg-muted' : ''}`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground">{chat.unread}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 flex flex-col">
            {activeChat ? (
              <>
                <div className="h-16 bg-card border-b border-border flex items-center px-6 gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                      {chats.find(c => c.id === activeChat)?.avatar}
                    </div>
                    {chats.find(c => c.id === activeChat)?.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{chats.find(c => c.id === activeChat)?.name}</h3>
                    <p className="text-xs text-muted-foreground">В сети</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Icon name="Phone" size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Icon name="Video" size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Icon name="MoreVertical" size={20} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sent ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                        <div className={`max-w-md px-4 py-2.5 rounded-2xl ${message.sent ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p className="text-sm">{message.text}</p>
                          <span className={`text-xs mt-1 block ${message.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{message.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 bg-card border-t border-border">
                  <div className="flex gap-3">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <Input
                      placeholder="Написать сообщение..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 bg-muted border-0"
                    />
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Icon name="Smile" size={20} />
                    </Button>
                    <Button size="icon" className="rounded-full" onClick={sendMessage}>
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Icon name="MessageCircle" size={48} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
                  <p className="text-muted-foreground">Начните общение с друзьями</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeView === 'profile' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-primary via-secondary to-accent relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full bg-card ring-4 ring-background flex items-center justify-center text-6xl">
                {userProfile.avatar}
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-6 bg-card border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-1">{userProfile.name}</h1>
                <p className="text-muted-foreground mb-3">{userProfile.username}</p>
                <p className="text-foreground/90 max-w-xl mb-4">{userProfile.bio}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-bold text-lg">{userProfile.posts}</span>
                    <span className="text-muted-foreground ml-1">постов</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">{userProfile.followers}</span>
                    <span className="text-muted-foreground ml-1">подписчиков</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">{userProfile.following}</span>
                    <span className="text-muted-foreground ml-1">подписок</span>
                  </div>
                </div>
              </div>
              <Button className="rounded-full">
                <Icon name="Edit" size={18} className="mr-2" />
                Редактировать
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="max-w-2xl mx-auto p-8 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Мои посты</h2>
                <Button size="sm" className="rounded-full">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать пост
                </Button>
              </div>

              {posts.map((post) => (
                <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                      {userProfile.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{userProfile.name}</h3>
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
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Index;
