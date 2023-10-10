interface AdminRowProps {
  title: string;
  value: string | undefined;
}

const AdminRow = ({ title, value }: AdminRowProps) => {
  return (
    <div className="flex flex-col sm:flex-row text-[13px]">
      <p className="font-semibold w-full sm:max-w-[200px]">{title}</p>
      <p className="overflow-hidden break-words">{value || "-"}</p>
    </div>
  );
};

export default AdminRow;
