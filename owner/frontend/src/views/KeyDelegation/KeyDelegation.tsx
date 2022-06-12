import { gql, useLazyQuery } from '@apollo/client';
import { Button, Card, Layout, PageHeader, Select, Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Option } = Select;

interface DelegateData {
  genConfig: string;
}

interface DelegateVars {
  set: string;
}

const DELEGATE = gql`
  query Query($set: String!) {
    genConfig(set: $set)
  }
`;

export function KeyDelegation() {
  const [set, setSet] = useState<string>('A');
  const [getDelegatedKey, { data }] = useLazyQuery<DelegateData, DelegateVars>(DELEGATE);

  const handleChange = (value: string) => {
    setSet(value);
  };

  const handleClick = () => {
    getDelegatedKey({
      variables: {
        set: set,
      },
    });
  };

  return (
    <Layout>
      <Content>
        <PageHeader title="生成配置" />
        <Space direction="vertical" size={'middle'} style={{ display: 'flex' }}>
          <Space style={{ display: 'flex', justifyContent: 'center' }}>
            <div>选择组</div>
            <Select defaultValue="A" style={{ width: 400 }} onChange={handleChange}>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
            <Button type="primary" style={{ width: 400 }} onClick={handleClick}>
              生成
            </Button>
          </Space>
          <Space style={{ display: 'flex', justifyContent: 'center' }}>
            {data && (
              <Card
                title="配置文件(由授权用户保存)"
                extra={
                  <CopyToClipboard text={data.genConfig}>
                    <a>复制</a>
                  </CopyToClipboard>
                }
                style={{ width: 700 }}
              >
                <p>{data.genConfig}</p>
              </Card>
            )}
          </Space>
        </Space>
      </Content>
    </Layout>
  );
}
