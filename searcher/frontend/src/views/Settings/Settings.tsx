import { KeyOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/settings/key">密钥管理</Link>, '1', <KeyOutlined />),
];

export function Settings() {
  return (
    <Layout>
      <Sider style={{ background: '#fff' }}>
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
}
