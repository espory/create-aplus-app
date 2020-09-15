import { PureComponent } from 'react';
import { Input, Button, Space, Modal } from 'antd';
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import store from './store';
import DocList from './component/doc-list';
import './index.less';
import DocForm from './component/doc-form';

const { Search } = Input;

const lBreadcrumbList = [{
  name: '文献管理',
  link: '/library',
}];
const gBreadcrumbList = [{
  name: '群组管理',
  link: '/group',
}, {
  name: '我的群组',
  link: '/group',
}, {
  name: '群组文献',
  link: '/group/library/',
}];

@pageWrapper({ store })
class Library extends PureComponent {
  onSearch = title => {
    const { dispatch } = this.props;
    dispatch('searchDoc', { title });
  }

  addDocs = () => {
    const { dispatch, selectedRowKeys } = this.props;
    dispatch('addDocs', { docIds: selectedRowKeys });
  }

  render() {
    const { dispatch, libraryList, pageInfo, selectable, selectedRowKeys, mode, showUpdate, showAdd, tuple, isGroup } = this.props;
    const { params } = this.props.match;
    if (params.groupId && !isGroup) {
      gBreadcrumbList[2].link += params.groupId;
      dispatch('setData', { isGroup: true, mode: 'delete', groupId: params.groupId });
      dispatch('groupDoc', { groupId: params.groupId });
    }
    return <PageContainer breadcrumb={isGroup ? gBreadcrumbList : lBreadcrumbList}>
      <div className={'table-head'}>
        <Space className="left">
          {
            (!isGroup || mode === 'add') && <Search className="search-box"
              placeholder="搜索"
              onSearch={this.onSearch}/>
          }
          {
            (isGroup && mode === 'delete') && <Button type="primary" onClick={() => { dispatch('setData', { mode: 'add', libraryList: [] }); }}>添加文献</Button>
          }
          {
            mode === 'add' && <div>
              <Button type="primary" disabled={selectedRowKeys.length === 0} onClick={this.addDocs}>添加</Button>
              <span
                style={{ marginLeft: 8 }}>{(selectedRowKeys.length !== 0) ? `选择了 ${selectedRowKeys.length} 条` : ''}</span>
            </div>
          }
        </Space>
        <Button type="primary" onClick={() => {
          if (isGroup) {
            dispatch('setData', { showAdd: true, tuple: { groupId: params.groupId } });
          } else {
            dispatch('setData', { showAdd: true, tuple: null });
          }
        }}>
          新增文献
        </Button>
      </div>
      < DocList libraryList={libraryList} pageInfo={pageInfo} selectable={selectable} selectedRowKeys={selectedRowKeys}
        dispatch={dispatch} mode={mode}/>

      {(showAdd || showUpdate) && <Modal
        title={(showUpdate && '更新文献') || (showAdd && '添加文献')}
        visible={true}
        footer={null}
        onCancel={() => {
          dispatch('setData', { showUpdate: false, showAdd: false, tuple: null });
        }}
      >
        <DocForm dispatch={dispatch} tuple={tuple}/>
      </Modal>}
    </PageContainer>;
  }
}

export default Library;
