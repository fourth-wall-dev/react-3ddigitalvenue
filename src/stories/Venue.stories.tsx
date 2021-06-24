import React from "react";
import { Story, Meta } from "@storybook/react";
import { Venue, VenueProps } from "../Venue";

export default {
  title: "Example/Venue",
  component: Venue,
  argTypes: {},
} as Meta;

const Template: Story<VenueProps> = (args) => <Venue {...args} />;

export const Default = Template.bind({});
Default.args = {
  venue: "eu-gb-00054-rovers",
  map: "blockmap",
};

export const Availability = Template.bind({});
Availability.args = {
  availableSections: ["S_110"],
  venue: "eu-gb-00054-rovers",
  map: "blockmap",
};

export const LoadSeatMap = Template.bind({});
LoadSeatMap.args = {
  availableSections: ["S_110"],
  availableSeats: ["S_110-A-118", "S_110-A-119", "S_110-A-120"],
  venue: "eu-gb-00054-rovers",
  map: "blockmap",
  onBackClick: (e) => {
    e.loadMap({
      venue_id: "eu-gb-00054-rovers",
      map_id: "blockmap",
    });
  },
  onSectionClick: (e) => {
    console.log(e);
    e.instance.loadMap({
      venue_id: "eu-gb-00054-rovers",
      map_id: "S_110",
    });
  },
};

export const Dimensions = Template.bind({});
Dimensions.args = {
  venue: "eu-gb-00054-rovers",
  map: "blockmap",
  width: "300px",
  height: "100px",
  onBackClick: undefined,
};

export const Styling = Template.bind({});
Styling.args = {
  venue: "eu-gb-00054-rovers",
  map: "blockmap",
  availableSections: ["S_110"],
  onBackClick: undefined,
  styles: {
    section: {
      available: {
        normal: {
          none: {
            fillStyle: "hotpink",
          },
        },
      },
    },
  },
};
