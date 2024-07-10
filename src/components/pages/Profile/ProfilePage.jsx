import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Avatar, Typography, Row, Col, Descriptions, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ProfilePage = () => {
  // Get user data and authentication status from Auth0
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Show loading spinner while auth state is being determined
  if (isLoading) {
    return <Spin size="large" />;
  }

  // Show message if user is not authenticated
  if (!isAuthenticated) {
    return <Paragraph>Please log in to view your profile.</Paragraph>;
  }

  // Render profile information for authenticated users
  return (
    <Row justify="center" style={{ padding: '2rem' }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
              <Avatar
                size={128}
                src={user.picture}
                icon={<UserOutlined />}
                alt={user.name}
              />
            </Col>
            <Col xs={24} sm={16}>
              <Title level={2}>{user.name}</Title>
              <Paragraph type="secondary">{user.email}</Paragraph>
            </Col>
          </Row>

          {/* Detailed user information */}
          <Descriptions
            title="User Information"
            layout="vertical"
            bordered
            style={{ marginTop: '2rem' }}
          >
            <Descriptions.Item label="Nickname">
              {user.nickname}
            </Descriptions.Item>
            <Descriptions.Item label="Email Verified">
              {user.email_verified ? 'Yes' : 'No'}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {new Date(user.updated_at).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePage;
