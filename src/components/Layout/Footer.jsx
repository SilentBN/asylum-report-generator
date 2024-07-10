// Ant Design components for layout and UI elements
import { Button, Space, Typography, Layout, Image } from 'antd';
// React library for creating components
import React from 'react';
// Logo image for the footer
import Logo from '../../styles/Images/WhiteLogo.png';
// Color constants used for styling
import { colors } from '../../styles/data_vis_colors';

// Styles specific to the landing page (may include some footer styles)
import '../../styles/RenderLandingPage.less';

// Destructure Typography component for text elements
const { Text } = Typography;
// Extract the primary accent color from the colors object
const { primary_accent_color } = colors;

// FooterContent component: Renders the main content of the footer
function FooterContent() {
  return (
    <div>
      {/* HRF logo */}
      <div>
        <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
      </div>
      <Space className="footer-container" direction="horizontal">
        <Space direction="vertical" align="start">
          {/* Contact information */}
          <Text style={{ color: 'white' }}>
            Human Rights First
            <br />
            75 Broad St, 31st Floor, New York,
            <br />
            New York, New York 10004 US
          </Text>
          {/* Media contact information */}
          <Text style={{ color: 'white' }}>
            For Media Inquiries call 202-370-3323
          </Text>
        </Space>
      </Space>
    </div>
  );
}

// SubFooter component: Renders additional links in the footer
function SubFooter() {
  const { Footer } = Layout;
  const base_url = 'https://www.humanrightsfirst.org';

  // Object containing link text and URLs
  const button_links_by_text = {
    'About Us': `${base_url}/about`,
    'Contact Us': `${base_url}/about/contact`,
    Press: `${base_url}/press`,
    Donate: `${base_url}/donate`,
    'Join the Work': `${base_url}/join-the-work`,
    Careers: `${base_url}/careers`,
  };

  return (
    <Footer
      style={{
        backgroundColor: primary_accent_color,
        marginLeft: '-7px',
      }}
    >
      <Space direction="horizontal">
        {/* Generate buttons for each link */}
        {Object.entries(button_links_by_text).map((text_link_pair, index) => {
          return (
            <Button
              key={index}
              type="text"
              size="small"
              href={text_link_pair[1]}
              style={{ color: 'white' }}
            >
              {text_link_pair[0]}
            </Button>
          );
        })}
      </Space>
    </Footer>
  );
}

export { FooterContent, SubFooter };
