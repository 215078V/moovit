//https://icons.expo.fyi/Index
import React from "react";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import StopCard from "./StopCard";
import { useFonts } from "expo-font";
import { BusStop } from "@/types/BusStop";
import { getAllBusStops } from "@/apis/BusStop";
import { getAllBusServices } from "@/apis/BusService";
import { BusService } from "@/types/BusService";
import { BusCountdownProvider } from "@/context/BusSelectContext";
import { useBusCountdownContext } from "@/context/BusSelectContext";

const busImages = {
  EXPRESS:
    "https://gst-contracts.s3.ap-southeast-1.amazonaws.com/uploads/bcc/cms/asset/avatar/324800/banner6.jpg",
  TRUNK:
    "https://static.vecteezy.com/system/resources/thumbnails/029/315/458/small_2x/moving-forward-bus-travels-on-road-embracing-travel-time-ambiance-ai-generated-photo.jpg",
  FEEDER:
    "https://static.vecteezy.com/system/resources/thumbnails/037/470/116/small_2x/ai-generated-touristic-coach-bus-on-highway-road-intercity-regional-domestic-transportation-driving-urban-modern-tour-traveling-travel-journey-ride-moving-transport-concept-public-comfortable-photo.jpg",
  INDUSTRIAL: "https://www.gobuses.com/images/home/mobile-banner.jpg",
  TOWNLINK:
    "https://img.freepik.com/premium-photo/yellow-bus-with-word-bus-front_206846-3540.jpg",
  "2 TIER FLAT FEE":
    "https://img.freepik.com/premium-photo/yellow-bus-with-license-plate-number-bus-front_7023-371319.jpg",
  "FLAT FEE $1.10":
    "https://buscdn.cardekho.com/in/ashok-leyland/viking-cng-city-bus/ashok-leyland-viking-cng-city-bus.jpg",
};

type BusCardProps = {
  bus_img: string;
  arrival_time: string;
  service_no: string;
  category: string;
  operator: string;
  from: string;
  to: string;
  load: string;
};

export default function BusCard({
  bus_img,
  arrival_time,
  service_no,
  category,
  operator,
  from,
  to,
  load,
}: BusCardProps) {
  const { busCountdown, setBusCountdown } = useBusCountdownContext();
  const [busStops, setBusStops] = React.useState<BusStop[]>([]);
  const [busServices, setBusServices] = React.useState<BusService[]>([]);
  const [pressed, setPressed] = React.useState(false);
  const formattedArrivalTime = new Date(arrival_time).toLocaleTimeString();

  const [fontsLoaded] = useFonts({
    PressStart2P: require("../assets/fonts/digital-7.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  React.useEffect(() => {
    getAllBusStops().then((stops) => {
      setBusStops(stops);
    });

    getAllBusServices().then((services) => {
      setBusServices(services);
    });
  }, []);

  const handleSelect = () => {
    setBusCountdown(busCountdown + 1);
    setPressed(true);
  };

  const getBusStopDescription = (busStopCode: string) => {
    const busStop = busStops.find((stop) => stop.BusStopCode === busStopCode);
    if (!busStop) return "Not Specified";
    return busStop?.Description;
  };

  const getBusCategory = (serviceNo: string): string => {
    const busService = busServices.find(
      (service) => service.ServiceNo === serviceNo
    );
    if (!busService) return "Not Specified";
    return busService?.Category;
  };

  const busImageByCategory = (category: string) => {
    switch (category) {
      case "EXPRESS":
        return busImages["EXPRESS"];
      case "TRUNK":
        return busImages["TRUNK"];
      case "FEEDER":
        return busImages["FEEDER"];
      case "INDUSTRIAL":
        return busImages["INDUSTRIAL"];
      case "TOWNLINK":
        return busImages["TOWNLINK"];
      case "2 TIER FLAT FEE":
        return busImages["2 TIER FLAT FEE"];
      case "FLAT FEE $1.10":
        return busImages["FLAT FEE $1.10"];
      default:
        return "https://gst-contracts.s3.ap-southeast-1.amazonaws.com/uploads/bcc/cms/asset/avatar/324800/banner6.jpg";
    }
  };

  const loadColorSelectorForSeat = (load: string) => {
    switch (load) {
      case "SEA":
        return "green";
      case "SDA":
        return "red";
      case "LSD":
        return "red";
      default:
        return "black";
    }
  };

  const loadColorSelectorForMan = (load: string) => {
    switch (load) {
      case "SEA":
        return "black";
      case "SDA":
        return "green";
      case "LSD":
        return "red";
      default:
        return "black";
    }
  };

  const loadTextSelector = (load: string) => {
    switch (load) {
      case "SEA":
        return "Seats Available";
      case "SDA":
        return "Standing Available";
      case "LSD":
        return "Limited Standing";
      default:
        return "Not Specified";
    }
  };

  const loadBGColorSelector = (load: string) => {
    switch (load) {
      case "SEA":
        return "rgba(182, 245, 176, 0.5)";
      case "SDA":
        return "rgba(251, 251, 100, 0.5)";
      case "LSD":
        return "rgba(245, 176, 176, 0.5)";
      default:
        return "rgba(176, 236, 245, 0.5)";
    }
  };

  const loadTextColorSelector = (load: string) => {
    switch (load) {
      case "SEA":
        return "#19800f";
      case "SDA":
        return "#fbbc07";
      case "LSD":
        return "#f51818";
      default:
        return "#0572f7";
    }
  };

  return (
    <Card className="p-5 rounded-lg max-w-[360px] m-3">
      <Image
        source={{
          uri: busImageByCategory(getBusCategory(service_no)),
        }}
        className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
        alt="image"
      />
      <HStack
        space="md"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          marginRight: 3,
          marginLeft: 3,
        }}
      >
        <Box
          style={{ width: "50%", display: "flex", justifyContent: "center" }}
        >
          <Box
            style={{
              backgroundColor: "#000",
              padding: 8,
              display: "flex",
              alignItems: "center",
              borderRadius: 5,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "PressStart2P",
                fontSize: 24,
                color: "#028afa",
              }}
            >
              ETA -- {formattedArrivalTime}
            </Text>
          </Box>
        </Box>
        <Box style={{ width: "50%", display: "flex", alignItems: "flex-end" }}>
          <HStack
            space="md"
            reversed={false}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <MaterialIcons
              name="airline-seat-recline-normal"
              size={24}
              color={loadColorSelectorForSeat(load)}
            />
            <Ionicons
              name="man"
              size={24}
              color={loadColorSelectorForMan(load)}
            />
          </HStack>
        </Box>
      </HStack>

      <HStack
        space="sm"
        className="mb-6 mt-6"
        style={{
          marginRight: 3,
          marginLeft: 3,
          justifyContent: "space-between",
          overflow: "scroll"
        }}
      >
        <Box
          style={{
            backgroundColor: "rgba(182, 245, 176, 0.5)",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text
            className="text-sm font-normal text-typography-700"
            style={{ color: "#19800f" }}
          >
            Service #{service_no}
          </Text>
        </Box>

        <Box
          style={{
            backgroundColor: "rgba(240, 189, 242, 0.5)",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text
            className="text-sm font-normal text-typography-700"
            style={{ color: "#ec05f5" }}
          >
            #{getBusCategory(service_no)}
          </Text>
        </Box>

        <Box
          style={{
            backgroundColor: "rgba(184, 235, 245, 0.5)",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text
            className="text-sm font-normal text-typography-700"
            style={{ color: "#0572f7" }}
          >
            #{operator}
          </Text>
        </Box>

        <Box
          style={{
            backgroundColor: `${loadBGColorSelector(load)}`,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text
            className="text-sm font-normal text-typography-700"
            style={{ color: `${loadTextColorSelector}` }}
          >
            ⓘ {loadTextSelector(load)}
          </Text>
        </Box>
      </HStack>

      <HStack space="md" className="mb-6">
        <Box style={{ width: "50%" }}>
          <StopCard
            name={getBusStopDescription(from)}
            fromto="From"
            colorbox="#4a6d99"
          />
        </Box>
        <Box style={{ width: "50%" }}>
          <StopCard
            name={getBusStopDescription(to)}
            fromto="To"
            colorbox="#94333f"
          />
        </Box>
      </HStack>
      <Box className="flex-col sm:flex-row">
        <Button
          variant="outline"
          className="px-4 py-2 border-outline-300 sm:flex-1"
          disabled={pressed}
          onPress={handleSelect}
        >
          <ButtonText size="sm" className="text-typography-600">
            {pressed ? "Added to List" : "Add to List"}
          </ButtonText>
        </Button>
      </Box>
    </Card>
  );
}
