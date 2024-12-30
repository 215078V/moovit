import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";
import { Button, ButtonIcon } from "@/components/ui/button";
import FloatingButton from "@/components/FloatingButton";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Spinner } from '@/components/ui/spinner';
import { Heading } from "@/components/ui/heading";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/icon";
import BusCard from "@/components/BusCard";
import { BusArrival } from "@/types/BusArrival";
import { getAllBusArrivals, getAllBusArrivalsByStop } from "@/apis/BusArrival";
import { BusService } from "@/types/BusService";
import { getAllBusServices } from "@/apis/BusService";
import { BusStop } from "@/types/BusStop";
import { getAllBusStops } from "@/apis/BusStop";
import { useBusStopContext } from "@/context/BusStopContext";
import { BusStopProvider } from "@/context/BusStopContext";

export default function HomePage() {
  const { busStopCode } = useBusStopContext();
  const [busArrivals, setBusArrivals] = React.useState<BusArrival[]>([]);
  const [busArrivalsByStop, setBusArrivalsByStop] = React.useState<
    BusArrival[]
  >([]);
  const [busStops, setBusStops] = React.useState<BusStop[]>([]);
  const [busServices, setBusServices] = React.useState<BusService[]>([]);
  const [selectedBusService, setSelectedBusService] =
    React.useState<string>("");
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedBusStop, setSelectedBusStop] = React.useState<string>("01329");
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getAllBusArrivals(busStopCode, selectedBusService).then((arrivals) => {
      setBusArrivals(arrivals);
      setLoading(false);
    });
  }, [currentIndex, selectedBusService, busStopCode]);

  React.useEffect(() => {
    getAllBusArrivalsByStop(busStopCode).then((arrivals) => {
      setBusArrivalsByStop(arrivals);
    });
  }, [busStopCode]);

  React.useEffect(() => {
    getAllBusServices().then((services) => {
      setBusServices(services);
    });
  }, []);

  React.useEffect(() => {
    setSelectedBusService(busArrivalsByStop[currentIndex]?.ServiceNo);
  }, [currentIndex, selectedBusStop, busArrivalsByStop]);

  React.useEffect(() => {
    getAllBusStops().then((stops) => {
      setBusStops(stops);
    });
  }, []);

  const handleNextBusService = () => {
    const count = busArrivalsByStop.length;
    if (currentIndex + 1 < count) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePreviousBusService = () => {
    const count = busArrivalsByStop.length;
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(count - 1);
    }
  };

  return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 150,
        }}
      >
        <View style={{ padding: 10, marginRight: 10, width: "90%" }}>
          <VStack space="md">
            <HStack space="md" reversed={false}>
              <Box
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  size="lg"
                  variant="link"
                  action="primary"
                  onPress={handlePreviousBusService}
                >
                  <ButtonIcon as={ChevronLeftIcon} />
                </Button>
              </Box>
              <Box
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    backgroundColor: "rgba(182, 245, 176, 0.5)",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Heading size="md" style={{ color: "#19800f" }}>
                    Service # {selectedBusService}
                  </Heading>
                </Box>
              </Box>
              <Box
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  size="lg"
                  variant="link"
                  action="primary"
                  onPress={handleNextBusService}
                >
                  <ButtonIcon as={ChevronRightIcon} />
                </Button>
              </Box>
            </HStack>
          </VStack>
        </View>
                
        {busArrivals?.map((busArrival) => (
          <ScrollView key={busArrival.ServiceNo}>
            <BusCard
              bus_img="https://t4.ftcdn.net/jpg/02/69/47/51/360_F_269475198_k41qahrZ1j4RK1sarncMiFHpcmE2qllQ.jpg"
              service_no={busArrival.ServiceNo}
              arrival_time={busArrival.NextBus.EstimatedArrival}
              operator={busArrival.Operator}
              load={busArrival.NextBus.Load}
              from={busArrival.NextBus.OriginCode}
              to={busArrival.NextBus.DestinationCode}
              category="Express"
            />

            <BusCard
              bus_img="https://t4.ftcdn.net/jpg/02/69/47/51/360_F_269475198_k41qahrZ1j4RK1sarncMiFHpcmE2qllQ.jpg"
              service_no={busArrival.ServiceNo}
              arrival_time={busArrival.NextBus2.EstimatedArrival}
              operator={busArrival.Operator}
              load={busArrival.NextBus2.Load}
              from={busArrival.NextBus2.OriginCode}
              to={busArrival.NextBus2.DestinationCode}
              category="Express"
            />

            <BusCard
              bus_img="https://t4.ftcdn.net/jpg/02/69/47/51/360_F_269475198_k41qahrZ1j4RK1sarncMiFHpcmE2qllQ.jpg"
              service_no={busArrival.ServiceNo}
              arrival_time={busArrival.NextBus3.EstimatedArrival}
              operator={busArrival.Operator}
              load={busArrival.NextBus3.Load}
              from={busArrival.NextBus3.OriginCode}
              to={busArrival.NextBus3.DestinationCode}
              category="Express"
            />
          </ScrollView>
        ))}
      </View>
  );
}
