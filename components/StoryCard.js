import { Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Button, ButtonText } from '@/components/ui/button';

export default function StoryCard({ story, onEdit, onDelete }) {
  const statusConfig = {
    published: { action: 'success', label: 'Publicada' },
    draft: { action: 'warning', label: 'Rascunho' }
  };

  const config = statusConfig[story.status];

  return (
    <Box className="bg-background-0 rounded-2xl p-5 shadow-soft-1">
      <VStack space="md">
        <HStack space="md" className="items-start justify-between">
          <VStack space="xs" className="flex-1">
            <Text size="lg" className="text-typography-900 font-semibold">
              {story.title}
            </Text>
            <HStack space="sm" className="items-center">
              <Badge action={config.action} size="sm">
                <BadgeText>{config.label}</BadgeText>
              </Badge>
              <Text size="xs" className="text-typography-500">
                {story.category}
              </Text>
              <Text size="xs" className="text-typography-500">
                • {story.ageRange}
              </Text>
            </HStack>
          </VStack>
        </HStack>

        <Text size="sm" className="text-typography-600" numberOfLines={2}>
          {story.content}
        </Text>

        {story.status === 'published' && (
          <HStack space="lg" className="pt-2">
            <VStack space="xs">
              <Text size="xs" className="text-typography-500">
                Visualizações
              </Text>
              <Text size="md" className="text-typography-900 font-semibold">
                {story.views.toLocaleString()}
              </Text>
            </VStack>
            <VStack space="xs">
              <Text size="xs" className="text-typography-500">
                Curtidas
              </Text>
              <Text size="md" className="text-typography-900 font-semibold">
                {story.likes.toLocaleString()}
              </Text>
            </VStack>
            <VStack space="xs">
              <Text size="xs" className="text-typography-500">
                Criada em
              </Text>
              <Text size="sm" className="text-typography-700">
                {new Date(story.createdAt).toLocaleDateString('pt-BR')}
              </Text>
            </VStack>
          </HStack>
        )}

        <HStack space="sm" className="pt-2">
          <Box className="flex-1">
            <Button
              variant="outline"
              size="sm"
              onPress={onEdit}
              className="border-blue-300"
            >
              <ButtonText className="text-blue-600">Editar</ButtonText>
            </Button>
          </Box>
          <Box className="flex-1">
            <Button
              variant="outline"
              size="sm"
              onPress={onDelete}
              className="border-red-300"
            >
              <ButtonText className="text-red-600">Excluir</ButtonText>
            </Button>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
}
