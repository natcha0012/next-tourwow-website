export interface BlogListResponse {
  page: number;
  page_entries: number;
  result: BlogItem[];
  total: number;
}

export interface BlogItem {
  id: number;
  content: string;
  cover_image_alt_text: string;
  desktop_cover_image_thumbnail_url: string;
  desktop_cover_image_url: string;
  mobile_cover_image_thumbnail_url: string;
  mobile_cover_image_url: string;
  name: string;
  updated_at: string;
  url_path: string;
}
