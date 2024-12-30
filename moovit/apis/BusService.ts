import { ACCOUNT_KEY } from "@/constants/accountKey";

export const getAllBusServices = async () => {
  try {
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/BusServices`,
      {
        method: "GET",
        headers: {
          AccountKey: ACCOUNT_KEY,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.value;
    }

    throw new Error("Failed to fetch bus services");
  } catch (error) {
    console.error(error);
  }
};