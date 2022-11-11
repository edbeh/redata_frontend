interface WindowProps {
  noPadding?: boolean;
  children: React.ReactNode;
}

const Window = ({ noPadding = false, children }: WindowProps) => {
  return (
    <div className="relative flex flex-col w-full bg-white border-[1px] border-gray-200 rounded-xl">
      <div className="flex space-x-2 border-b-[1px] border-b-gray-100 p-4 pb-3">
        <div className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] bg-macosRed rounded-full" />
        <div className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] bg-macosYellow rounded-full" />
        <div className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] bg-macosGreen rounded-full" />
      </div>
      <div className={`${noPadding ? "p-0" : "p-6"}`}>{children}</div>
    </div>
  );
};

export default Window;
