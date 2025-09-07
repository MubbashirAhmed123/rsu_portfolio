import { toast } from "react-toastify";

const SAMPLE_PRICES: Record<string, number> = {
  "AAPL": 195.50,
  "GOOGL": 142.30,
  "AMZN": 155.75,
  "META": 485.20,
  "MSFT": 415.85,
  "TSLA": 248.60,
  "NVDA": 875.40,
  "APPLE": 195.50,
  "GOOGLE": 142.30,
  "AMAZON": 155.75,
  "TESLA": 248.60,
  "NVIDIA": 875.40
};

export async function fetchStockPrices(symbols: string[]): Promise<Record<string, number>> {
  console.log("symbols", symbols);
  const prices: Record<string, number> = {};
  const API_KEY = "YOUR API";
  
  for (const symbol of symbols) {
    try {
      console.log("Fetching data for symbol:", symbol);
      
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
      );

      if (!response.ok) {
        console.warn(`Network error for ${symbol}, using sample data`);
        if (SAMPLE_PRICES[symbol]) {
          prices[symbol] = SAMPLE_PRICES[symbol];
        } else {
          toast.error(`Some error occurred.`);
        }
        continue;
      }

      const data = await response.json();

      if (data["Time Series (5min)"]) {
        const timeSeries = data["Time Series (5min)"];
        const timestamps = Object.keys(timeSeries);
        
        if (timestamps.length > 0) {
          const latestTimestamp = timestamps[0];
          const latestData = timeSeries[latestTimestamp];
          
          if (latestData["4. close"]) {
            const price = parseFloat(latestData["4. close"]);
            prices[symbol] = price;
          } else {
            if (SAMPLE_PRICES[symbol]) {
              prices[symbol] = SAMPLE_PRICES[symbol];
            } else {
              toast.warn(`No closing price found for ${symbol}`);
            }
          }
        } else {
          if (SAMPLE_PRICES[symbol]) {
            prices[symbol] = SAMPLE_PRICES[symbol];
          } else {
            toast.warn(`No data available for ${symbol}`);
          }
        }
      }
      
      else if (data["Note"]) {
        if (SAMPLE_PRICES[symbol]) {
          prices[symbol] = SAMPLE_PRICES[symbol];
        } else {
          toast.warn(`API limit reached.try after some time.`);
        }
      }
      
      else if (data["Error Message"]) {
        if (SAMPLE_PRICES[symbol]) {
          prices[symbol] = SAMPLE_PRICES[symbol];
        } else {
          toast.error(`Some error occurred.`);
        }
      }
      
      else {
        if (SAMPLE_PRICES[symbol]) {
          prices[symbol] = SAMPLE_PRICES[symbol];
        } else {
          toast.warn(`Some error occurred.`);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error);
      if (SAMPLE_PRICES[symbol]) {
        prices[symbol] = SAMPLE_PRICES[symbol];
      } else {
        toast.error(`Failed to fetch data for ${symbol}`);
      }
    }
  }
  
  return prices;
}