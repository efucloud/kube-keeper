import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { gatewaysConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={gatewaysConfig} />;

export default TextPage;
