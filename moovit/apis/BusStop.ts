import { ACCOUNT_KEY } from "@/constants/accountKey";

export const getAllBusStops = async () => {
  try {
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/BusStops`,
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

    throw new Error("Failed to fetch bus stops");
  } catch (error) {
    console.error(error);
  }
};