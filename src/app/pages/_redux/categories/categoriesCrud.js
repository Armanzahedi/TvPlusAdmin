import axios from "axios";

export const CATEGORIES_URL = "api/categories";

// CREATE =>  POST: add a new category to the server
export function createCategory(category) {
  return axios.post(CATEGORIES_URL, { category });
}

// READ
export function getAllCategories() {
  return axios.get(CATEGORIES_URL);
}

export function getCategoryById(categoryId) {
  return axios.get(`${CATEGORIES_URL}/${categoryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCategories(queryParams) {
  return axios.post(`${CATEGORIES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the category on the server
export function updateCategory(category) {
  return axios.put(`${CATEGORIES_URL}/${category.id}`, { category });
}

// UPDATE Status
export function updateStatusForCategories(ids, status) {
  return axios.post(`${CATEGORIES_URL}/updateStatusForCategories`, {
    ids,
    status
  });
}

// DELETE => delete the category from the server
export function deleteCategory(categoryId) {
  return axios.delete(`${CATEGORIES_URL}/${categoryId}`);
}

// DELETE Categories by ids
export function deleteCategories(ids) {
  return axios.post(`${CATEGORIES_URL}/deleteCategories`, { ids });
}
