import { useQuery } from "react-query";
import { fetchCoinPriceHistory } from "../Api";
import ApexChart from "react-apexcharts";

interface IcoinId {
  coinId: string;
}

interface Idata {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: IcoinId) {
  const { isLoading, data } = useQuery<Idata[]>(["history", coinId], () =>
    fetchCoinPriceHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close],
                  };
                }),
              },
            ] as any
          }
          width="100%"
          height="160px"
          options={{
            noData: {
              text: "",
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
              },
            },
            fill: {
              opacity: 50,
            },

            chart: {
              toolbar: {
                show: false,
              },
              background: "transparent",
              fontFamily: '"Pretendard", sans-serif',
              width: 500,
              height: 300,
            },
            grid: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            xaxis: {
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000),
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            stroke: {
              width: 2,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

//              data: data?.map((price) => Number(price.close)) as number[],
