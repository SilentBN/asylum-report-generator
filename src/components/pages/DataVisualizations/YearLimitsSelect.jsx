import React, { useEffect } from 'react';
import { Form, Button } from 'antd';
import { setVisualizationData } from '../../../state/actionCreators';
import { rawApiDataToPlotlyReadyInfo, useInterval } from '../../../utils';
import { connect } from 'react-redux';
import { colors } from '../../../styles/data_vis_colors';

const { primary_accent_color } = colors;

// Maps Redux state to component props based on current view and office
const mapStateToProps = (state, ownProps) => {
  const { view, office } = ownProps;
  // ... (logic to determine which years to use based on view and office)
  if (office === 'all' || !office) {
    switch (view) {
      case 'time-series':
        return {
          years: state.vizReducer.timeSeriesAllYears,
        };
      case 'office-heat-map':
        return {
          years: state.vizReducer.officeHeatMapYears,
        };
      case 'citizenship':
        return {
          years: state.vizReducer.citizenshipMapAllYears,
        };
      default:
        return {
          years: ['', ''],
        };
    }
  } else {
    switch (view) {
      case 'time-series':
        return {
          years: state.vizReducer.offices[office].timeSeriesYears,
        };
      case 'citizenship':
        return {
          years: state.vizReducer.offices[office].citizenshipMapYears,
        };
      default:
        return {
          years: ['', ''],
        };
    }
  }
};

function YearLimitsSelect(props) {
  let { view, office, dispatch, clearQuery, updateStateWithNewData, years } =
    props;

  // Callback function to update Redux state with new visualization data
  const stateSettingFn = (view, office, data) => {
    const plotlyReadyData = rawApiDataToPlotlyReadyInfo(view, office, data);
    dispatch(setVisualizationData(view, office, plotlyReadyData));
  };
  const [form] = Form.useForm();

  // Periodically update form fields with current year values from Redux state
  useInterval(() => {
    form.setFieldsValue({
      year_start: years[0],
      year_end: years[1],
    });
  }, 10);

  // Fetch new data when component mounts or updates
  useEffect(() => {
    updateStateWithNewData(years, view, office, stateSettingFn);
  });

  return (
    <div
      className="year-limits-select-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50px',
      }}
    >
      <Form
        form={form}
        name="yearLimitsSelect"
        initialValues={{ year_start: years[0], year_end: years[1] }}
        onFinish={() => {
          updateStateWithNewData(years, view, office, stateSettingFn);
        }}
        autoComplete="off"
        layout="inline"
        wrapperCol={{ span: 45 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
        }}
      >
        {/* Update Query button */}
        <Form.Item>
          <Button
            htmlType="submit"
            data-testid="filter"
            style={{
              backgroundColor: primary_accent_color,
              color: 'white',
              marginLeft: '105px',
              marginTop: '10px',
            }}
          >
            Update Query
          </Button>
        </Form.Item>
      </Form>

      {/* Clear Query button */}
      <Button
        style={{
          width: '122px', // this is to match the width of the Form.Item button
          backgroundColor: primary_accent_color,
          color: 'white',
          marginLeft: '105px',
        }}
        onClick={() => {
          clearQuery(view, office);
        }}
      >
        Clear Query
      </Button>
    </div>
  );
}

export default connect(mapStateToProps)(YearLimitsSelect);
