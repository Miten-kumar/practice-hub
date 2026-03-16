export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await requestFn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));

    return retryRequest(requestFn, retries - 1, delay * 2);
  }
}