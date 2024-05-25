type IEnumType<T extends string | number | symbol> = {
  [key in T]: {
    text: string;
    status?: 'success' | 'processing' | 'error' | 'default' | 'warning';
  };
};

type IMenuItem = {
  id?: string;
  key?: string;
  icon?: React.ReactNode;
  name?: string;
};

type ISetting = {
  videoPath?: string;
  fileFormat?: string;
  resolution?: string;
  frameRate?: number;
};

type IOptions<T> = {
  label?: string;
  value?: T;
};

type IPage<T> = {
  pageNumber: number;
  pageSize: number;
  records: Array<T>;
  total: number;
};
