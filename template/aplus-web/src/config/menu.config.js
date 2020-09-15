import { UsergroupAddOutlined, BankOutlined } from '@ant-design/icons';

const menuConfig = [
  {
    name: '群组管理',
    icon: UsergroupAddOutlined,
    children: [
      // {
      //   name: '我的群组',
      //   link: '/my-group',
      // },
      // {
      //   name: '搜索群组',
      //   link: '/search-group',
      // },
      {
        name: '我的群组',
        link: '/group',
      },
    ],
  }, {
    name: '文献管理',
    link: '/library',
    icon: BankOutlined,
  },
];

export default menuConfig;
