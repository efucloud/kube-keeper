import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { tlsRoutesConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={tlsRoutesConfig} />;

export default TextPage;
