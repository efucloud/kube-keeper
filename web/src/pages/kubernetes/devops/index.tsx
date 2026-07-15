import { AuthedUserInfo } from '@/services/common';
import { PageContainer } from '@ant-design/pro-components';
import { Welcome } from '@ant-design/x';
import { useIntl, useModel } from '@umijs/max';
import { Avatar, Space } from 'antd';
import useStyles from '@/pages/kubernetes/devops/style.style';

const Index: React.FC = () => {
  /** 国际化配置 */
  const intl = useIntl();
  const { styles } = useStyles();
  const { initialState } = useModel('@@initialState');
  const currentUser = (initialState?.currentUser || {}) as AuthedUserInfo;
  return (
    <PageContainer
      header={{ breadcrumb: {}, onBack: () => window.history.back() }}
      title={false}
    >
      <Welcome
        variant="borderless"
        icon={
          currentUser.avatar && (
            <div className={styles.avatar}>
              <Avatar size="large" src={currentUser.avatar} />
            </div>
          )
        }
        title={currentUser.username}
        description={
          <Space>
          </Space>
        }
        extra={<Space><div>werwer</div><div>werwer</div></Space>}
      />
    </PageContainer>
  );
};
export default Index;
