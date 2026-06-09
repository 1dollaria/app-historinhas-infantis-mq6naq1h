import { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';

export default function CreateEditScreen({ story, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Fantasia');
  const [ageRange, setAgeRange] = useState('5-7 anos');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setCategory(story.category);
      setAgeRange(story.ageRange);
      setContent(story.content);
      setStatus(story.status);
    }
  }, [story]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Erro', 'Por favor, escreva o conteúdo da história');
      return;
    }

    const storyData = {
      ...(story || {}),
      title: title.trim(),
      category,
      ageRange,
      content: content.trim(),
      status
    };

    onSave(storyData);
  };

  const categories = ['Fantasia', 'Aventura', 'Educativo', 'Ciência', 'Animais', 'Família'];
  const ageRanges = ['3-5 anos', '4-6 anos', '5-7 anos', '6-8 anos', '7-9 anos'];

  return (
    <Box className="flex-1 bg-background-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="p-5 pb-24">
          <VStack space="sm">
            <Heading size="2xl" className="text-typography-900">
              {story ? 'Editar História' : 'Nova História'}
            </Heading>
            <Text size="sm" className="text-typography-500">
              {story ? 'Atualize os detalhes da sua história' : 'Crie uma nova história para as crianças'}
            </Text>
          </VStack>

          <VStack space="md" className="bg-background-0 rounded-2xl p-5 shadow-soft-1">
            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Título *
              </Text>
              <Input variant="outline" className="bg-background-0">
                <InputField
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Ex: A Princesa e o Dragão"
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Categoria
              </Text>
              <HStack space="sm" className="flex-wrap">
                {categories.map(cat => (
                  <SelectButton
                    key={cat}
                    label={cat}
                    selected={category === cat}
                    onPress={() => setCategory(cat)}
                  />
                ))}
              </HStack>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Faixa Etária
              </Text>
              <HStack space="sm" className="flex-wrap">
                {ageRanges.map(age => (
                  <SelectButton
                    key={age}
                    label={age}
                    selected={ageRange === age}
                    onPress={() => setAgeRange(age)}
                  />
                ))}
              </HStack>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Conteúdo *
              </Text>
              <Input variant="outline" className="bg-background-0 min-h-40">
                <InputField
                  value={content}
                  onChangeText={setContent}
                  placeholder="Escreva sua história aqui..."
                  multiline
                  numberOfLines={8}
                  style={{ textAlignVertical: 'top', paddingTop: 12 }}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Status
              </Text>
              <HStack space="sm">
                <SelectButton
                  label="Rascunho"
                  selected={status === 'draft'}
                  onPress={() => setStatus('draft')}
                />
                <SelectButton
                  label="Publicada"
                  selected={status === 'published'}
                  onPress={() => setStatus('published')}
                />
              </HStack>
            </VStack>
          </VStack>

          <HStack space="md">
            <Box className="flex-1">
              <Button
                variant="outline"
                onPress={onCancel}
                className="border-outline-300"
              >
                <ButtonText className="text-typography-700">Cancelar</ButtonText>
              </Button>
            </Box>
            <Box className="flex-1">
              <Button
                action="primary"
                onPress={handleSave}
                className="bg-blue-500"
              >
                <ButtonText>{story ? 'Atualizar' : 'Criar'}</ButtonText>
              </Button>
            </Box>
          </HStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}

function SelectButton({ label, selected, onPress }) {
  const { Pressable } = require('react-native');
  const { Text } = require('@/components/ui/text');
  const { Box } = require('@/components/ui/box');

  return (
    <Pressable onPress={onPress}>
      <Box
        className={`px-4 py-2 rounded-full mb-2 ${
          selected
            ? 'bg-blue-500'
            : 'bg-background-50 border border-outline-200'
        }`}
      >
        <Text
          size="sm"
          className={selected ? 'text-white font-medium' : 'text-typography-700'}
        >
          {label}
        </Text>
      </Box>
    </Pressable>
  );
}
