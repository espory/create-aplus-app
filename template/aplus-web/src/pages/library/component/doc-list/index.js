import { PureComponent } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


class DocList extends PureComponent {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''),

    render: text =>
      text,
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.props.dispatch('setData', { selectedRowKeys, selectedRows });
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  operation = mode => (text, record) => {
    const { dispatch } = this.props;
    if (mode === 'show') {
      return <>
        <a onClick={() => {
          dispatch('setData', { showUpdate: true, tuple: record });
        }}>修改</a>
      </>;
    }
    if (mode === 'add') {
      return <Space>
        <a onClick={() => {
          dispatch('setData', { showUpdate: true, tuple: record });
        }}>修改</a>
      </Space>;
    }
    if (mode === 'delete') {
      return <Space>
        <a onClick={() => {
          dispatch('setData', { showUpdate: true, tuple: record });
        }}>修改</a>
        <a onClick={() => {
          dispatch('removeDocs', { docIds: [ record.id ] });
        }}>移除</a>
      </Space>;
    }
  };

  render() {
    const { dispatch, libraryList, pageInfo, mode } = this.props;
    const columns = [
      {
        title: '文献类型',
        dataIndex: 'type',
      },
      {
        title: '作者',
        dataIndex: 'authors',
      },
      {
        title: '编者',
        dataIndex: 'editors',
      },
      {
        title: '年份',
        dataIndex: 'year',
      },
      {
        title: '标题',
        dataIndex: 'title',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: this.operation(mode),

      },
    ];
    return <Table
      columns={columns}
      dataSource={libraryList}
      pagination={{
        ...pageInfo,
        onChange: (current, pageSize) => {
          dispatch('pageChange', { ...pageInfo, current, pageSize });
        },
      }}
      rowSelection={mode === 'add' ? this.rowSelection : ''
      }
    />;

  }
}

export default DocList;
