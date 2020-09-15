import { PureComponent } from 'React';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getStore } from '../../model';

export default (option = {}) => InnerComponent => {
  const {
    store: config,
    autoReset = true,
  } = option;

  const store = getStore();
  const model = store.addModel(config);
  class OuterComponent extends PureComponent {

    componentWillMount() {
      const { dispatch } = this.props;
      dispatch('_setup');
    }

    componentWillUnmount() {
      if (autoReset) {
        const { dispatch } = this.props;
        dispatch('_reinit');
      }
    }

    render() {
      const { loading = false } = this.props;
      return (<Spin tip="loading..." spinning={loading}>
        <InnerComponent {...this.props} />
      </Spin>);
    }
  }

  const Component = connect(
    () => model.getState(),
    null,
    (stateProps, dispatchProps, ownProps) =>
      Object.assign({}, ownProps, stateProps, { dispatch: model.dispatch })
  )(OuterComponent);

  return Component;
};
