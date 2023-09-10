interface AdminCardProps {
  title: string;
  children: React.ReactNode;
}

const AdminCard = ({ title, children }: AdminCardProps) => {
  return (
    <div className="p-6 rounded bg-white shadow-lg w-full">
      <p className="text-[12px] tracking-wider font-semibold uppercase">
        {title}
      </p>
      <div className="h-[1px] bg-borderGray opacity-20 my-3"></div>
      <div className="mt-4 space-y-4 sm:space-y-3">{children}</div>
    </div>
  );
};

export default AdminCard;
