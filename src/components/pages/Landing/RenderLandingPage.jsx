// Desc: This file contains the code for the Landing Page of the application
import React from 'react';

// Img and Assets Imports
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';

// CSS Import
import '../../../styles/RenderLandingPage.less';

// External dependencies for UI components and routing
import { Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

// for the purposes of testing PageNav
// import PageNav from '../../common/PageNav';

function RenderLandingPage(props) {
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handleDataDownload = () => {
    fetch('http://localhost:5000/api/download-csv')
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Network response was not ok.');
          });
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'COW2021001887-I589Data.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Download failed:', error);
        message.error(`Download failed: ${error.message}`);
      });
  };

  const DataActionButton = ({ onClick, children, href }) => (
    <Button
      type="default"
      style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
      onClick={onClick}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Button>
  );

  const history = useHistory();

  return (
    <div className="main">
      <div className="header">
        <div className="header-text-container">
          <h1>Asylum Office Grant Rate Tracker</h1>
          <h3>
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions
          </h3>
        </div>
      </div>

      <div className="graphs-section">
        <div className="graph-container">
          <img src={GrantRatesByOfficeImg} alt="Search Grant Rates By Office" />
          <p>Search Grant Rates By Office</p>
        </div>
        <div className="graph-container">
          <img
            src={GrantRatesByNationalityImg}
            alt="Search Grant Rates By Nationality"
          />
          <p>Search Grant Rates By Nationality</p>
        </div>
        <div className="graph-container">
          <img src={GrantRatesOverTimeImg} alt="Search Grant Rates Over Time" />
          <p>Search Grant Rates Over Time</p>
        </div>
      </div>

      <div className="data-action-buttons">
        <DataActionButton onClick={() => history.push('/graphs')}>
          View the Data
        </DataActionButton>
        <DataActionButton onClick={handleDataDownload}>
          Download the Data
        </DataActionButton>
      </div>

      <div className="middle-section">
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set
          </h3>
        </div>
      </div>
      <div>
        <div className="bottom-section">
          <h2>Systemic Disparity Insights</h2>
          <div className="insights-container">
            <div className="insight">
              <h3>36%</h3>
              <p>
                By the end of the Trump administration, the average asylum
                office grant rate had fallen 36 percent from an average of 44
                percent in fiscal year 2016 to 28 percent in fiscal year 2020.
              </p>
            </div>
            <div className="insight">
              <h3>5%</h3>
              <p>
                The New York asylum office grant rate dropped to 5 percent in
                fiscal year 2020.
              </p>
            </div>
            <div className="insight">
              <h3>6x Lower</h3>
              <p>
                Between fiscal year 2017 and 2020, the New York asylum office's
                average grant rate was six times lower than the San Francisco
                asylum office.
              </p>
            </div>
          </div>
          <DataActionButton href="https://humanrightsfirst.org/library/uscis-records-reveal-systemic-disparities-in-asylum-decisions/">
            Read More
          </DataActionButton>
          <div className="back-to-top" onClick={scrollToTop}>
            Back To Top ^
          </div>
        </div>
      </div>
    </div>
  );
}
export default RenderLandingPage;
