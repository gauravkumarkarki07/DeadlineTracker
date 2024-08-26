const BASE_URL = import.meta.env.VITE_DEADLINE_TRACKER_BASE_URL;

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export class ApiManager {
  static async apiRequest<T>(method: string, url: string, body?: T) {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method,
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw await response.json();
      }
      return response.json();
  }

  static get(url: string) {
    return this.apiRequest("GET", url);
  }

  static post<T>(url: string, data: T) {
    return this.apiRequest("POST", url, data);
  }

  static put<T>(url: string, data: T) {
    return this.apiRequest("PUT", url, data);
  }

  static delete(url: string) {
    return this.apiRequest("DELETE", url);
  }
}
