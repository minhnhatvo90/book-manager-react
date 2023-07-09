export interface ResType {
  data: {
    meta: Meta;
    documents: BookInfo[];
  };
}
export interface BookInfo {
  accessInfo: object;
  etag: string;
  id: string;
  kind: string;
  saleInfo: object;
  searchInfo: object;
  selfLink: string;
  volumeInfo: object;
}

export interface BookState {
  [isbn: number]: BookInfo;
}

interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}
