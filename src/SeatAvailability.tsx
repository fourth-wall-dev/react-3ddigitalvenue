import { useEffect } from "react";
import { useViewer } from "./context";

export interface SeatAvailabilityProps {
  available: string[];
}

export const SeatAvailability = ({ available }: SeatAvailabilityProps) => {
  const viewer = useViewer();

  useEffect(() => {
    viewer.setAvailability("seat", available);
  }, [available, viewer]);

  return null;
};
