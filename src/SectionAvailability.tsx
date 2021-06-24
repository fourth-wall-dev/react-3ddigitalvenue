import { useEffect } from "react";
import { useViewer } from "./context";

export interface SectionAvailabilityProps {
  available: string[];
}

export const SectionAvailability = ({
  available,
}: SectionAvailabilityProps) => {
  const viewer = useViewer();

  useEffect(() => {
    available.forEach((s) => viewer.setAvailability("section", s));
  }, [available, viewer]);

  return null;
};
