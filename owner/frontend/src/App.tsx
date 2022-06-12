import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React from 'react';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import { Insert } from '@/views/Insert/Insert';
import { KeyDelegation } from '@/views/KeyDelegation/KeyDelegation';
import { Search } from '@/views/Search/Search';

const { Header } = Layout;

const navItems: MenuProps['items'] = [
  {
    key: 'delegate',
    label: <Link to={'/delegate'}>生成用户配置</Link>,
  },
  {
    key: 'insert',
    label: <Link to={'/insert'}>上传</Link>,
  },
  {
    key: 'search',
    label: <Link to={'/search'}>查询</Link>,
  },
];

function App() {
  return (
    <HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={navItems}
          />
        </Header>
        <Layout style={{ marginTop: 64 }}>
          <Routes>
            <Route index element={<Navigate to="/search" replace />} />
            {/* <Route path="/settings" element={<Settings />}>
              <Route index element={<Navigate to="key" replace />} />
              <Route path="key" element={<KeySettings />} />
            </Route> */}
            <Route path="/insert" element={<Insert />} />
            <Route path="/search" element={<Search />} />
            <Route path="/delegate" element={<KeyDelegation />} />
          </Routes>
        </Layout>
      </Layout>
    </HashRouter>
  );
}

export default App;
