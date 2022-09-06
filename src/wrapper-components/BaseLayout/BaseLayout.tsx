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
          <div className="fixed w-full h-[13rem] -z-10 bg-gradient-to-r from-cyan-500 to-primary-500" />
          <div className="fixed w-full h-[calc(100vh-13rem)] bg-slate-50 top-[13rem] -z-10" />
        </>
      )}
      <div
        className={`flex max-w-screen-xl m-auto px-6 pt-6 md:px-8 min-h-[100vh]`}
      >
        {withLeftNavigation && (
          <div className="min-w-0 hidden md:min-w-[220px] md:block">
            <LeftNavigation />
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default BaseLayout;
