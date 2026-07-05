import { StyleSheet, View } from 'react-native';

import { Shimmer } from './Shimmer';

export function SkeletonCard() {
  return (
    <View style={styles.card}>
      <Shimmer height={20} width="60%" />
      <Shimmer height={32} width="40%" style={{ marginTop: 12 }} />
      <Shimmer height={12} width="80%" style={{ marginTop: 8 }} />
    </View>
  );
}

export function SkeletonList({ count = 4 }: { count?: number }) {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.listItem}>
          <Shimmer width={48} height={48} borderRadius={24} />
          <View style={styles.listBody}>
            <Shimmer height={14} width="70%" />
            <Shimmer height={12} width="50%" style={{ marginTop: 8 }} />
            <Shimmer height={12} width="40%" style={{ marginTop: 6 }} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function SkeletonDashboard() {
  return (
    <View style={styles.dashboard}>
      <View style={styles.headerRow}>
        <Shimmer width={52} height={52} borderRadius={26} />
        <View style={{ flex: 1, gap: 8 }}>
          <Shimmer height={14} width="50%" />
          <Shimmer height={20} width="70%" />
        </View>
      </View>
      <View style={styles.statsGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={styles.stat}>
            <Shimmer height={12} width="60%" />
            <Shimmer height={24} width="50%" style={{ marginTop: 8 }} />
          </View>
        ))}
      </View>
      <Shimmer height={18} width="40%" style={{ marginTop: 24 }} />
      <SkeletonList count={2} />
    </View>
  );
}

export function SkeletonProfile() {
  return (
    <View style={styles.profile}>
      <Shimmer width={88} height={88} borderRadius={44} style={{ alignSelf: 'center' }} />
      <Shimmer height={22} width="50%" style={{ alignSelf: 'center', marginTop: 16 }} />
      <Shimmer height={14} width="35%" style={{ alignSelf: 'center', marginTop: 8 }} />
      <View style={{ marginTop: 24, gap: 12 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Shimmer key={i} height={48} borderRadius={12} />
        ))}
      </View>
    </View>
  );
}

export function SkeletonCalendar() {
  return (
    <View style={styles.calendar}>
      <Shimmer height={24} width="50%" style={{ alignSelf: 'center' }} />
      <View style={styles.calendarGrid}>
        {Array.from({ length: 35 }).map((_, i) => (
          <Shimmer key={i} width={40} height={40} borderRadius={20} />
        ))}
      </View>
      <Shimmer height={18} width="45%" style={{ marginTop: 20 }} />
      <SkeletonList count={2} />
    </View>
  );
}

export function SkeletonReviews() {
  return (
    <View style={styles.reviews}>
      <Shimmer height={80} borderRadius={12} />
      <View style={{ marginTop: 16, gap: 12 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={styles.reviewItem}>
            <Shimmer width={40} height={40} borderRadius={20} />
            <View style={{ flex: 1, gap: 8 }}>
              <Shimmer height={14} width="40%" />
              <Shimmer height={12} width="100%" />
              <Shimmer height={12} width="80%" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  list: { gap: 12, paddingHorizontal: 20 },
  listItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  listBody: { flex: 1 },
  dashboard: { padding: 20, gap: 12 },
  headerRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  stat: {
    width: '47%',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  profile: { padding: 20 },
  calendar: { padding: 20 },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 16,
  },
  reviews: { padding: 20 },
  reviewItem: { flexDirection: 'row', gap: 12 },
});
