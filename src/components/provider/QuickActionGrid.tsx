import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

type QuickAction = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export type QuickActionGridProps = {
  actions: QuickAction[];
};

export function QuickActionGrid({ actions }: QuickActionGridProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {actions.map((action) => (
        <Pressable key={action.label} onPress={action.onPress} style={styles.item}>
          <View style={[styles.iconWrap, { backgroundColor: colors.surface }]}>
            <MaterialCommunityIcons name={action.icon} size={22} color={colors.primaryDark} />
          </View>
          <Text variant="labelSmall" style={{ color: colors.textPrimary, marginTop: 8, textAlign: 'center' }}>
            {action.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  item: {
    width: 72,
    alignItems: 'center',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
