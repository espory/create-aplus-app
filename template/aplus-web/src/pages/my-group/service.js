import fetch from '../../common/fetch';

export function getSubbedGroup({ current, pageSize }) {
  return fetch({
    url: '/group/getSubbedGroup',
    params: {
      current: current - 1,
      pageSize,
    },
  });
}
