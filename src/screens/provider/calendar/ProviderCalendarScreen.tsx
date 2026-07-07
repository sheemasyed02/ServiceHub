import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InsetGroup, SectionHeader } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { MOCK_TIME_SLOTS } from '@/constants/provider';
import { useAppTheme, useProviderBookings } from '@/hooks';
import type { ProviderCalendarStackParamList } from '@/navigation/types/provider.types';
import type { Booking } from '@/types/customer';
import { bookingDateKey } from '@/utils/bookingHelpers';

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

function dateKeyFromParts(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function ProviderCalendarScreen(_props: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const insets = useSafeAreaInsets();
  const today = new Date();
  const bookings = useProviderBookings();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [slots, setSlots] = useState(MOCK_TIME_SLOTS);

  const bookingDates = useMemo(() => {
    const map = new Map<string, Booking[]>();
    bookings
      .filter((b) => b.providerStatus !== 'rejected' && b.status !== 'cancelled')
      .forEach((booking) => {
        const key = bookingDateKey(booking);
        if (!key) return;
        const existing = map.get(key) ?? [];
        existing.push(booking);
        map.set(key, existing);
      });
    return map;
  }, [bookings]);

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);
    return cells;
  }, [month, year]);

  const selectedKey = dateKeyFromParts(year, month, selectedDay);
  const dayBookings = bookingDates.get(selectedKey) ?? [];

  const shiftMonth = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setMonth(d.getMonth());
    setYear(d.getFullYear());
    setSelectedDay(1);
  };

  return (
    <ProviderScreen edges={[]} bottomPadding={120}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Calendar
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {bookings.length} total bookings on your schedule
        </Text>
      </View>

      <InsetGroup style={styles.calendarGroup}>
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
            const key = dateKeyFromParts(year, month, day);
            const hasBooking = bookingDates.has(key);
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
                  isToday && !selected && { borderWidth: 1, borderColor: colors.primary },
                ]}
              >
                <Text
                  variant="labelMedium"
                  style={{
                    color: selected ? colors.onPrimary : colors.textPrimary,
                    fontWeight: isToday ? '700' : '400',
                  }}
                >
                  {day}
                </Text>
                {hasBooking && !selected ? (
                  <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </InsetGroup>

      <SectionHeader title={`Bookings · ${selectedDay} ${MONTHS[month].slice(0, 3)}`} />
      {dayBookings.length === 0 ? (
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, paddingHorizontal: 20 }}>
          No bookings on this date
        </Text>
      ) : (
        <InsetGroup>
          {dayBookings.map((booking, index) => (
            <View
              key={booking.id}
              style={[
                styles.bookingRow,
                index < dayBookings.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.divider,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyLarge" style={{ color: colors.textPrimary, fontWeight: '600' }}>
                  {booking.service}
                </Text>
                <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 2 }}>
                  {booking.customerName} · {booking.time}
                </Text>
              </View>
              <Text variant="labelLarge" style={{ color: colors.textPrimary, fontWeight: '700' }}>
                ₹{booking.price}
              </Text>
            </View>
          ))}
        </InsetGroup>
      )}

      <SectionHeader title="Available time slots" />
      <InsetGroup>
        {slots.map((slot, index) => (
          <Pressable
            key={slot.id}
            onPress={() =>
              setSlots((prev) =>
                prev.map((s) => (s.id === slot.id ? { ...s, available: !s.available } : s)),
              )
            }
            style={[
              styles.slotRow,
              index < slots.length - 1 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.divider,
              },
            ]}
          >
            <Text variant="bodyMedium" style={{ color: colors.textPrimary, flex: 1 }}>
              {slot.label}
            </Text>
            <View
              style={[
                styles.slotBadge,
                {
                  backgroundColor: slot.available ? colors.successContainer : colors.surfaceVariant,
                },
              ]}
            >
              <Text
                variant="labelSmall"
                style={{ color: slot.available ? colors.success : colors.textTertiary }}
              >
                {slot.available ? 'Available' : 'Blocked'}
              </Text>
            </View>
          </Pressable>
        ))}
      </InsetGroup>

      <View style={{ height: 24 }} />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, marginBottom: 16 },
  calendarGroup: { padding: 16 },
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
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 2,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  slotBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
