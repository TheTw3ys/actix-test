import { LogState, AllLogStates } from "./lib/types";

type TInfo = {
  description: string;
};

class APIClient {
  constructor() {}

  async getInfo(): Promise<TInfo> {
    return fetch("/api/v1/info").then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
  async getState(): Promise<AllLogStates> {
    return fetch(`/api/v1/logs`).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}
export const apiClient = new APIClient();
