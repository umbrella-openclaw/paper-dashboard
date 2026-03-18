// API Client for Paper Dashboard

const API_BASE = '/api';

interface Paper {
  id: number;
  title: string;
  authors: string;
  abstract: string;
  journal: string;
  year: number;
  doi: string;
  file_path: string;
  file_name: string;
  file_size: number;
  folder_id: number | null;
  folder?: Folder;
  tags: Tag[];
  created_at: string;
}

interface Folder {
  id: number;
  name: string;
  parent_id: number | null;
}

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface Stats {
  total_papers: number;
  total_folders: number;
  total_tags: number;
  papers_this_week: number;
}

interface ListResponse<T> {
  papers?: T[];
  total: number;
  page: number;
  limit: number;
}

async function request<T>(
  method: string,
  path: string,
  body?: FormData | object
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {},
  };

  if (body instanceof FormData) {
    options.body = body;
  } else if (body) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Papers
  uploadPaper: (form: FormData) =>
    request<Paper>('POST', '/papers', form),
  listPapers: (params?: { page?: number; limit?: number; search?: string; folder_id?: number }) => {
    const search = new URLSearchParams();
    if (params?.page) search.set('page', String(params.page));
    if (params?.limit) search.set('limit', String(params.limit));
    if (params?.search) search.set('search', params.search);
    if (params?.folder_id) search.set('folder_id', String(params.folder_id));
    const qs = search.toString();
    return request<ListResponse<Paper>>('GET', `/papers${qs ? `?${qs}` : ''}`);
  },
  getPaper: (id: number) => request<Paper>('GET', `/papers/${id}`),
  updatePaper: (id: number, data: Partial<Paper>) =>
    request<Paper>('PUT', `/papers/${id}`, data),
  deletePaper: (id: number) =>
    request<{ message: string }>('DELETE', `/papers/${id}`),

  // Folders
  listFolders: () => request<Folder[]>('GET', '/folders'),
  createFolder: (name: string, parentId?: number) =>
    request<Folder>('POST', '/folders', { name, parent_id: parentId }),
  deleteFolder: (id: number) =>
    request<{ message: string }>('DELETE', `/folders/${id}`),

  // Tags
  listTags: () => request<Tag[]>('GET', '/tags'),
  createTag: (name: string, color?: string) =>
    request<Tag>('POST', '/tags', { name, color: color || '#10b981' }),
  deleteTag: (id: number) =>
    request<{ message: string }>('DELETE', `/tags/${id}`),

  // Stats
  getStats: () => request<Stats>('GET', '/stats'),
};

export type { Paper, Folder, Tag, Stats };
