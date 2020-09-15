import { PureComponent } from 'react';
import { Button, Popconfirm } from 'antd';
import './index.less';

export default class GroupItem extends PureComponent {
  onUpdate = async e => {
    const { dispatch } = this.props;
    dispatch('showGroupForm', 'update');
    dispatch('setFormData', e);
  }

  onDelete = async e => {
    const { dispatch } = this.props;
    await dispatch('deleteGroup', e);
  }

  render() {
    const { data = {} } = this.props;
    const { description, title, user = '', id } = data;
    return (<div className="my-group-item own-item">
      <div className="my-group-item-left">
        <div className={`my-group-item-icon color${id % 3 + 1}`} />
        <div className="my-group-item-header">
          <span className="my-group-item-title">{title}</span>
          <span className="my-group-item-desc">{description}</span>
        </div>
      </div>
      <div className="my-group-item-mid">
        创建人：{user.name}
      </div>
      <div className="my-group-item-right">
        <Button type="ghost" className="my-group-item-button" onClick={this.onUpdate.bind(null, { id, description, title })}>编辑</Button>
        <Popconfirm
          title="Are you sure delete this group?"
          onConfirm={this.onDelete.bind(null, id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="ghost" className="my-group-item-button">删除</Button>
        </Popconfirm>
      </div>
    </div>);
  }
}
