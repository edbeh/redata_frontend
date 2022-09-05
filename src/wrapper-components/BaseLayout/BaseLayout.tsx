import { LeftNavigation } from "components";

interface BaseLayoutProps {
  withLeftNavigation?: boolean;
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  withLeftNavigation,
  children,
}) => {
  return (
    <>
      {withLeftNavigation && (
        <>
          <div className="fixed w-full h-[14rem] -z-10 bg-gradient-to-r from-cyan-500 to-primary-500" />
          <div className="fixed w-full h-[calc(100vh-14rem)] bg-slate-50 top-[14rem] -z-10" />
        </>
      )}
      <div className={`flex max-w-screen-xl m-auto pt-6 min-h-[100vh]`}>
        {withLeftNavigation && (
          <div className="w-[300px]">
            <LeftNavigation />
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default BaseLayout;
