import LeftNavigation from "../LeftNavigation";

interface MobileLeftNavigationProps {
  isMobileNavVisible: boolean;
  setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileLeftNavigation = ({
  isMobileNavVisible,
  setIsMobileNavVisible,
}: MobileLeftNavigationProps) => {
  return (
    <div
      className={`transition-all duration-500 z-50 ${
        isMobileNavVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={() => setIsMobileNavVisible(false)}
        className={`w-[100vw] top-0 left-0 h-[100vh] fixed opacity-80 bg-black z-40 ${
          isMobileNavVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      />

      <div
        className={`fixed transition-all duration-500 z-50 ${
          isMobileNavVisible ? "left-5" : "-left-20"
        }`}
      >
        <LeftNavigation />
      </div>
    </div>
  );
};

export default MobileLeftNavigation;
