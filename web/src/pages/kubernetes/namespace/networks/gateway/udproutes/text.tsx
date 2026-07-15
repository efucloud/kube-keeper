import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { udpRoutesConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={udpRoutesConfig} />;

export default TextPage;
