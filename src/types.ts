export interface RootStyles {
  seat?: StyleStates;
  section?: StyleStates;
}

interface StyleStates {
  available?: PseudoStates;
  unavailable?: PseudoStates;
  selected?: PseudoStates;
  disabled?: PseudoStates;
}

interface PseudoStates {
  normal?: TagStates;
  hover?: TagStates;
}

type TagStates = Record<string, Styles>

interface Styles {
  cursor?: string;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  lineDash?: number[];
  lineDashOffset?: number;
  opacity?: number;
  fillOpacity?: number;
  strokeOpacity?: number;
  text?: boolean;
  textFillStyle?: string;
  textStrokeStyle?: string;
  textLineWidth?: string;
  textFontSize?: number;
  textFontFamily?: string;
  textBackground?: boolean;
  textBackgroundFillStyle?: string;
  textBackgroundOpacity?: number;
  icon?: string;
  iconFillStyle?: string;
  iconStrokeStyle?: string;
  iconLineWidth?: number;
  iconScale?: string;
  iconOpacity?: number;
  iconFillOpacity?: number;
  iconStrokeOpacity?: number;
}
