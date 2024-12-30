interface BusArrivalSingleBus {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string;
  Monitored: number;
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: string;
  Feature: string;
  Type: string;
}

export interface BusArrival {
  ServiceNo: string;
  Operator: string;
  NextBus: BusArrivalSingleBus;
  NextBus2: BusArrivalSingleBus;
  NextBus3: BusArrivalSingleBus;
}
