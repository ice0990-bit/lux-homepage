type Props = {
  params: { id: string }; // params 是一個直接可用的物件
};

export default async function PropertyDetail({ params }: Props) {
  const { id } = params; // 直接存取 id
  // 在這裡你可以使用 id 來 fetch 詳細資料，如果 fetch 是非同步的，才需要 await
  // 例如：
  // const property = await fetchPropertyDetails(id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">物件 ID：{id}</h1>
      {/* 可以在這裡顯示詳細資料 */}
    </main>
  );
}