import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { referenceGrantsConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={referenceGrantsConfig} />;

export default TextPage;
