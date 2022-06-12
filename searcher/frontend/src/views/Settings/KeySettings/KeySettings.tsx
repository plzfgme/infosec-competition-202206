import { Button, Collapse, Input, Layout, PageHeader } from 'antd';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { add, del, selectKeys } from '@/store/keys/keysSlice';

const { Panel } = Collapse;
const { Content } = Layout;
const { TextArea } = Input;

export function KeySettings() {
  const dispatch = useAppDispatch();
  const keys = useAppSelector(selectKeys);
  const [newKey, setNewKey] = useState('');

  const handleNewKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewKey(e.target.value);
  };

  const addKey = () => {
    dispatch(add(newKey));
    setNewKey('');
  };

  const delKey = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(del(index));
  };

  return (
    <Layout>
      <Content style={{ margin: '0 16px' }}>
        <PageHeader title="密钥管理" />
        <Input.Group compact style={{ textAlign: 'center', margin: '10px' }}>
          <Input
            style={{ width: '90%', textAlign: 'left' }}
            value={newKey}
            onChange={(e) => {
              handleNewKeyChange(e);
            }}
          />
          <Button type="primary" onClick={addKey}>
            添加
          </Button>
        </Input.Group>
        <Collapse accordion>
          {keys.map((key, index) => {
            return (
              <Panel
                header={'key' + index.toString()}
                key={index}
                extra={
                  <Button danger onClick={(e) => delKey(index, e)}>
                    删除
                  </Button>
                }
              >
                <TextArea value={key} />
              </Panel>
            );
          })}
        </Collapse>
      </Content>
    </Layout>
  );
}
