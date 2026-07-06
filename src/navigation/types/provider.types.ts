import type { NavigatorScreenParams } from '@react-navigation/native';

export type ProviderDashboardStackParamList = {
  DashboardMain: undefined;
  Earnings: undefined;
  Transactions: undefined;
  Notifications: undefined;
  HelpSupport: undefined;
  Settings: undefined;
  Documents: undefined;
  ProfileFlow: NavigatorScreenParams<ProviderProfileStackParamList> | undefined;
};

export type ProviderChatStackParamList = {
  ChatList: undefined;
  ChatConversation: { threadId: string };
};

export type ProviderJobsStackParamList = {
  JobRequests: undefined;
  ActiveJob: { jobId: string };
  ServiceStart: { jobId: string };
  CompleteService: { jobId: string };
};

export type ProviderCalendarStackParamList = {
  CalendarMain: undefined;
};

export type ProviderProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Documents: undefined;
  Reviews: undefined;
  ServiceManagement: undefined;
  AddService: { serviceId?: string } | undefined;
  Settings: undefined;
  HelpSupport: undefined;
};

export type ProviderTabParamList = {
  Dashboard: NavigatorScreenParams<ProviderDashboardStackParamList> | undefined;
  Jobs: NavigatorScreenParams<ProviderJobsStackParamList> | undefined;
  Calendar: NavigatorScreenParams<ProviderCalendarStackParamList> | undefined;
  Chat: NavigatorScreenParams<ProviderChatStackParamList> | undefined;
};
