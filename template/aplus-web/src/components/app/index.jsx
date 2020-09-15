import { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import routeConf from '../../config/route.config';
import menuConf from '../../config/menu.config';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

class App extends PureComponent {

  render() {
    return (<Layout className="page-container">
      <Header className="header-container">
        <div className="header-content">
          <img className="header-logo" alt="" src="https://s1.ax1x.com/2020/07/13/UGYeVU.png" />
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[ '1' ]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {
              menuConf.map(item => {
                const { name, icon: IconComponent, children } = item;
                if (!children || children.length === 0) {
                  return <MenuItem key={name} icon={<IconComponent />}><Link to={item.link ? item.link : '#'}>{name}</Link></MenuItem>;
                }
                return (<SubMenu key={name} icon={<IconComponent />} title={name}>
                  {children.map((child, index) => <MenuItem key={`${child.name}-${index}`}><Link to={child.link ? child.link : '#'}>{child.name}</Link></MenuItem>)}
                </SubMenu>);
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Content className="content-container">
            <Switch>
              <Route path="/" key={0} component={routeConf.group.entry} exact />
              { Object.keys(routeConf).map((key, index) => {
                const { route, entry, exact = false } = routeConf[key];
                return <Route path={route} key={index} component={entry} exact={exact} />;
              })}
              <Redirect to="/404" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright © 2020 Fudan Sonic Lab. All Rights Reserved
          </Footer>
        </Layout>
      </Layout>
    </Layout>);
  }
}

export default connect(
  createStructuredSelector({

  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(App);
