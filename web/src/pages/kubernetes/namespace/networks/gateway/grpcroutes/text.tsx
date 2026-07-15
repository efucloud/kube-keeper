import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { grpcRoutesConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={grpcRoutesConfig} />;

export default TextPage;
