import MyGroup from '../pages/my-group';
import Error404 from '../pages/404';
import Group from '../pages/group';
import Library from '../pages/library';
export default {
  myGroup: {
    route: '/my-group',
    entry: MyGroup,
  },
  group: {
    route: '/group',
    entry: Group,
    exact: true,
  },
  groupLibrary: {
    route: '/group/library/:groupId',
    entry: Library,
  },
  library: {
    route: '/library',
    entry: Library,
  },
  404: {
    route: '/404',
    entry: Error404,
  },
};
