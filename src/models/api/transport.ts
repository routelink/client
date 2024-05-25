export type TransportTypes = { ru: Record<number, string>; en: unknown };

export type GetItemsParams = {
  page?: number;
  count?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string | null;
};
