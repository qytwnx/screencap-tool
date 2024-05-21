import { IRecording } from '@renderer/model/recording';
import { Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';

const History = () => {
  const [dataSource, setDataSource] = useState<Array<IRecording>>([]);
  // const [currentData, setCurrentData] = useState<IRecording>({});
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const columns: TableProps<IRecording>['columns'] = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '文件路径',
      dataIndex: 'filePath',
      key: 'filePath',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '文件类型',
      dataIndex: 'fileFormat',
      key: 'fileFormat',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      ellipsis: true,
      align: 'center'
    }
  ];

  const handleLoadDataSource = async (
    params: IRecording & { pageNumber: number; pageSize: number }
  ) => {
    const data = await window.api.recordingPage(params);
    setDataSource(data.records || []);
    setPageNumber(data.pageNumber || 1);
    setTotal(data.total || 0);
  };

  const handleTableChange: TableProps['onChange'] = (pagination) => {
    handleLoadDataSource({ pageNumber: pagination.current || 1, pageSize: 8 });
  };

  useEffect(() => {
    handleLoadDataSource({ pageNumber: 1, pageSize: 8 });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={'id'}
        bordered
        size="small"
        pagination={{
          pageSize: 8,
          current: pageNumber,
          total: total,
          hideOnSinglePage: true
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default History;
