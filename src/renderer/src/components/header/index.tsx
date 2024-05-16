import {
  CloseOutlined,
  GithubOutlined,
  MinusOutlined
} from '@ant-design/icons';
import './index.less';
const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-container-move"></div>
        <div
          className="flex-shrink-0 mr-5 flex items-center gap-2 text-xl"
          onClick={() => window.api.openUrl('https://github.com/qytwnx')}
        >
          <GithubOutlined className="cursor-pointer" />
          <div className="w-0.5 h-4 bg-gray-400"></div>
          <div className="flex-shrink-0 flex gap-2">
            {/* active:bg-gray-300 */}
            <MinusOutlined
              className="cursor-pointer rounded-full p-1 bg-none hover:bg-gray-200 active:bg-gray-300"
              onClick={() => window.api.customWindowMinimize()}
            />
            <CloseOutlined
              className="cursor-pointer rounded-full p-1 bg-none hover:bg-gray-200 active:bg-gray-300"
              onClick={() => window.api.customWindowClose()}
            />
            {/* <ReduceOne className="cursor-pointer hover:text-blue-600" /> */}
            {/* <CloseOne className="cursor-pointer hover:text-red-600" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
