import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { DocumentCard, ProviderScreen } from '@/components/provider';
import { NoDocumentsEmptyState } from '@/components/ui/empty-states';
import { MOCK_DOCUMENTS } from '@/constants/provider';

type Props = NativeStackScreenProps<{ Documents: undefined }, 'Documents'>;

export function ProviderDocumentsScreen(_props: Props) {
  if (MOCK_DOCUMENTS.length === 0) {
    return (
      <ProviderScreen scroll={false}>
        <NoDocumentsEmptyState style={{ flex: 1 }} />
      </ProviderScreen>
    );
  }

  return (
    <ProviderScreen bottomPadding={40}>
      {MOCK_DOCUMENTS.map((doc) => (
        <View key={doc.id} style={{ marginBottom: 10 }}>
          <DocumentCard
            title={doc.title}
            status={doc.status}
            uploadedAt={doc.uploadedAt}
            onUpload={() => {}}
            onReplace={() => {}}
            onPreview={() => {}}
          />
        </View>
      ))}
    </ProviderScreen>
  );
}
