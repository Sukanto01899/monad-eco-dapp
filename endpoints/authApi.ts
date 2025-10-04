import { authApi } from "./intance";

export const saveUserApi = async (
  address: `0x${string}`,
  delegation: object
) => {
  const res = await authApi.post("/auth", {
    smartAddress: address,
    signDelegation: delegation,
  });
  console.log(res);
  return res.data;
};

export const verifyImage = async (fromData: FormData) => {
  const res = await authApi.post("/verify", fromData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res);
  return res.data;
};

export const getUser = async () => {
  const res = await authApi.get("/auth");
  console.log(res);
  return res.data;
};

export const stakeApi = async (amount: string) => {
  const res = await authApi.post("/stake", { amount });
  console.log(res);
  return res.data;
};
export const unstakeApi = async (amount: string) => {
  const res = await authApi.post("/unstake", { amount });
  console.log(res);
  return res.data;
};
export const transferApi = async (
  recipientAddress: `0x${string}`,
  amount: string
) => {
  const res = await authApi.post("/transfer", { recipientAddress, amount });
  console.log(res);
  return res.data;
};
export const claimRewardsApi = async () => {
  const res = await authApi.post("/claim-rewards");
  console.log(res);
  return res.data;
};
