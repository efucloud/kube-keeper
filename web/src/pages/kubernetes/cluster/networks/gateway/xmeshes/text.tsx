import React from 'react';
import { GatewayResourceTextPage } from '@/pages/kubernetes/namespace/networks/gateway/shared';
import { xMeshesConfig } from '@/pages/kubernetes/namespace/networks/gateway/resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={xMeshesConfig} />;

export default TextPage;
