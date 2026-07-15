import { PageContainer } from '@ant-design/pro-components';
import { history, useIntl } from '@umijs/max';
import { Button, Result, theme } from 'antd';
import React from 'react';


interface Props {
  title: string;
  subTitle: string;
}
const ClusterResourceNotFound: React.FC<any> = (props) => {
  const intl = useIntl();
  const {token} = theme.useToken();
  const colorPrimary = token.colorPrimary;
  return (
    <PageContainer
      header={{ breadcrumb: {}, onBack: () => window.history.back() }}
      title={props.title}
      subTitle={props.subTitle}
    >
      集群未部署该资源，请联系管理员部署
    </PageContainer>
  );
};
export default ClusterResourceNotFound;
