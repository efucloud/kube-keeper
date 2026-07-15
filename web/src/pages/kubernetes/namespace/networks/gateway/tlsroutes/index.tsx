import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { tlsRoutesConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={tlsRoutesConfig} />;

export default IndexPage;
