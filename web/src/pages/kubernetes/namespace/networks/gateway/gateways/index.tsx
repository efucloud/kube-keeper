import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { gatewaysConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={gatewaysConfig} />;

export default IndexPage;
