export type IEnumType<T extends string | number | symbol> = {
  [key in T]: {
    text: string;
    status?: 'success' | 'processing' | 'error' | 'default' | 'warning';
  };
};

export type IMenuItem = {
  id?: string;
  key?: string;
  icon?: React.ReactNode;
  name?: string;
};

export type ISetting = {
  videoPath?: string;
  fileFormat?: string;
  resolution?: string;
  frameRate?: number;
};

export type IOptions<T> = {
  label?: string;
  value?: T;
};

export type IPage<T> = {
  pageNumber: number;
  pageSize: number;
  records: Array<T>;
  total: number;
};
