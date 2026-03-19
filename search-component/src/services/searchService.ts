import { type SearchItemType } from "../types/searchTypes";

const mockData: SearchItemType = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pineapple",
  "Grapes",
];

export const searchService = async (
  query: string,
  signal: AbortSignal,
): Promise<SearchItemType> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const filtered = mockData.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
      resolve(filtered);
    }, 500);

    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
};
