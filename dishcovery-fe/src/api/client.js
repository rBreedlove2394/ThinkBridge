// src/api/client.js
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const STORAGE_KEY = 'dishcovery_auth';
const USE_CREDENTIALS =
  (import.meta.env.VITE_API_USE_CREDENTIALS || '').toLowerCase() === 'true';

function getStoredToken() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    const error = new Error(`API error: ${response.status}`);
    error.status = response.status;
    error.body = errorBody;
    throw error;
  }

  // Return JSON or empty object if no body
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export async function apiClient(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const hasJsonBody =
    options.body && !(options.body instanceof FormData);

  const authToken = options.token || getStoredToken();

  const defaultHeaders = {
    ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
  };

  const config = {
    method: 'GET',
    credentials: USE_CREDENTIALS ? 'include' : 'same-origin',
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };

  return handleResponse(await fetch(url, config));
}
