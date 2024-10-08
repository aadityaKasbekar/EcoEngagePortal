import { serverURL } from "./auth-service"

export const InitiativeService = {
  async getInitiatives() {
    try {
      const response = await fetch(`${serverURL}/initiatives`, {
        method: 'GET',
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching initiatives:", err);
      throw err;
    }
  }
};
