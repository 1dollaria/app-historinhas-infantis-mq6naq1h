import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';

export default function StatsCard({ label, value, color }) {
  return (
    <Box className="flex-1 bg-background-0 rounded-2xl p-4 shadow-soft-1">
      <VStack space="sm">
        <Box className={`w-10 h-10 rounded-full ${color} items-center justify-center`}>
          <Text className="text-white font-bold text-lg">
            {value > 999 ? '999+' : value}
          </Text>
        </Box>
        <VStack space="xs">
          <Text size="2xl" className="text-typography-900 font-bold">
            {value.toLocaleString()}
          </Text>
          <Text size="xs" className="text-typography-500">
            {label}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
