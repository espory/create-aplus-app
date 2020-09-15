import { PureComponent } from 'react';
import './index.less';
import { Button, Popconfirm } from 'antd';

export default class SubGroupItem extends PureComponent {
  onUnsubscribe = async e => {
    const { dispatch } = this.props;
    dispatch('unsubscribeGroup', e);
  }

  render() {
    const { data = {} } = this.props;
    const { description, title, user = '', id } = data;

    return (<div className="my-group-item sub-item">
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
        <Popconfirm
          title="Are you sure unsubscribe this group?"
          onConfirm={this.onUnsubscribe.bind(null, id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="ghost" className="my-group-item-button">取消订阅</Button>
        </Popconfirm>
      </div>
    </div>);
  }
}
