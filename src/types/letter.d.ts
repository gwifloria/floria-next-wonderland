export type AttachmentType = {
  id?: string | null;
  name?: string | null;
  size?: number | null;
  url?: string | null;
  contentId?: string | null;
};
export type MailMessageCore = {
  threadId: string;
  from?: { name?: string | null; address: string } | null;
  to?: { name?: string | null; address: string }[];
  sentAt: string;
  subject?: string;
  html: string;
  attachments?: AttachmentType[];
  bodyPreview: string;
};

export type CommentCore = {
  threadId: string;
  author?: { id?: string; name?: string };
  content: string;
  createdAt: string;
};

export type ThreadCore = {
  id: string;
  subject: string;
  participants?: { name?: string | null; address: string }[];
  firstAt: string | null;
  updatedAt?: string | null;
  messageCount?: number;
};
export type WithDbId<T> = T & { _id: string }; // or Types.ObjectId
export type WithApiId<T> = T & { id: string };
export type MailMessageApi = WithApiId<MailMessageCore>;
export type CommentApi = WithApiId<CommentCore>;
export type ThreadApi = WithApiId<ThreadCore>;
