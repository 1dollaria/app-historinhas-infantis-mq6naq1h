import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import StoryCard from '../components/StoryCard';
import StatsCard from '../components/StatsCard';

export default function HomeScreen({ stories, onEdit, onDelete }) {
  const [filter, setFilter] = useState('all');

  const publishedStories = stories.filter(s => s.status === 'published');
  const totalViews = stories.reduce((sum, s) => sum + s.views, 0);
  const totalLikes = stories.reduce((sum, s) => sum + s.likes, 0);

  const filteredStories = filter === 'all' 
    ? stories 
    : stories.filter(s => s.status === filter);

  const handleDelete = (id, title) => {
    Alert.alert(
      'Excluir História',
      `Tem certeza que deseja excluir "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onDelete(id) }
      ]
    );
  };

  return (
    <Box className="flex-1 bg-background-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="p-5 pb-24">
          <VStack space="sm">
            <Heading size="2xl" className="text-typography-900">
              Historinhas Infantis
            </Heading>
            <Text size="sm" className="text-typography-500">
              Gerencie suas histórias e acompanhe o desempenho
            </Text>
          </VStack>

          <HStack space="md">
            <StatsCard
              label="Total"
              value={stories.length}
              color="bg-blue-500"
            />
            <StatsCard
              label="Publicadas"
              value={publishedStories.length}
              color="bg-green-500"
            />
            <StatsCard
              label="Visualizações"
              value={totalViews}
              color="bg-purple-500"
            />
          </HStack>

          <HStack space="sm" className="flex-wrap">
            <FilterButton
              label="Todas"
              active={filter === 'all'}
              onPress={() => setFilter('all')}
            />
            <FilterButton
              label="Publicadas"
              active={filter === 'published'}
              onPress={() => setFilter('published')}
            />
            <FilterButton
              label="Rascunhos"
              active={filter === 'draft'}
              onPress={() => setFilter('draft')}
            />
          </HStack>

          <VStack space="md">
            <Heading size="lg" className="text-typography-900">
              Suas Histórias
            </Heading>
            {filteredStories.length === 0 ? (
              <Box className="bg-background-0 rounded-2xl p-8 items-center">
                <Text className="text-typography-500 text-center">
                  Nenhuma história encontrada
                </Text>
              </Box>
            ) : (
              filteredStories.map(story => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onEdit={() => onEdit(story)}
                  onDelete={() => handleDelete(story.id, story.title)}
                />
              ))
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}

function FilterButton({ label, active, onPress }) {
  const { Pressable } = require('react-native');
  const { Text } = require('@/components/ui/text');
  const { Box } = require('@/components/ui/box');

  return (
    <Pressable onPress={onPress}>
      <Box
        className={`px-4 py-2 rounded-full ${
          active
            ? 'bg-blue-500'
            : 'bg-background-0 border border-outline-200'
        }`}
      >
        <Text
          size="sm"
          className={active ? 'text-white font-medium' : 'text-typography-700'}
        >
          {label}
        </Text>
      </Box>
    </Pressable>
  );
}
