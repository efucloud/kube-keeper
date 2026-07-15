import {
  CodeOutlined,
} from '@ant-design/icons';

import { FormattedMessage } from '@umijs/max';
import { theme, Tooltip } from 'antd';
import { getCurrentViewInfo, } from '@/utils/global';

export const ClusterTerminal: React.FC = () => {
  const { token } = theme.useToken();
  const { cluster } = getCurrentViewInfo();
  if (cluster !== '') {
    return (
      <Tooltip
        color={token.colorPrimary}
        title={<FormattedMessage id="cluster.terminal" />}
      >
        <CodeOutlined
          style={{
            color: token.colorPrimary,
            fontSize: 20,
            verticalAlign: 'middle',
          }}
          onClick={() => {
            window.open(`/kubernetes/cluster/${cluster}/terminal`)
          }}
        />
      </Tooltip>
    );
  } else {
    return null;
  }
};
export default ClusterTerminal;
