import { authApi } from "./intance";

export const saveUserApi = async (
  address: `0x${string}`,
  delegation: object
) => {
  const res = await authApi.post("/auth", {
    smartAddress: address,
    signDelegation: delegation,
  });
  return res.data;
};

export const verifyImage = async (fromData: FormData) => {
  const res = await authApi.post("/verify", fromData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getUser = async () => {
  const res = await authApi.get("/auth");
  return res.data;
};

export const stakeApi = async (amount: string) => {
  const res = await authApi.post("/stake", { amount });
  return res.data;
};
export const unstakeApi = async (amount: string) => {
  const res = await authApi.post("/unstake", { amount });
  return res.data;
};
export const transferApi = async (
  recipientAddress: `0x${string}`,
  amount: string
) => {
  const res = await authApi.post("/transfer", { recipientAddress, amount });
  return res.data;
};
export const claimRewardsApi = async () => {
  const res = await authApi.post("/claim-rewards");
  return res.data;
};
export const claimDailyApi = async () => {
  const res = await authApi.post("/claim-daily");
  console.log(res);
  return res.data;
};
