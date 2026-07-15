import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { grpcRoutesConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={grpcRoutesConfig} />;

export default IndexPage;
