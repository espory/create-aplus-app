import fetch from '../../common/fetch';


export function getDocsBySearch({ title = '', current, pageSize }) {
  return fetch({
    url: '/library/getDocsBySearch',
    params: {
      title,
      current: current - 1,
      pageSize,
    },
  });
}

export function getDocsByGroupId({ groupId, current, pageSize }) {
  return fetch({
    url: '/library/getDocsByGroupId',
    params: {
      groupId,
      current: current - 1,
      pageSize,
    },
  });
}

export function addDocs2Group({ groupId, docIds }) {
  return fetch({
    url: '/group/addDocs2Group',
    method: 'POST',
    data: {
      groupId,
      docIds,
    },
  });
}

export function removeDocsFromGroup({ groupId, docIds }) {
  return fetch({
    url: '/group/removeDocsFromGroup',
    method: 'POST',
    data: {
      groupId,
      docIds,
    },
  });
}

export function update({ id, authors, editors, type, year, title }) {
  return fetch({
    url: '/library/update',
    method: 'POST',
    data: {
      docId: id,
      authors,
      editors,
      type,
      year,
      title,
    },
  });
}

export function create({ authors, editors, type, year, title }) {
  return fetch({
    url: '/library/create',
    method: 'POST',
    data: {
      authors,
      editors,
      type,
      year,
      title,
    },
  });
}

