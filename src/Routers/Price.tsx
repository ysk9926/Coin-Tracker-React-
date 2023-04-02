import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { addEmitHelper } from "typescript";
import { fetchCoinPrice } from "../Api";

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IcoinId {
  coinId: string;
}

function Price({ coinId }: IcoinId) {
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
  );
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    if (priceData?.quotes.USD.ath_date) {
      const quotes = priceData?.quotes?.USD.ath_date;
      const date = new Date(quotes);
      const athDateString = date.toLocaleDateString("ko-KR");
      const athTimeString = date.toLocaleTimeString("ko-KR");
      setDate(athDateString);
      setTime(athTimeString);
    }
  }, [priceData]);

  return <div>Price</div>;
}

export default Price;
