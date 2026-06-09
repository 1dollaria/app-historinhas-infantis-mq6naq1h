import './global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box } from '@/components/ui/box';
import HomeScreen from './screens/HomeScreen';
import CreateEditScreen from './screens/CreateEditScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [stories, setStories] = useState([
    {
      id: '1',
      title: 'A Princesa e o Dragão',
      category: 'Fantasia',
      ageRange: '5-7 anos',
      status: 'published',
      views: 1243,
      likes: 89,
      createdAt: '2024-01-15',
      content: 'Era uma vez uma princesa corajosa que fez amizade com um dragão...'
    },
    {
      id: '2',
      title: 'O Coelho Aventureiro',
      category: 'Aventura',
      ageRange: '3-5 anos',
      status: 'draft',
      views: 0,
      likes: 0,
      createdAt: '2024-01-20',
      content: 'Um coelhinho curioso decide explorar a floresta...'
    },
    {
      id: '3',
      title: 'Amigos do Oceano',
      category: 'Educativo',
      ageRange: '4-6 anos',
      status: 'published',
      views: 856,
      likes: 67,
      createdAt: '2024-01-10',
      content: 'No fundo do mar, animais marinhos aprendem sobre amizade...'
    },
    {
      id: '4',
      title: 'O Pequeno Inventor',
      category: 'Ciência',
      ageRange: '6-8 anos',
      status: 'published',
      views: 2103,
      likes: 145,
      createdAt: '2024-01-05',
      content: 'Uma criança curiosa cria invenções incríveis...'
    }
  ]);
  const [editingStory, setEditingStory] = useState(null);
  const [settings, setSettings] = useState({
    autoPublish: false,
    notifications: true,
    defaultAgeRange: '5-7 anos',
    language: 'pt-BR'
  });

  const handleCreateStory = (story) => {
    const newStory = {
      ...story,
      id: Date.now().toString(),
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setStories([newStory, ...stories]);
    setCurrentScreen('home');
  };

  const handleUpdateStory = (story) => {
    setStories(stories.map(s => s.id === story.id ? story : s));
    setEditingStory(null);
    setCurrentScreen('home');
  };

  const handleDeleteStory = (id) => {
    setStories(stories.filter(s => s.id !== id));
  };

  const handleEditStory = (story) => {
    setEditingStory(story);
    setCurrentScreen('create');
  };

  const handleCancelEdit = () => {
    setEditingStory(null);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            stories={stories}
            onEdit={handleEditStory}
            onDelete={handleDeleteStory}
          />
        );
      case 'create':
        return (
          <CreateEditScreen
            story={editingStory}
            onSave={editingStory ? handleUpdateStory : handleCreateStory}
            onCancel={handleCancelEdit}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={setSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GluestackUIProvider mode="light">
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Box className="flex-1 bg-background-0">
          {renderScreen()}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
