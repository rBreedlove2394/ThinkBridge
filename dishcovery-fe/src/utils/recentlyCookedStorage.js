// src/utils/recentlyCookedStorage.js
const STORAGE_KEY = 'dishcovery_recently_cooked';
const MAX_ITEMS = 20;

const normalizeEmail = (email) => (email || '').trim().toLowerCase();

const readAll = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeAll = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getRecentlyCookedForUser = (email) => {
  const key = normalizeEmail(email);
  if (!key) return [];
  const all = readAll();
  return all[key] || [];
};

export const addRecentlyCooked = (email, recipe) => {
  const key = normalizeEmail(email);
  if (!key || !recipe?.id) return [];

  const all = readAll();
  const list = all[key] || [];

  const lite = {
    id: String(recipe.id),
    title: recipe.title || 'Recipe',
    imageUrl: recipe.imageUrl || recipe.image || '',
    calories: recipe.calories ?? null,
    cookedAt: Date.now(),
  };

  const filtered = list.filter((r) => String(r.id) !== String(recipe.id));
  filtered.unshift(lite);

  const trimmed = filtered.slice(0, MAX_ITEMS);
  all[key] = trimmed;
  writeAll(all);
  return trimmed;
};
