const tokens = [
  {
    name: "Eco Reward",
    logo: "/logo.png",
    code: "ECO",
    address: "0x2034458fdbf3f615e6b0cf209c26f708fb73a175",
    decimal: 18,
  },
  {
    name: "Tether USD",
    logo: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/images.png/public",
    code: "USDT",
    address: "0x88b8E2161DEDC77EF4ab7585569D2415a1C1055D",
    decimal: 6,
  },
  {
    name: "USD Coin",
    logo: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/usdc.png/public",
    code: "USDC",
    address: "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea",
    decimal: 6,
  },
];

export type Token = {
  name: string;
  logo: string;
  code: string;
  address: string;
  decimal: number;
};

export default tokens;
