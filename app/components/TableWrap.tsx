interface TableWrapProps {
  children: React.ReactNode;
}

export default function TableWrap({ children }: TableWrapProps) {
  return (
    <div className="overflow-x-auto border border-[#e4e2de] rounded-xl bg-white">
      <table className="w-full border-collapse text-sm min-w-[360px]">
        {children}
      </table>
    </div>
  );
}
