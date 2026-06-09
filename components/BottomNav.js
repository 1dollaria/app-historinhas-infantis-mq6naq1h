import { Pressable, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';

export default function BottomNav({ currentScreen, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Início' },
    { id: 'create', label: 'Criar' },
    { id: 'settings', label: 'Config' }
  ];

  return (
    <Box className="absolute bottom-0 left-0 right-0 bg-background-0 border-t border-outline-200 shadow-soft-1">
      <HStack className="justify-around py-2">
        {tabs.map(tab => (
          <NavButton
            key={tab.id}
            label={tab.label}
            active={currentScreen === tab.id}
            onPress={() => onNavigate(tab.id)}
          />
        ))}
      </HStack>
    </Box>
  );
}

function NavButton({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1, alignItems: 'center' }}>
      <VStack space="xs" className="items-center py-2">
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: active ? '#3b82f6' : '#d1d5db'
          }}
        />
        <Text
          size="xs"
          className={active ? 'text-blue-600 font-semibold' : 'text-typography-500'}
        >
          {label}
        </Text>
      </VStack>
    </Pressable>
  );
}
