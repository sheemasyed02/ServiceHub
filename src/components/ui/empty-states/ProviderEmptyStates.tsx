import { EmptyState, type EmptyStateProps } from '../EmptyState';

type PresetProps = Omit<EmptyStateProps, 'icon' | 'title' | 'description'> & {
  onAction?: () => void;
};

export function NoJobsEmptyState(props: PresetProps) {
  return (
    <EmptyState
      icon="briefcase-off-outline"
      title="No job requests"
      description="New booking requests will appear here when customers book your services."
      actionLabel="Go online"
      {...props}
    />
  );
}

export function NoEarningsEmptyState(props: PresetProps) {
  return (
    <EmptyState
      icon="cash-multiple"
      title="No earnings yet"
      description="Complete jobs to start earning. Your transactions will show up here."
      actionLabel="View jobs"
      {...props}
    />
  );
}

export function NoNotificationsEmptyState(props: PresetProps) {
  return (
    <EmptyState
      icon="bell-off-outline"
      title="All caught up"
      description="You have no new notifications. We'll alert you about bookings and payments."
      {...props}
    />
  );
}

export function NoReviewsEmptyState(props: PresetProps) {
  return (
    <EmptyState
      icon="star-off-outline"
      title="No reviews yet"
      description="Great work earns great reviews. Complete jobs to receive customer feedback."
      {...props}
    />
  );
}

export function NoServicesEmptyState(props: PresetProps) {
  return (
    <EmptyState
      icon="toolbox-outline"
      title="No services listed"
      description="Add the services you offer so customers can find and book you."
      actionLabel="Add service"
      {...props}
    />
  );
}

export function NoDocumentsEmptyState(props: PresetProps) {
  return (
    <EmptyState
      icon="file-document-outline"
      title="No documents uploaded"
      description="Upload your verification documents to get verified and start accepting jobs."
      actionLabel="Upload document"
      {...props}
    />
  );
}
