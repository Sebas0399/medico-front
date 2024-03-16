const API_URL = "http://localhost:8080";

export function getApiUrl(endpoint:string) {
    return `${API_URL}/${endpoint}`;
  }
  