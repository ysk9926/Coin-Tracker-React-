import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { addEmitHelper } from "typescript";
import { fetchCoinPrice } from "../Api";
const PriceContainer = styled.div`
  margin: 30px;
`;

const PriceHeaderBox = styled.div`
  border: 2px solid ${(props) => props.theme.subBgColor};
  padding: 20px;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 20px);
  grid-row-gap: 0px;
  grid-column-gap: 10px;
`;

const NowDateItem = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.titleClolr};
  font-weight: 600;
  font-size: 18px;
  div {
    font-size: 14px;
  }
`;

const NowDateItemSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.titleClolr};
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  font-size: 24px;
  font-weight: 600;
`;

const Change = styled.div`
  margin-top: 15px;
  display: grid;
  grid-gap: 20px;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr auto;
`;

const ChangeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${(props) => props.theme.subBgColor};
  padding: 20px 30px;
  border-radius: 10px;
  color: ${(props) => props.theme.titleClolr};
  label {
    font-weight: 600;
  }
`;

interface IItemstyleProps {
  percentage: number;
  className?: string;
}

function itemStyle({ percentage, className }: IItemstyleProps) {
  return (
    <div className={className}>
      <div>{percentage.toFixed(1)}%</div>
    </div>
  );
}

const ItemStyled = styled(itemStyle)<{ percentage: number }>`
  font-weight: 600;
  font-size: 24px;
  color: ${(props) =>
    props.percentage > 0
      ? props.theme.increaseColor
      : props.percentage === 0
      ? props.theme.flatColor
      : props.theme.decreaseColor};
`;

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
  const [oneH, setOneH] = useState<number>(1);
  const [oneD, setOneD] = useState<number>(1);
  const [teH, setTeH] = useState<number>(1);
  const [sevD, setSevD] = useState<number>(1);
  useEffect(() => {
    if (priceData?.quotes.USD.ath_date) {
      const quotes = priceData?.quotes?.USD;
      const oneHour = quotes.percent_change_1h;
      const oneDay = quotes.percent_change_24h;
      const teHours = quotes.percent_change_12h;
      const sevDay = quotes.percent_change_7d;
      const date = new Date(quotes.ath_date);
      const athDateString = date.toLocaleDateString("ko-KR");
      const athTimeString = date.toLocaleTimeString("ko-KR");
      setOneH(oneHour);
      setOneD(oneDay);
      setTeH(teHours);
      setSevD(sevD);
      setDate(athDateString);
      setTime(athTimeString);
    }
  }, [priceData]);
  console.log(oneH);

  return (
    <>
      <PriceContainer>
        <PriceHeaderBox>
          <NowDateItem>
            <div>{date}</div>
          </NowDateItem>
          <NowDateItem>HIGH</NowDateItem>
          <NowDateItemSpan>
            $ {priceData?.quotes.USD.ath_price.toFixed(2)}
          </NowDateItemSpan>
        </PriceHeaderBox>
        <Change>
          <ChangeItem>
            <label>1H</label>
            <ItemStyled percentage={oneH} />
          </ChangeItem>
          <ChangeItem>
            <label>12H</label>
            <ItemStyled percentage={oneD} />
          </ChangeItem>
          <ChangeItem>
            <label>1D</label>
            <ItemStyled percentage={teH} />
          </ChangeItem>
          <ChangeItem>
            <label>7D</label>
            <ItemStyled percentage={sevD} />
          </ChangeItem>
        </Change>
      </PriceContainer>
    </>
  );
}

export default Price;
