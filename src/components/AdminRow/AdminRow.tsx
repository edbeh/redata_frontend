interface AdminRowProps {
  title: string;
  value: string | undefined;
}

const AdminRow = ({ title, value }: AdminRowProps) => {
  return (
    <div className="flex flex-col sm:flex-row text-[12px]">
      <p className="font-semibold w-full sm:max-w-[200px]">{title}</p>
      <p>{value || "-"}</p>
    </div>
  );
};

export default AdminRow;
