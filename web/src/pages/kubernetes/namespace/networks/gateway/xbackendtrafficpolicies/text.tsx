import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { xBackendTrafficPoliciesConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={xBackendTrafficPoliciesConfig} />;

export default TextPage;
