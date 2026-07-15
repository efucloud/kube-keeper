import React from 'react';
import { GatewayResourceTextPage } from '../shared';
import { listenerSetsConfig } from '../resources';

const TextPage: React.FC = () => <GatewayResourceTextPage config={listenerSetsConfig} />;

export default TextPage;
