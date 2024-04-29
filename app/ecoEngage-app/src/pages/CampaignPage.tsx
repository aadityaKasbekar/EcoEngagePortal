import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BasicMap from "../components/BasicMap"; // Update import statement
import EventCard from "../components/EventCard";
import { Event } from "../models/Event";
import { getAllEvents } from "../store/event-slice";
import "../assets/css/CampaignPage.css"; // Import the CSS file
import LandingBar from "../components/LandingBar";
import * as maptilersdk from "@maptiler/sdk";

const CampaignPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const map = useRef(null);
  const eventsState = useSelector(getAllEvents());

  const selectEvent = (event: Event) => {
    console.log(event.title);
    setSelectedEvent(event);

    // Go to the selected event's location on the map
    if (map) {
      map.current.flyTo({
        center: [event.location.longitude, event.location.latitude],
        zoom: 14,
      });
    }
  };

  return (
    <Box className="root">
      <Box className="landingBarContainer">
        <LandingBar></LandingBar>
      </Box>
      <Box className="mapContainer">
        <BasicMap events={eventsState} map={map} />{" "}
      </Box>
      <Box className="cardListContainer">
        <List style={{ paddingTop: "10px" }}>
          {eventsState.map((event) => (
            <ListItem key={event.id}>
              <EventCard event={event} onClick={selectEvent} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CampaignPage;
