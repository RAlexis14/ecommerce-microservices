type Props = {
  message: string;
  type: "success" | "error";
};

export default function Toast({ message, type }: Props) {
  const bg = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 text-white rounded shadow z-50 ${bg}`}>
      {message}
    </div>
  );
}
