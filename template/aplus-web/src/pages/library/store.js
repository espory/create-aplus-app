import { getDocsBySearch, getDocsByGroupId, update, create, addDocs2Group, removeDocsFromGroup } from './service';
import { message } from 'antd';

export default {
  namespace: 'library',
  initial: {
    loading: false,
    pageInfo: {
      current: 1,
      pageSize: 10,
    },
    libraryList: [],
    selectable: false,
    selectedRowKeys: [],
    selectedRows: [],
    isGroup: false,
    mode: 'show', // show delete add,
    showUpdate: false,
    showAdd: false,
    tuple: {},
    groupId: -1,
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
    async searchDoc(dispatch, getState, payload) {
      const { pageInfo } = getState();
      const { title = '' } = payload;
      const { current, pageSize } = { ...pageInfo, ...payload };
      try {
        dispatch('setData', { loading: true });
        let { rows, total } = await getDocsBySearch({ current, pageSize, title });
        rows = rows.map(row => {
          return {
            ...row,
            key: row.id,
          };
        });
        dispatch('setData', { loading: false, pageInfo: { current, pageSize, total, title }, libraryList: rows });
      } catch (e) {
        console.log(e);
      }
    },
    async pageChange(dispatch, getState, payload) {
      if (payload.title) { dispatch('searchDoc', payload); }
      if (payload.groupId) { dispatch('groupDoc', payload); }
    },
    async groupDoc(dispatch, getState, payload) {
      const { pageInfo } = getState();
      if (!payload.groupId) {
        console.log('groupDoc: no groupId');
        return;
      }
      const { groupId } = payload;
      const { current, pageSize } = { ...pageInfo, ...payload };
      try {
        dispatch('setData', { loading: true });
        let { rows, total } = await getDocsByGroupId({ current, pageSize, groupId });
        rows = rows.map(row => {
          return {
            key: row.id,
            ...row,
          };
        });
        dispatch('setData', { loading: false, pageInfo: { current, pageSize, total, groupId }, libraryList: rows });
      } catch (e) {
        console.log(e);
      }
    },
    async updateDoc(dispatch, getState, payload) {
      try {
        dispatch('setData', { loading: true });
        await update(payload);
        message.success('修改成功');
        const { libraryList } = getState();
        payload.authors = payload.authors.join(',');
        payload.editors = payload.editors.join(',');
        libraryList.forEach((item, index) => {
          if (item.id === payload.id) {
            payload.key = payload.id;
            libraryList[index] = payload;
          }
        });
        dispatch('setData', { loading: false, libraryList: libraryList.map(item => {
          return item;
        }), showUpdate: false, tuple: null });
      } catch (e) {
        console.log(e);
      }
    },
    async createDoc(dispatch, getState, payload) {
      try {
        dispatch('setData', { loading: true });
        await create(payload);
        message.success('创建成功');
        dispatch('setData', { loading: false, showAdd: false, tuple: null });
      } catch (e) {
        console.log(e);
      }
    },
    async createAndAddDoc(dispatch, getState, payload) {
      try {
        const { libraryList } = getState();
        dispatch('setData', { loading: true });
        const response = await create(payload);
        message.success('创建成功');
        if (response.id) {
          await addDocs2Group({ groupId: payload.groupId, docIds: [ response.id ] });
          message.success('添加成功');
        }
        const list = libraryList.slice();
        response.key = response.id;
        list.push(response);
        dispatch('setData', { loading: false, libraryList: list, showAdd: false, tuple: null });
      } catch (e) {
        console.log(e);
      }
    },
    async addDocs(dispatch, getState, payload) {
      try {
        const { groupId } = getState();
        dispatch('setData', { loading: true });
        await addDocs2Group({ ...payload, groupId });
        message.success('添加成功');
        dispatch('setData', { loading: false, mode: 'delete' });
      } catch (e) {
        console.log(e);
      }
    },
    async removeDocs(dispatch, getState, payload) {
      try {
        const { groupId, libraryList } = getState();
        dispatch('setData', { loading: true });
        await removeDocsFromGroup({ ...payload, groupId });
        message.success('移除成功');
        const list = [];
        libraryList.forEach(item => {
          if (payload.docIds.indexOf(item.id) === -1) { list.push(item); }
        });
        dispatch('setData', { loading: false, libraryList: list });
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
  },
};
