type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetail({ params }: Props) {
  const { id } = await params;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">物件 ID：{id}</h1>
      {/* 可以在這裡 fetch 詳細資料 */}
    </main>
  );
}
