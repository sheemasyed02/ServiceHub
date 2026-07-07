import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import { ChatConversationLayout } from '@/components/chat/ChatConversationLayout';
import type { ProviderChatStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderChatStackParamList, 'ChatConversation'>;

export function ProviderChatConversationScreen({ route, navigation }: Props) {
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
      role="provider"
      onSetHeaderTitle={onSetHeaderTitle}
    />
  );
}
