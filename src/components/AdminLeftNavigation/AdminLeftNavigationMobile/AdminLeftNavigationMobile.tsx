import LeftNavigation from "../AdminLeftNavigation";

interface AdminLeftNavigationMobileProps {
  isMobileNavVisible: boolean;
  setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminLeftNavigationMobile = ({
  isMobileNavVisible,
  setIsMobileNavVisible,
}: AdminLeftNavigationMobileProps) => {
  return (
    <div
      className={`z-50 transition-all duration-500 ${
        isMobileNavVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={() => setIsMobileNavVisible(false)}
        className={`fixed top-0 left-0 z-40 h-[100vh] w-[100vw] bg-slate-500 opacity-80 ${
          isMobileNavVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      />

      <div
        className={`fixed z-50 h-full transition-all duration-500 ${
          isMobileNavVisible ? "left-0" : "-left-[250px]"
        }`}
      >
        <LeftNavigation />
      </div>
    </div>
  );
};

export default AdminLeftNavigationMobile;
