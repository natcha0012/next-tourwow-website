/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PageData {
  url_path: string;
  redirect_to_url_path: string | null;
  page_type_slug: string;
  page_argument: any;
  lastmod: string;
  priority: string;
  meta_title: string;
  meta_description: string;
}
