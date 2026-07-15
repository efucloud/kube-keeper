import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { tcpRoutesConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={tcpRoutesConfig} />;

export default IndexPage;
