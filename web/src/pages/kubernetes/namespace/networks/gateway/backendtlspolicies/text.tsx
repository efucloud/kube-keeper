import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { backendTlsPoliciesConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={backendTlsPoliciesConfig} />;

export default TextPage;
