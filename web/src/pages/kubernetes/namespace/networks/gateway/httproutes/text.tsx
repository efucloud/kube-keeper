import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { httpRoutesConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={httpRoutesConfig} />;

export default TextPage;
