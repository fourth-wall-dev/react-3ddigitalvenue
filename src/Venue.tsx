import React, { useEffect, useRef, useState, MouseEventHandler } from "react";
import { useViewer, ViewerProvider } from "./context";
import { SectionAvailability } from "./SectionAvailability";
import { uniqueId } from "./utils";
import "./styles.css";
import { SeatAvailability } from "./SeatAvailability";
import { Button } from "./Button";
import { BackIcon } from "./icons/BackIcon";
import { RootStyles } from "./types";
import { defaultsDeep } from "lodash";

export interface VenueProps {
  loading?: boolean;
  venue: string;
  map?: string;

  width?: string | number;
  height?: string | number;

  availableSections?: string[];
  availableSeats?: string[];

  styles?: RootStyles;

  onSectionClick?: MouseEventHandler;
  onSeatClick?: MouseEventHandler;
  onBackClick?: MouseEventHandler;
}

const DVM = (window as any).DVM;

async function start(
  { map, venue }: { map: string | undefined; venue: string },
  viewer: any
) {
  const obj = await viewer.loadMap({ venue_id: venue, map_id: map });
  return obj as any;
}

const noop = () => {};

export const Venue = ({
  venue,
  map,
  availableSections = [],
  availableSeats = [],
  onSectionClick = noop,
  onSeatClick = noop,
  onBackClick,
  width = "auto",
  height = "auto",
  styles,
}: VenueProps) => {
  const el = useRef(null);
  const viewer = useRef(null);
  const { current: container } = useRef(uniqueId("venue-"));
  const [state, setState] = useState({
    loaded: false,
    showBack: false,
    isLoading: false,
  });

  const setLoaded = (isLoaded: boolean) =>
    setState((local) => ({ ...local, loaded: isLoaded }));

  useEffect(() => {
    const e = el.current;
    return () => {
      if (e !== null) {
        e.innerHTML = "";
      }
    };
  }, [el]);

  useEffect(() => {
    async function loadModule() {
      try {
        viewer.current = await DVM.loadModule("map_viewer", {
          container,
          callbacks: {
            click: (e) => {
              const node = e.nodes.length === 1 ? e.nodes[0] : null;
              if (node) {
                const { type } = node;
                switch (type) {
                  case "section":
                    onSectionClick(e);
                    break;
                  case "seat":
                    onSeatClick(e);
                    break;
                }
              }
            },
            start_load: () => setLoaded(false),
            end_load: () => setLoaded(true),
          },
        });

        await start({ venue, map }, viewer.current);
      } catch (err) {}
    }

    loadModule();
  }, [container, venue, map, onSectionClick, onSeatClick]);

  return (
    <ViewerProvider value={viewer.current}>
      <div
        id={container}
        ref={el}
        className="venue__container"
        style={{ width, height }}
      >
        <div className="venue__loader">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>

        {state.loaded && (
          <>
            {onBackClick && (
              <Button
                className={"venue__back-btn"}
                onClick={() => onBackClick(viewer.current)}
              >
                <BackIcon />
              </Button>
            )}
          </>
        )}
      </div>

      {state.loaded && (
        <>
          <SectionAvailability available={availableSections} />
          <SeatAvailability available={availableSeats} />
          {styles && <SetStyles styles={styles} />}
        </>
      )}
    </ViewerProvider>
  );
};

const SetStyles = ({ styles }: { styles: RootStyles }) => {
  const viewer = useViewer();

  useEffect(() => {
    const [currentStyles] = viewer.getStyles();
    const newStyles = defaultsDeep(styles, currentStyles);
    viewer.setStyles([newStyles]);
  }, [styles, viewer]);

  return null;
};
