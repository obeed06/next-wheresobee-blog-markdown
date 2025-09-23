'use client';

import React from 'react';
import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps';

// URL to the map data (geojson)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Your list of visited countries
const visitedCountries = ['USA', 'MEX', 'JPN', 'ITA', 'GRC']; // Use ISO A3 codes

const VisitedMap = () => {
  return (
    <ComposableMap projectionConfig={{ scale: 150 }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const isVisited = visitedCountries.includes(geo.properties.ISO_A3);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: isVisited ? '#E42' : '#D6D6DA', // Highlight visited countries
                    outline: 'none',
                  },
                  hover: {
                    fill: isVisited ? '#F53' : '#BDBDBD', // Brighter on hover
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#E42',
                    outline: 'none',
}                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default VisitedMap;