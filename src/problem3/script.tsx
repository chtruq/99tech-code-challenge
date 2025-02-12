// Types
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Constants (moved outside component)
const BLOCKCHAIN_PRIORITIES: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

const getPriority = (blockchain: Blockchain): number =>
  BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedAndFormattedBalances = useMemo(() => {
    return balances
      .filter((balance) => balance.amount > 0)
      .sort((lhs, rhs) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      })
      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]); // removed prices from dependencies

  const rows = useMemo(() => {
    return sortedAndFormattedBalances.map((balance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.blockchain}-${balance.currency}`} // better unique key
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [sortedAndFormattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};
