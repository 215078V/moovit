import { ACCOUNT_KEY } from "@/constants/accountKey";

export const getAllBusArrivals = async (bus_stop_code: string, service_number: string) => {
  try {
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${bus_stop_code}&ServiceNo=${service_number}`,
      {
        method: "GET",
        headers: {
          "AccountKey": ACCOUNT_KEY,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Arrival Data"+ data);
      return data.Services;
    }

    throw new Error("Failed to fetch bus arrivals");
  } catch (error) {
    console.error(error);
  }
};

export const getAllBusArrivalsByStop = async (bus_stop_code: string) => {
  try {
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${bus_stop_code}`,
      {
        method: "GET",
        headers: {
          "AccountKey": ACCOUNT_KEY,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Arrival Data"+ data);
      return data.Services;
    }

    throw new Error("Failed to fetch bus arrivals");
  } catch (error) {
    console.error(error);
  }
}
