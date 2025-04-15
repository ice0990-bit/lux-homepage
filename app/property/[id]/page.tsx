type Props = {
  params: {
    id: string;
  };
};

export default function PropertyDetail({ params }: Props) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">物件 ID：{params.id}</h1>
      {/* 這裡可以放詳細資料 */}
    </main>
  );
}
