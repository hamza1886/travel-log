import React, {useEffect, useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {listLogEntries} from "./API";
import LogEntryForm from "./LogEntryForm";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 4,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const onClick = () => {
    showPopup && setShowPopup({});
    addEntryLocation && setAddEntryLocation(null);
  }

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    showPopup && setShowPopup({});
    setAddEntryLocation({
      latitude,
      longitude,
    });
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onClick={onClick}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="#6095ff"
                onClick={() => {
                  setShowPopup({[entry._id]: true})
                  addEntryLocation && setAddEntryLocation(null);
                }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" fill="white" />
              </svg>
            </Marker>
            {
              showPopup[entry._id] && (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup({})}
                  anchor="top"
                  dynamicPosition={true}
                >
                  <div style={{maxWidth: '300px', fontSize: '12px', zIndex: 999}}>
                    {entry.image && <img src={entry.image} alt={entry.title} className="entry-image" />}
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  </div>
                </Popup>
              )
            }
          </React.Fragment>
        ))
      }
      {
        addEntryLocation && (
          <React.Fragment>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#ff6a62">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" fill="white" />
              </svg>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
              dynamicPosition={true}
            >
              <div className="popup">
                <LogEntryForm
                  location={addEntryLocation}
                  onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                />
              </div>
            </Popup>
          </React.Fragment>
        )
      }
    </ReactMapGL>
  );
}

export default App;
