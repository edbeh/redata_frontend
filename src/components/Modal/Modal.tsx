import { ImgXMarkOutline } from "assets";

interface ModalProps {
  title?: string;
  content: React.ReactNode;
  isVisible: boolean;
  onDismiss: () => void;
}

const Modal = ({ title, content, isVisible, onDismiss }: ModalProps) => {
  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={onDismiss}
        className={`w-[100vw] top-0 left-0 h-[100vh] fixed opacity-50 bg-black z-40 ${
          isVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      />
      <div
        className={`flex flex-col duration-500 left-1/2 top-1/2 -translate-x-1/2 transition-all ${
          isVisible
            ? "-translate-y-1/2 opacity-100"
            : "translate-y-full opacity-0"
        } p-8 fixed m-0 min-w-[50vw] w-full md:w-auto max-h-[90vh] max-w-[90vw] md:max-w-[80vw] rounded-md z-50 bg-white overflow-scroll`}
      >
        {title && (
          <h2 className="mb-2 text-3xl font-bold text-center">{title}</h2>
        )}
        <ImgXMarkOutline
          onClick={onDismiss}
          width={25}
          height={25}
          className="fixed cursor-pointer top-5 right-5"
        />
        {content}
      </div>
    </div>
  );
};

export default Modal;
