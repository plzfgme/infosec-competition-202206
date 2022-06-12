import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React from 'react';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import { Search } from '@/views/Search/Search';
// import { KeySettings } from '@/views/Settings/KeySettings/KeySettings';
// import { Settings } from '@/views/Settings/Settings';

const { Header } = Layout;

const navItems: MenuProps['items'] = [
  // {
  //   key: 'settings',
  //   label: <Link to={'/settings'}>设置</Link>,
  // },
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
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Layout>
    </HashRouter>
  );
}

export default App;
