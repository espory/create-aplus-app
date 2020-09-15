import { PureComponent, createRef } from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};


class DocForm extends PureComponent {
  formRef = createRef();
  onFinish = (dispatch, tuple) => values => {
    console.log(tuple);
    values.authors = values.authors.split(',');
    values.editors = values.editors.split(',');
    if (tuple === null) {
      dispatch('createDoc', { ...values });
    } else {
      if (tuple.groupId) {
        dispatch('createAndAddDoc', { ...values, groupId: tuple.groupId });
      } else {
        dispatch('updateDoc', values);
      }
    }
  };
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };
  onFill = () => {
    console.log(this.formRef);
    this.formRef.current.setFieldsValue({
      authors: '123',
    });
  };

  render() {
    const { tuple, dispatch } = this.props;
    return <Form {...layout} ref={this.formRef} initialValues={tuple} onFinish={this.onFinish(dispatch, tuple)}
      onFinishFailed={this.onFinishFailed}>
      <Form.Item name="id" hidden={true}>
        <Input/>
      </Form.Item>
      <Form.Item name="authors" label="作者">
        <Input/>
      </Form.Item>
      <Form.Item name="editors" label="编者">
        <Input/>
      </Form.Item>
      <Form.Item name="year" label="年份" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name="type" label="文献类型" rules={[{ required: true }]}>

        <Select placeholder="选择文件类型" allowClear>
          <Option value="article">article</Option>
          <Option value="book">book</Option>
          <Option value="incollection">incollection</Option>
          <Option value="inproceedings">inproceedings</Option>
          <Option value="mastersthesis">mastersthesis</Option>
          <Option value="phdthesis">phdthesis</Option>
          <Option value="proceedings">proceedings</Option>
          <Option value="www">www</Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>;
  }
}

export default DocForm;
