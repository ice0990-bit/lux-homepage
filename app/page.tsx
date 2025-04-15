import Image from "next/image";

export default function Home() {
  const properties = [
    {
      id: 1,
      title: "NOVO 高級公寓",
      location: "吉隆坡",
      price: "1,500,000 MYR",
      image: "/images/NOVO.png",
    },
    {
      id: 2,
      title: "Setia Sky 住宅",
      location: "吉隆坡",
      price: "980,000 MYR",
      image: "/images/SETIA.png",
    },
    {
      id: 3,
      title: "Trion KL 服務公寓",
      location: "吉隆坡",
      price: "1,200,000 MYR",
      image: "/images/TRION.png",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">吉隆坡熱門物件</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={property.image}
              alt={property.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-lg font-bold text-blue-700 mt-2">
                {property.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
