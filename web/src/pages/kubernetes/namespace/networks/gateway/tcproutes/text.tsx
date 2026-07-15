import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { tcpRoutesConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={tcpRoutesConfig} />;

export default TextPage;
