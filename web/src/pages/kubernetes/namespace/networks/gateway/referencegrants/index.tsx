import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { referenceGrantsConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={referenceGrantsConfig} />;

export default IndexPage;
