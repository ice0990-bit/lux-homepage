'use client';

import { properties } from '@/src/data/properties';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    return <div className="p-8 text-red-500">找不到此房產。</div>;
  }

  const images = property.images;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link href="/" className="text-sm text-blue-500 hover:underline">← 返回首頁</Link>

      {/* 輪播區 */}
      <div className="mt-6">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index}>
              <Image
                src={src}
                alt={`${property.title} 圖片${index + 1}`}
                width={960}
                height={540}
                className="rounded-lg shadow object-cover w-full h-[480px]"
              />
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="text-3xl font-bold mt-6">{property.title}</h1>
      <p className="text-gray-500 mb-4">
        {property.location}｜{property.rooms}｜{property.price}
      </p>

      <div className="text-sm text-gray-700 leading-relaxed">
        <p>
          這間房位於 <strong>{property.location}</strong>，擁有絕佳景觀與高端空間配置，
          是專為注重品味的您所打造的理想之選。
        </p>
        <p className="mt-4">如需安排賞屋，請洽 LUX 專屬顧問團隊。</p>
      </div>

      {/* 💬 留言表單 */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-lg font-bold mb-4">留言洽詢</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('感謝您的留言，我們將盡快與您聯繫。');
          }}
          className="space-y-4 max-w-lg"
        >
          <input
            type="text"
            placeholder="姓名"
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="留言內容"
            required
            className="w-full border px-4 py-2 rounded h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            送出留言
          </button>
        </form>
      </div>
    </div>
  );
}
