import { authApi } from "./intance";

export const saveUserApi = async (address: string) => {
  console.log(address);
  const res = await authApi.post("/auth", {
    smartAddress: address,
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

export const updateUser = async () => {};
