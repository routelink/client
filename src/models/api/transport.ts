export type TransportTypes = { id: number; name: string }[];

export type GetItemsParams = {
  page?: number;
  count?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string | null;
};
