import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import type { MessageStatus } from '@/types/chat';

type MessageTicksProps = {
  status?: MessageStatus;
  /** Tick color on light bubble (outgoing on primary uses onPrimaryTint). */
  color: string;
  readColor?: string;
};

export function MessageTicks({ status = 'sent', color, readColor = '#A8D8FF' }: MessageTicksProps) {
  if (status === 'sent') {
    return <MaterialCommunityIcons name="check" size={14} color={color} />;
  }

  const tint = status === 'read' ? readColor : color;

  return (
    <View style={styles.row}>
      <MaterialCommunityIcons name="check-all" size={14} color={tint} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
