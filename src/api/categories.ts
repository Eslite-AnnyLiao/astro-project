import axios from 'axios';
import type { AxiosResponse } from 'axios';

/**
 * 分類 API 回應介面
 */
export interface Category {
  id: number;
  key: string | null;
  color: string | null;
  taxonomy_id: number;
  depth: number;
  description: string;
  parent_id: number | null;
  path: string;
  is_brand: boolean;
  link: string | null;
  children?: Category[];
}

/**
 * API 回應結構
 */
export type CategoryResponse = Category[];

/**
 * API 路徑
 */

const API_PATH = `${import.meta.env.PUBLIC_API}${import.meta.env.PUBLIC_API_CATEGORIES}`;

/**
 * 取得分類資料
 * @param id 分類 ID
 * @returns Promise<AxiosResponse<CategoryResponse>>
 */
export default (): Promise<AxiosResponse<CategoryResponse>> =>
  axios.get(`${API_PATH}`, {
    timeout: 15 * 1000,
  });
