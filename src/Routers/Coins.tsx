import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoin } from "../Api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
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
const CoinList = styled.ul``;

const Coin = styled.li`
  font-size: 16px;
  font-weight: 600;
  background-color: ${(props) => props.theme.subBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
  border-radius: 15px;
  a {
    padding: 20px;
    display: block;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Load = styled.div`
  display: flex;
  color: ${(props) => props.theme.accentColor};
  align-items: center;
  justify-content: center;
  font-size: 2em;
`;

const Btn = styled.button`
  background: none;
  div {
    position: relative;
    width: 70px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    letter-spacing: 0.5px;
    border-top: 0.5px solid rgba(255, 255, 255, 0.35);
    border-left: 0.5px solid rgba(255, 255, 255, 0.35);
    padding-left: 20px;
    transition: 0.5s ease-in-out;
  }
  div:hover {
    padding-left: 0px;
    padding-right: 20px;
    color: rgba(255, 255, 255, 1);
    span {
      left: calc(100% - 25px);
      background-color: black;
    }
  }
  span {
    position: absolute;
    left: 5px;
    width: 20px;
    height: 20px;
    background-color: whitesmoke;
    border-radius: 50%;
    transition: 0.5s ease-in-out;
  }
`;

interface coins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<coins[]>(["AllCoin"], fetchCoin);
  const isDark = useSetRecoilState(isDarkAtom);
  const isDarkMode = () => {
    isDark((prev) => !prev);
  };

  // const [coins, setCoins] = useState<coins[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Header>
        <Title>COINS</Title>
        <Btn onClick={isDarkMode}>
          <div>
            <span></span>
          </div>
        </Btn>
      </Header>
      {isLoading ? (
        <Load>Loading...</Load>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
