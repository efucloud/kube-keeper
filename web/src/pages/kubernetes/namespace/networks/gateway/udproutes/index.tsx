import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { udpRoutesConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={udpRoutesConfig} />;

export default IndexPage;
