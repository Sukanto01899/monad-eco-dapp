const tokens = [
  {
    name: "Eco Reward",
    logo: "https://miro.medium.com/0*aRHYdVg5kllfc7Gn.jpg",
    code: "ECO",
    address: "0x2034458fdbf3f615e6b0cf209c26f708fb73a175",
    decimal: 18,
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
