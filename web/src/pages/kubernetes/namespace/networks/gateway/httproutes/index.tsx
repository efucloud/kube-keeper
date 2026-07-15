import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { httpRoutesConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={httpRoutesConfig} />;

export default IndexPage;
