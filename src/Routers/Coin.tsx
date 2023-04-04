import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../Api";

const Container = styled.div`
  height: 100vh;
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${(props) => props.theme.titleClolr};
`;

const Load = styled.div`
  display: flex;
  color: ${(props) => props.theme.accentColor};
  align-items: center;
  justify-content: center;
  font-size: 2em;
`;

const Overview = styled.div`
  display: flex;
  padding: 20px 50px;
  border-radius: 10px;
  justify-content: space-between;
  border: 2px solid ${(props) => props.theme.subBgColor};
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.titleClolr};

  span:nth-child(2) {
    padding-top: 8px;
    font-size: 28px;
    font-weight: 600;
  }
`;

const Description = styled.p`
  margin: 30px 10px;
  text-align: center;
  line-height: 22px;
  color: ${(props) => props.theme.titleClolr};
`;

const Tags = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const Tag = styled.div<{ isActive: boolean }>`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
  position: relative;
  &::after {
    content: "";
    height: 2px;
    bottom: 0px;
    width: 15px;
    position: absolute;
    background-color: ${(props) =>
      props.isActive ? props.theme.subBgColor : "gray"};
  }
  a {
    display: block;
    padding: 15px 80px;
  }
  color: ${(props) => (props.isActive ? props.theme.subBgColor : "gray")};
`;

const Back = styled.div`
  color: ${(props) => props.theme.titleClolr};
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: 600;
  a:hover {
    color: ${(props) => props.theme.subBgColor};
  }
`;

interface params {
  coinId: string;
}

interface RouteState {
  name: string;
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

function Coin() {
  const { coinId } = useParams<params>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
  );
  const loading = infoLoading || priceLoading;
  console.log(priceData);
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [price, setPrice] = useState<IPriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //   })();
  //   (async () => {
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setPrice(priceData);
  //   })();
  //   setLoading(false);
  // }, [coinId]);
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Load>Loading...</Load>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>티커</span>
              <span>{infoData?.symbol} </span>
            </OverviewItem>
            <OverviewItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>현재가</span>
              <span>${priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>
            {infoData?.description
              ? infoData.description
              : "Nothing is here..."}
          </Description>
          <Overview>
            <OverviewItem>
              <span>총량</span>
              <span> {priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 판매량</span>
              <span> {priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
      <Tags>
        <Tag isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </Tag>
        <Tag isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </Tag>
      </Tags>
      <Switch>
        <Route path={`/:coinId/price`}>
          <Price coinId={coinId} />
        </Route>
        <Route path={`/:coinId/Chart`}>
          <Chart coinId={coinId} />
        </Route>
      </Switch>
      <Back>
        <Link to={`/`}> &larr; </Link>
      </Back>
    </Container>
  );
}

export default Coin;
