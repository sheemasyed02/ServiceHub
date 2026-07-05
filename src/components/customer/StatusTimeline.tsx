import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type TimelineStep = {
  label: string;
  time?: string;
  completed: boolean;
  active: boolean;
};

export type StatusTimelineProps = {
  steps: TimelineStep[];
};

export function StatusTimeline({ steps }: StatusTimelineProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.wrap}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <View key={step.label} style={styles.step}>
            <View style={styles.lineCol}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: step.completed || step.active ? colors.primary : colors.border,
                    borderColor: step.active ? colors.primary : colors.border,
                  },
                  step.active && styles.dotActive,
                ]}
              >
                {step.completed ? (
                  <MaterialCommunityIcons name="check" size={12} color={colors.onPrimary} />
                ) : null}
              </View>
              {!isLast ? (
                <View
                  style={[
                    styles.line,
                    { backgroundColor: step.completed ? colors.primary : colors.borderLight },
                  ]}
                />
              ) : null}
            </View>
            <View style={styles.content}>
              <Text
                variant="labelLarge"
                style={{
                  color: step.active ? colors.primaryDark : colors.textPrimary,
                  fontWeight: step.active ? '700' : '500',
                }}
              >
                {step.label}
              </Text>
              {step.time ? (
                <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
                  {step.time}
                </Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    gap: 0,
  },
  step: {
    flexDirection: 'row',
    gap: 14,
    minHeight: 56,
  },
  lineCol: {
    alignItems: 'center',
    width: 24,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  line: {
    flex: 1,
    width: 2,
    marginVertical: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 16,
    gap: 2,
  },
});
