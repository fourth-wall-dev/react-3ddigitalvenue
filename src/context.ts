import { createContext, useContext } from "react";
import { RootStyles } from "./types";

export type AvailableState = 'available' | 'unavailable' | 'selected' | 'disabled';

export interface ViewerNode {
  id: string;
  type: string;
  state: AvailableState;
}

export interface ViewerContextInterface {
  getStyles(): [RootStyles];
  setStyles(styles: [RootStyles]): void;
  getNodesByType(type: string): ViewerNode[];
  getNodesByParent(id: string): ViewerNode[];
  setAvailability(type: string, identifier: string | string[]): void;
}

export const ViewerContext = createContext<ViewerContextInterface | null>(null);

export const ViewerProvider = ViewerContext.Provider;

export function useViewer(): ViewerContextInterface {
  const context = useContext(ViewerContext);
  if (context === null) {
    throw new Error("Must be used inside ViewerContext");
  }

  return context;
}
