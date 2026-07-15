import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';
import { theme, Tooltip } from 'antd';
import React from 'react';
export const About: React.FC = () => {
  const {token}=theme.useToken();
  return (
    <Tooltip
      color={token.colorPrimary}
      title={<FormattedMessage id="app.description" />}
    >
      <QuestionCircleOutlined />
    </Tooltip>
  );
};
