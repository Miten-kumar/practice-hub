import axios from "axios";

export async function fetchWithRetry<T>(
  url: string,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    console.log(`Retrying... attempts left: ${retries}`);

    await new Promise((resolve) => setTimeout(resolve, delay));

    return fetchWithRetry<T>(url, retries - 1, delay * 2); // exponential backoff
  }
}
