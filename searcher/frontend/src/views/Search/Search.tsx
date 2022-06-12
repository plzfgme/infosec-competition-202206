import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Button, DatePicker, Input, Layout, PageHeader, Space, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import type { ColumnsType } from 'antd/lib/table';
import { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface.d';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

const SEARCH = gql`
  query Query($id: String!, $timeA: String!, $timeB: String!) {
    searchA(id: $id, timeA: $timeA, timeB: $timeB) {
      location
      time
    }
  }
`;

interface SetData {
  set: string;
}

const SET = gql`
  query Query {
    set
  }
`;

interface SearchResult {
  id: string;
}

const columns: ColumnsType<SearchResult> = [
  {
    title: '地点',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
];

export function Search() {
  const [id, setID] = useState<string>();
  const [range, setRange] = useState<RangeValue<Moment>>();
  const [getSearchResult, { data }] = useLazyQuery(SEARCH);
  const { data: set } = useQuery<SetData>(SET);

  const handleLocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value);
    console.log(id);
  };

  const handleRangeChange = (dates: RangeValue<Moment>) => {
    setRange(dates);
    console.log(range?.[0]);
    console.log(range?.[1]);
  };

  const handleSearchClick = () => {
    console.log(id);
    console.log(range?.[0]);
    console.log(range?.[1]);
    getSearchResult({
      variables: {
        id: id,
        timeA: range?.[0]?.format(),
        timeB: range?.[1]?.format(),
      },
    }).then();
  };

  return (
    <Layout>
      <Content>
        <PageHeader
          title="查询"
          extra={[
            <div key={1} style={{ color: 'green' }}>
              允许查询组{set?.set}成员的数据
            </div>,
          ]}
        />
        <Space direction="vertical" size={'middle'} style={{ display: 'flex' }}>
          <Space style={{ display: 'flex', justifyContent: 'center' }}>
            <div>ID</div>
            <Input
              style={{ width: '700px' }}
              onChange={(e) => {
                handleLocChange(e);
              }}
            />
          </Space>

          <Space style={{ display: 'flex', justifyContent: 'center' }}>
            <div>时间范围</div>
            <RangePicker
              style={{ width: '600px' }}
              showTime
              onChange={(dates) => handleRangeChange(dates)}
            />
            <Button type="primary" onClick={handleSearchClick}>
              查询
            </Button>
          </Space>
          <Space style={{ display: 'flex', justifyContent: 'center' }}>
            {data && (
              <Table
                style={{ width: '700px' }}
                columns={columns}
                dataSource={data.searchA}
              />
            )}
          </Space>
        </Space>
      </Content>
    </Layout>
  );
}
