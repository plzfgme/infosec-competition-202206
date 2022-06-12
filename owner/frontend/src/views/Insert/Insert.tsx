import { gql, useMutation } from '@apollo/client';
import { Button, DatePicker, Form, Input, Layout, Select } from 'antd';
import React from 'react';

const { Content } = Layout;
const { Option } = Select;

interface InsertData {
  insert: string;
}

interface Record {
  id: string;
  location: string;
  time: string;
  set: string;
}

interface InsertVars {
  records: Record[];
}

const INSERT = gql`
  # input Record {
  #   id: String!
  #   location: String!
  #   time: String!
  #   set: String
  # }
  mutation Mutation($records: [Record!]!) {
    insert(records: $records)
  }
`;

export function Insert() {
  const [insert, { data }] = useMutation<InsertData, InsertVars>(INSERT);

  const onFinish = (values: any) => {
    console.log(values);
    console.log(values.time.format());
    insert({
      variables: {
        records: [
          {
            id: values.id,
            location: values.location,
            time: values.time.format(),
            set: values.set,
          },
        ],
      },
    }).then(() => {
      console.log(data?.insert);
    });
  };

  return (
    <Layout>
      <Content>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: '80%', marginTop: 20 }}
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: '请输入ID!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="地点"
            name="location"
            rules={[{ required: true, message: '请输入地点!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="时间"
            name="time"
            rules={[{ required: true, message: '请输入时间!' }]}
          >
            <DatePicker showTime />
          </Form.Item>

          <Form.Item
            label="组"
            name="set"
            rules={[{ required: true, message: '请输入组!' }]}
          >
            <Select defaultValue="A" style={{ width: 400 }}>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
