import React from 'react';
import { GatewayResourceListPage } from '../shared';
import { backendTlsPoliciesConfig } from '../resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={backendTlsPoliciesConfig} />;

export default IndexPage;
