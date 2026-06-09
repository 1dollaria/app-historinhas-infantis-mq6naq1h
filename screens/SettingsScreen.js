import { ScrollView, Switch } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';

export default function SettingsScreen({ settings, onUpdateSettings }) {
  const updateSetting = (key, value) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <Box className="flex-1 bg-background-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="p-5 pb-24">
          <VStack space="sm">
            <Heading size="2xl" className="text-typography-900">
              Configurações
            </Heading>
            <Text size="sm" className="text-typography-500">
              Personalize sua experiência
            </Text>
          </VStack>

          <VStack space="md" className="bg-background-0 rounded-2xl p-5 shadow-soft-1">
            <Text size="md" className="text-typography-900 font-semibold">
              Publicação
            </Text>
            <Divider className="bg-outline-100" />
            
            <SettingRow
              label="Publicação Automática"
              description="Publicar histórias automaticamente ao criar"
              value={settings.autoPublish}
              onValueChange={(val) => updateSetting('autoPublish', val)}
            />

            <SettingRow
              label="Notificações"
              description="Receber alertas sobre novas visualizações e curtidas"
              value={settings.notifications}
              onValueChange={(val) => updateSetting('notifications', val)}
            />
          </VStack>

          <VStack space="md" className="bg-background-0 rounded-2xl p-5 shadow-soft-1">
            <Text size="md" className="text-typography-900 font-semibold">
              Padrões
            </Text>
            <Divider className="bg-outline-100" />
            
            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Faixa Etária Padrão
              </Text>
              <Text size="sm" className="text-typography-500">
                {settings.defaultAgeRange}
              </Text>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Idioma
              </Text>
              <Text size="sm" className="text-typography-500">
                Português (Brasil)
              </Text>
            </VStack>
          </VStack>

          <VStack space="md" className="bg-background-0 rounded-2xl p-5 shadow-soft-1">
            <Text size="md" className="text-typography-900 font-semibold">
              Sobre
            </Text>
            <Divider className="bg-outline-100" />
            
            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Versão do App
              </Text>
              <Text size="sm" className="text-typography-500">
                1.0.0
              </Text>
            </VStack>

            <VStack space="xs">
              <Text size="sm" className="text-typography-700 font-medium">
                Desenvolvido por
              </Text>
              <Text size="sm" className="text-typography-500">
                Historinhas Infantis Team
              </Text>
            </VStack>
          </VStack>

          <Box className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <VStack space="sm">
              <Text size="md" className="text-blue-900 font-semibold">
                💡 Dica Premium
              </Text>
              <Text size="sm" className="text-blue-700">
                Ative as notificações para acompanhar o engajamento das suas histórias em tempo real!
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}

function SettingRow({ label, description, value, onValueChange }) {
  return (
    <HStack space="md" className="items-center justify-between">
      <VStack space="xs" className="flex-1">
        <Text size="sm" className="text-typography-900 font-medium">
          {label}
        </Text>
        <Text size="xs" className="text-typography-500">
          {description}
        </Text>
      </VStack>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
        thumbColor="#ffffff"
      />
    </HStack>
  );
}
