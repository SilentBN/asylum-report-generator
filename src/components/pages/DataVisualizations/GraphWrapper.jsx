import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// Import various graph components
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';
import { transformCitizenshipSummary } from '../DataVisualizations/Graphs/transformCitizenshipSummary';

const { background_color } = colors;

// Main component for wrapping and managing different graph views
function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();

  // Set default view if not provided
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

  // Determine which graph component to render based on office and view
  let map_to_render;
  if (!office) {
    // ... (switch statement for rendering all offices view)
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    // ... (switch statement for rendering single office view)
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  // Function to fetch data from API and update state
  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    const apiBaseURL = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    const endpoint =
      view === 'citizenship' ? '/citizenshipSummary' : '/fiscalSummary';

    axios
      .get(`${apiBaseURL}${endpoint}`, {
        params: {
          from: years[0],
          to: years[1],
          office: office === 'all' ? undefined : office,
        },
      })
      .then(response => {
        // ... (data processing and state update logic)
        let formattedData;
        if (view === 'citizenship') {
          formattedData = transformCitizenshipSummary(response.data);
        } else {
          formattedData = [response.data];
        }
        if (typeof stateSettingCallback === 'function') {
          stateSettingCallback(view, office, formattedData);
        } else {
          console.error('stateSettingCallback is not a function');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Function to clear the current query
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
