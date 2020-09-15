import { getSubbedGroup } from './service';

export default {
  namespace: 'mygroup',
  initial: {
    loading: false,
    myGroupPageInfo: {
      current: 1,
      pageSize: 10,
    },
    myGroupList: [],
  },

  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  // async action
  asyncs: {
    async getData(dispatch, getState) {
      const { myGroupPageInfo } = getState();
      const { current, pageSize } = myGroupPageInfo;
      try {
        dispatch('setData', { loading: true });
        const { rows, total } = await getSubbedGroup({ current, pageSize });
        dispatch('setData', { loading: false, myGroupPageInfo: { ...myGroupPageInfo, total }, myGroupList: rows });
      } catch (e) {
        console.log(e);
      }
    },
  },
  /**
   * 初始化请求
   * @param {Function} dispatch dispatch方法
   * @param {Function} getState 获取当前页面store
   * @param {Object} payload dispatch参数
   */
  async setup(dispatch, getState, payload) { // eslint-disable-line
    dispatch('getData');
  },
};
