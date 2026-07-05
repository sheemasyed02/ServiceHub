import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProviderScreen, ProviderSectionHeader } from '@/components/provider';
import { PrimaryButton, SecondaryButton } from '@/components/ui';
import { MOCK_BLOCKED_DATES, MOCK_CALENDAR_BOOKINGS, MOCK_TIME_SLOTS } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderCalendarStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderCalendarStackParamList, 'CalendarMain'>;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function ProviderCalendarScreen(_props: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const insets = useSafeAreaInsets();
  const today = new Date(2026, 6, 5);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [slots, setSlots] = useState(MOCK_TIME_SLOTS);

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);
    return cells;
  }, [month, year]);

  const dateKey = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const isBlocked = (day: number) => MOCK_BLOCKED_DATES.includes(dateKey(day));
  const upcoming = MOCK_CALENDAR_BOOKINGS.filter((b) => b.date === dateKey(selectedDay));

  const shiftMonth = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setMonth(d.getMonth());
    setYear(d.getFullYear());
  };

  return (
    <ProviderScreen edges={[]} bottomPadding={120}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary }}>
          Calendar
        </Text>
      </View>

      <View
        style={[
          styles.calendarCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.monthRow}>
          <Pressable onPress={() => shiftMonth(-1)} hitSlop={12}>
            <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '600' }}>
            {MONTHS[month]} {year}
          </Text>
          <Pressable onPress={() => shiftMonth(1)} hitSlop={12}>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.weekRow}>
          {WEEKDAYS.map((d) => (
            <Text
              key={d}
              variant="labelSmall"
              style={[styles.weekDay, { color: colors.textTertiary }]}
            >
              {d}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {days.map((day, i) => {
            if (day === null) return <View key={`e-${i}`} style={styles.dayCell} />;
            const blocked = isBlocked(day);
            const selected = day === selectedDay;
            const isToday =
              day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            return (
              <Pressable
                key={day}
                onPress={() => setSelectedDay(day)}
                style={[
                  styles.dayCell,
                  selected && { backgroundColor: colors.primary },
                  blocked && !selected && { backgroundColor: colors.errorContainer },
                  isToday && !selected && { borderWidth: 1, borderColor: colors.primary },
                ]}
              >
                <Text
                  variant="labelMedium"
                  style={{
                    color: selected
                      ? colors.onPrimary
                      : blocked
                        ? colors.error
                        : colors.textPrimary,
                    fontWeight: isToday ? '700' : '400',
                  }}
                >
                  {day}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ProviderSectionHeader title="Upcoming bookings" />
      {upcoming.length === 0 ? (
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, paddingHorizontal: 20 }}>
          No bookings on this date
        </Text>
      ) : (
        upcoming.map((b) => (
          <View
            key={b.id}
            style={[
              styles.booking,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text variant="titleSmall" style={{ color: colors.textPrimary }}>
              {b.service}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              {b.customerName} · {b.time}
            </Text>
          </View>
        ))
      )}

      <View style={styles.spacer} />
      <ProviderSectionHeader title="Available time slots" />
      <View style={styles.slots}>
        {slots.map((slot) => (
          <Pressable
            key={slot.id}
            onPress={() =>
              setSlots((prev) =>
                prev.map((s) => (s.id === slot.id ? { ...s, available: !s.available } : s)),
              )
            }
            style={[
              styles.slot,
              {
                backgroundColor: slot.available ? colors.successContainer : colors.surfaceVariant,
                borderColor: slot.available ? colors.success : colors.border,
              },
            ]}
          >
            <Text variant="labelMedium" style={{ color: colors.textPrimary }}>
              {slot.label}
            </Text>
            <Text
              variant="labelSmall"
              style={{ color: slot.available ? colors.success : colors.textTertiary }}
            >
              {slot.available ? 'Available' : 'Blocked'}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.slotActions}>
        <SecondaryButton label="Add availability" onPress={() => {}} style={{ flex: 1 }} />
        <PrimaryButton
          label="Remove availability"
          onPress={() => {}}
          style={{ flex: 1 }}
          tone="secondary"
        />
      </View>
      <View style={{ height: 24 }} />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, marginBottom: 16 },
  calendarCard: { marginHorizontal: 20, padding: 16, borderRadius: 14, borderWidth: 1 },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekRow: { flexDirection: 'row', marginBottom: 8 },
  weekDay: { flex: 1, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  booking: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    gap: 4,
  },
  spacer: { height: 20 },
  slots: { paddingHorizontal: 20, gap: 8 },
  slot: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotActions: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 16 },
});
