import React from 'react';
import { FormattedMessage } from 'react-intl';

import { theme } from 'antd';

export const WorkplaceIndex: React.FC = () => {
  const {token} = theme.useToken();
  const colorPrimary = token.colorPrimary;
  if (window.location.href.indexOf(`/workplace`) < 0
  ) {
    return (
      <>
        <a
          style={{ color: colorPrimary }}
          onClick={() => {
            window.location.href = `/workplace`;
          }}
        >
          <FormattedMessage id="pages.go.workplace" key='workplace' />
        </a>
      </>
    );
  } else {
    return null;
  }
};

export default WorkplaceIndex;
