export interface ISeoArticleDetail {
  id: number;
  name: string;
  url_path: string;

  desktop_cover_image_url: string;
  desktop_cover_image_preview_url: string;
  desktop_cover_image_thumbnail_url: string;

  mobile_cover_image_url: string;
  mobile_cover_image_preview_url: string;
  mobile_cover_image_thumbnail_url: string;

  cover_image_alt_text: string | null;
  content: string;
  support_articles: SupportArticleLink[];
  tags: string[];

  first_paragraph: string;
  content_paragraph: string;
  content_indexes: string[];
}

export interface SupportArticleLink {
  id: number;
  name: string;
  url_path: string;
}
