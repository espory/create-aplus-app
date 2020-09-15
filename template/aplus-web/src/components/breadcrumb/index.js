import { Breadcrumb } from 'antd';
import { PureComponent } from 'react';

export default class MyBreadcrumb extends PureComponent {

  render() {
    const { list = [] } = this.props;
    return (<Breadcrumb>
      {list.map((item, index) => {
        const { name, link } = item;
        return <Breadcrumb.Item key={index} href={link || ''}>{name}</Breadcrumb.Item>;
      })}
    </Breadcrumb>);
  }
}
