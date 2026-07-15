import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { xBackendTrafficPoliciesConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={xBackendTrafficPoliciesConfig} />;

export default IndexPage;
