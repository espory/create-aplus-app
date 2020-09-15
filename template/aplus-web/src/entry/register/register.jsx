import ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './register.less';
import { register } from './service';

class Register extends PureComponent {

  onFinish = async values => {
    try {
      const result = await register(values);
      if (result) {
        window.location.href = '/';
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { onFinish } = this;
    return <div className="login-container">
      <div className="login-content">
        <div className="login-title">注册</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="mail"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="repassword"
            rules={[{ required: true, message: 'Please input your Password again!' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Repeat Password"
            />
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" className="login-form-button">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>;
  }
}

ReactDOM.render(<Register />, document.getElementById('root'));
