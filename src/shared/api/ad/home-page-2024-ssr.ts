/**
 * 首頁廣告 API 服務（供 Astro SSR/SSG 使用）
 */
import axios from 'axios';

// Header Desktop 需要: B001, B003, B004, B005, B006
// Header Mobile 需要: B007, B002, A001
const HEADER_SLOT_TYPES = ['B001', 'B002', 'B003', 'B004', 'B005', 'B006', 'B007', 'A001'];

/**
 * 取得 Header 所需的廣告資料
 */
export async function fetchHeaderAdData(): Promise<Record<string, any> | null> {
  const API_BASE = import.meta.env.PUBLIC_GO_API;
  const API_PATH = import.meta.env.PUBLIC_API_2024_AD;
  const adTypes = HEADER_SLOT_TYPES.map((t) => `slot_type=${t}`).join('&');

  try {
    const response = await axios.get(`${API_BASE}${API_PATH}?${adTypes}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch header ad data:', error);
    return null;
  }
}

/**
 * 取得指定 slot types 的廣告資料
 */
export async function fetchAdData(slotTypes: string[]): Promise<Record<string, any> | null> {
  const API_BASE = import.meta.env.PUBLIC_GO_API;
  const API_PATH = import.meta.env.PUBLIC_API_2024_AD;
  const adTypes = slotTypes.map((t) => `slot_type=${t}`).join('&');

  try {
    const response = await axios.get(`${API_BASE}${API_PATH}?${adTypes}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ad data:', error);
    return null;
  }
}
