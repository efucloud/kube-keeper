import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { listenerSetsConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={listenerSetsConfig} />;

export default IndexPage;
