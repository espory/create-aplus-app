import { PureComponent } from 'react';
import { Radio, Button, List } from 'antd';
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import GroupItem from './component/group-item';
import store from './store';
import './index.less';

@pageWrapper({ store })
class MyGroup extends PureComponent {

  onMyGoupPageChange = async page => {
    console.log('current', page);
    const { dispatch, myGroupPageInfo } = this.props;
    await dispatch('setData', { myGroupPageInfo: { ...myGroupPageInfo, current: page } });
    await dispatch('getData');
  }

  render() {
    const breadcrumbList = [{
      name: '群组管理',
    }, {
      name: '我的群组',
      link: '/my-group',
    }];
    const { myGroupList, myGroupPageInfo } = this.props;
    return <PageContainer breadcrumb={breadcrumbList}>
      <div className="my-group-content">
        <div className="group-header">
          <Radio.Group defaultValue="a">
            <Radio.Button value="a">当前订阅</Radio.Button>
            <Radio.Button value="b">我创建的</Radio.Button>
          </Radio.Group>
          <Button type="primary">创建文献</Button>
        </div>
        <div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: this.onMyGoupPageChange,
              ...myGroupPageInfo,
            }}
            dataSource={myGroupList}
            renderItem={item => (
              <List.Item key={item.id} >
                <GroupItem data={item} />
              </List.Item>
            )}/>
        </div>
      </div>
    </PageContainer>;
  }
}

export default MyGroup;
