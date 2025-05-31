export interface CollectionInfo {
  name?: string;
  description?: string;
}

export interface Collection {
  id: string;
  salesChannelId?: string;
  info?: CollectionInfo;
} 