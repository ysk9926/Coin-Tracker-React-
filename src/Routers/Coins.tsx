import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoin } from "../Api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: 600;
  color: ${(props) => props.theme.titleClolr};
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
  div {
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.btnColor};
  }
  div:hover {
    color: ${(props) => props.theme.btnHoverColor};
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
  const btnDark = useRecoilState<boolean>(isDarkAtom);
  const isDark = useSetRecoilState(isDarkAtom);
  const isDarkMode = () => {
    isDark((prev) => !prev);
  };
  console.log(btnDark);

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
        <div></div>
        <Title>
          <h2>COINS</h2>
        </Title>
        <Btn onClick={isDarkMode}>
          {btnDark[0] ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
              </svg>
            </div>
          )}
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
