interface BaseLayoutProps {
  withTopPadding?: boolean;
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  withTopPadding,
  children,
}) => {
  return (
    <div
      className={`flex max-w-screen-xl m-auto ${withTopPadding ? "pt-6" : ""}`}
    >
      {children}
    </div>
  );
};

export default BaseLayout;
