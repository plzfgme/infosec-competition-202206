import { gql, useLazyQuery } from '@apollo/client';
import { Button, DatePicker, Input, Layout, PageHeader, Space, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import type { ColumnsType } from 'antd/lib/table';
import { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface.d';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

const SEARCH = gql`
  query Query($id: String!, $timeA: String!, $timeB: String!) {
    searchB(location: $id, timeA: $timeA, timeB: $timeB) {
      id
    }
  }
`;

interface SearchResult {
  id: string;
}

const columns: ColumnsType<SearchResult> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
];

export function Search() {
  const [loc, setLoc] = useState<string>();
  const [range, setRange] = useState<RangeValue<Moment>>();
  const [getSearchResult, { data }] = useLazyQuery(SEARCH);

  const handleLocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoc(e.target.value);
    console.log(loc);
  };

  const handleRangeChange = (dates: RangeValue<Moment>) => {
    setRange(dates);
    console.log(range?.[0]);
    console.log(range?.[1]);
  };

  const handleSearchClick = () => {
    console.log(loc);
    console.log(range?.[0]);
    console.log(range?.[1]);
    getSearchResult({
      variables: {
        id: loc,
        timeA: range?.[0]?.format(),
        timeB: range?.[1]?.format(),
      },
    }).then();
    console.log(data?.at(0));
  };

  return (
    <Layout>
      <Content>
        <PageHeader title="查询" />
        <Space direction="vertical" size={'middle'} style={{ display: 'flex' }}>
          <Space style={{ display: 'flex', justifyContent: 'center' }}>
            <div>地点</div>
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
                dataSource={data.searchB}
              />
            )}
          </Space>
        </Space>
      </Content>
    </Layout>
  );
}
