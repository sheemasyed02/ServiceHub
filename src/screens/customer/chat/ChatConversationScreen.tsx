import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import { ChatConversationLayout } from '@/components/chat/ChatConversationLayout';
import type { ChatStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatConversation'>;

export function ChatConversationScreen({ route, navigation }: Props) {
  const { threadId } = route.params;

  const onSetHeaderTitle = useCallback(
    (title: string) => {
      navigation.setOptions({ title });
    },
    [navigation],
  );

  return (
    <ChatConversationLayout
      threadId={threadId}
      role="customer"
      onSetHeaderTitle={onSetHeaderTitle}
    />
  );
}
