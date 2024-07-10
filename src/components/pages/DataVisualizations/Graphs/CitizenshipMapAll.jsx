import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import Table from './TableComponents/Table';
import { colors } from '../../../../styles/data_vis_colors';

const { background_color, secondary_accent_color } = colors;

// Map Redux state to component props
const mapStateToProps = state => {
  return {
    citizenshipMapAllData: state.vizReducer.citizenshipMapAllData,
  };
};

function CitizenshipMapAll(props) {
  const { citizenshipMapAllData } = props;
  // State for choropleth map data
  const [plotlyGraphAxis, setPlotlyGraphAxis] = useState({
    locationsAndText: [],
    z: [],
  });
  // State for table data
  const [rowsForTable, setRowsForTable] = useState([]);

  // Update local state when Redux state changes
  useEffect(() => {
    if (citizenshipMapAllData['countryGrantRateObj'] !== undefined) {
      setPlotlyGraphAxis({
        locationsAndText:
          citizenshipMapAllData['countryGrantRateObj']['countries'],
        z: citizenshipMapAllData['countryGrantRateObj'][
          'countriesPercentGranteds'
        ],
      });
    } else {
      setPlotlyGraphAxis({ locationsAndText: [], z: [] });
    }
    if (citizenshipMapAllData.rowsForTable === undefined) {
      setRowsForTable([]);
    } else {
      setRowsForTable(citizenshipMapAllData.rowsForTable);
    }
  }, [citizenshipMapAllData]);

  // Available geographic scopes for the map
  const geoScopeArray = [
    'world',
    'europe',
    'asia',
    'africa',
    'north america',
    'south america',
  ];
  const [geoScope, setGeoScope] = useState('world');

  // Handle change in map scope
  const handleScopeChange = e => {
    //update Plotly region based on dropdown selection
    const { value } = e.target;
    setGeoScope(value);
  };

  // Column definitions for the table
  const columnsForTable = [
    'Citizenship',
    'Total Cases',
    '% Granted',
    '% Admin Close / Dismissal',
    '% Denied',
  ];

  return (
    <div
      className="citizenship-map-all-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>
        Showing: Rates of 'granted' case decision by nationality of origin, for
        all offices
      </p>

      {/* Render Plotly choropleth map */}
      <Plot
        data={[
          {
            type: 'choropleth',
            locationmode: 'country names',
            locations: plotlyGraphAxis['locationsAndText'],
            z: plotlyGraphAxis['z'],
            text: plotlyGraphAxis['locationsAndText'],
            colorscale: [
              [0, 'rgb(255,78,17)'],
              [0.5, 'rgb(250,183,51)'],
              [1, 'rgb(105,179,76)'],
            ],
            colorbar: {
              title: 'Grant %',
            },
          },
        ]}
        layout={{
          title: 'USCIS Asylum Grant Rates by Citizenship of Asylum Seeker',
          paper_bgcolor: background_color,
          hoverlabel: {
            bordercolor: secondary_accent_color,
          },
          geo: {
            scope: geoScope,
          },
          height: 500,
          width: 700,
        }}
        style={{
          width: '100%',
          fontWeight: '900',
          backgroundColor: background_color,
        }}
      />

      {/* Dropdown for selecting map region */}
      <label htmlFor="regionSelect">Select another region below</label>
      <select name="regionSelect" onChange={handleScopeChange}>
        {geoScopeArray.map((a, index) => {
          return (
            <option value={a} key={index}>
              {a.toUpperCase()}
            </option>
          );
        })}
      </select>

      {/* Render table with citizenship data */}
      <p>Table view</p>
      <Table
        bordered={true}
        rows={rowsForTable}
        columns={columnsForTable}
        tableWidth={'100%'}
        rowHeight={'50px'}
        scroll={{ y: 550 }}
      />
    </div>
  );
}

export default connect(mapStateToProps)(CitizenshipMapAll);
