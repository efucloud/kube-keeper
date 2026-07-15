import React from 'react';
import { GatewayResourceListPage } from '@/pages/kubernetes/namespace/networks/gateway/shared';
import { xMeshesConfig } from '@/pages/kubernetes/namespace/networks/gateway/resources';

const IndexPage: React.FC = () => <GatewayResourceListPage config={xMeshesConfig} />;

export default IndexPage;
