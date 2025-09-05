import { toast } from "react-toastify";

export async function fetchStockPrices(symbols: string[]): Promise<Record<string, number>> {
  console.log(" symbols", symbols);

  const prices: Record<string, number> = {};
  const API_KEY = "YOUR_API"; 

  for (const symbol of symbols) {
    try {
      console.log("symbol", symbol);

      const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`

        // `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );

      if (!response.ok) {
        toast.error("Some error occurred.");
        continue;
      }

      const data = await response.json();

      if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
        const price = parseFloat(data["Global Quote"]["05. price"]);
        prices[symbol] = price;
      } else if (data["Note"]) {
        console.warn(`API limit reached for ${symbol}:`, data["Note"]);
      } else if (data["Error Message"]) {
        toast.error(`Error for ${symbol}.`);
      } else {
        console.warn("Unexpected response:", data);
      }
    } catch (error) {
      toast.error("Internal Server error.");
    }
  }

  return prices;
}
