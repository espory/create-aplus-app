import { PureComponent } from 'react';
import './index.less';

export default class GroupItem extends PureComponent {

  render() {
    const { data = {} } = this.props;
    const { description, title, user = '', id } = data;

    return (<div className="my-group-item">
      <div className="my-group-item-left">
        <div className={`my-group-item-icon color${id % 3 + 1}`} />
        <div className="my-group-item-header">
          <span className="my-group-item-title">{title}</span>
          <span className="my-group-item-desc">{description}</span>
        </div>
      </div>
      <div className="my-group-item-right">
        创建人：{user.name}
      </div>
    </div>);
  }
}
