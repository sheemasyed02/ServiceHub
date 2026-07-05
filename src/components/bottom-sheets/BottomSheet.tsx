import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/ui';
import { useAppTheme } from '@/hooks';

export type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showHandle?: boolean;
  contentStyle?: ViewStyle;
};

export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  footer,
  showHandle = true,
  contentStyle,
}: BottomSheetProps) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(400)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 9,
          tension: 70,
          useNativeDriver: true,
        }),
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdrop, translateY, visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity: backdrop }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            shadows.lg,
            {
              backgroundColor: colors.surface,
              paddingBottom: Math.max(insets.bottom, 16),
              transform: [{ translateY }],
            },
          ]}
        >
          {showHandle ? <View style={[styles.handle, { backgroundColor: colors.border }]} /> : null}

          {title ? (
            <View style={styles.header}>
              <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '700' }}>
                {title}
              </Text>
              <Pressable onPress={onClose} hitSlop={8}>
                <MaterialCommunityIcons name="close" size={22} color={colors.textTertiary} />
              </Pressable>
            </View>
          ) : null}

          <View style={[styles.content, contentStyle]}>{children}</View>
          {footer}
        </Animated.View>
      </View>
    </Modal>
  );
}

export type SheetOptionProps = {
  label: string;
  description?: string;
  selected?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export function SheetOption({ label, description, selected, icon, onPress }: SheetOptionProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        {
          backgroundColor: selected ? colors.surface : colors.surfaceVariant,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}
    >
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={selected ? colors.primaryDark : colors.textSecondary}
        />
      ) : null}
      <View style={{ flex: 1 }}>
        <Text
          variant="bodyLarge"
          style={{ color: colors.textPrimary, fontWeight: selected ? '700' : '500' }}
        >
          {label}
        </Text>
        {description ? (
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            {description}
          </Text>
        ) : null}
      </View>
      {selected ? (
        <MaterialCommunityIcons name="check-circle" size={20} color={colors.primaryDark} />
      ) : null}
    </Pressable>
  );
}

export type SheetFooterProps = {
  label?: string;
  onApply: () => void;
  onReset?: () => void;
};

export function SheetFooter({ label = 'Apply', onApply, onReset }: SheetFooterProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.footer, { borderTopColor: colors.borderLight }]}>
      {onReset ? (
        <Pressable onPress={onReset} style={styles.resetBtn}>
          <Text variant="labelLarge" style={{ color: colors.textSecondary, fontWeight: '600' }}>
            Reset
          </Text>
        </Pressable>
      ) : null}
      <PrimaryButton
        label={label}
        onPress={onApply}
        fullWidth={!onReset}
        style={onReset ? styles.applyHalf : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(24, 24, 27, 0.45)',
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '88%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  content: {
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  resetBtn: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  applyHalf: {
    flex: 1,
  },
});
