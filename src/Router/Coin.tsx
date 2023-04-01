import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  padding: 0px 20px;
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
`;

const Load = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
`;

interface params {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<params>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});
  useEffect(() => {
    (async () => {
      const infoData = (
        await fetch("https://api.coinpaprika.com/v1/coins/btc-bitcoin")
      ).json;
      setInfo(infoData);
    })();
    (async () => {
      const priceData = (
        await fetch("https://api.coinpaprika.com/v1/tickers/btc-bitcoin")
      ).json();
      setPrice(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "loading..."}</Title>
      </Header>
      {loading ? <Load>Loading...</Load> : null}
    </Container>
  );
}

export default Coin;
