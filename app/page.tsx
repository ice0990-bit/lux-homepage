'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { properties } from '@/src/data/properties'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Slider from 'react-slick'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import AIChat from '@/components/AIChat'

// Leaflet 修正圖示路徑
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: () => void })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
})

export default function HomePage() {
  const [keyword, setKeyword] = useState('')
  const [selectedType, setSelectedType] = useState('全部類型')
  const [activeCountry, setActiveCountry] = useState('全部地區')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoggedIn(localStorage.getItem('lux-logged-in') === 'true')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('lux-logged-in')
    window.location.href = '/login'
  }

  const filteredProperties = properties.filter((p) => {
    const matchKeyword =
      keyword === '' || p.title.includes(keyword) || p.location.includes(keyword)

    const matchType = selectedType === '全部類型' || p.type === selectedType

    const matchCountry = activeCountry === '全部地區' || p.location === activeCountry

    return matchKeyword && matchType && matchCountry
  })

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <div className="bg-white text-black relative">
      {/* 🏠 導覽列 */}
      <header className="flex justify-between items-center px-8 py-4 border-b">
  <div className="flex items-center gap-2">
    <div className="text-2xl font-serif font-bold tracking-wide">L∪X</div>
    <Image
      src="/images/ai-global-logo.png"
      alt="AI 國際地產平台"
      width={90}
      height={24}
      className="h-6 w-auto"
    />
  </div>
        <nav className="space-x-6 text-base text-gray-600">
          {!loggedIn ? (
            <>
              <Link href="/">找房</Link>
              <Link href="/consultants">顧問</Link>
              <Link href="/about">關於我們</Link>
              <Link href="/login">登入</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">顧問後台</Link>
              <button onClick={handleLogout} className="hover:underline">
                登出
              </button>
            </>
          )}
        </nav>
      </header>

      {/* 🖼️ Banner 區塊 */}
      <section className="relative w-full h-[300px]">
  <Image
    src="/lux-banner.jpg"
    alt="LUX Banner"
    fill
    priority
    className="object-cover brightness-75"
  />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
    <h1 className="text-3xl font-serif mb-2">選擇 LUX，選擇品味生活</h1>
    <p className="text-xs">從信義到港島，LUX 幫你找到專屬的品味住所。</p>
  </div>
</section>

            {/* 🔥 主打房產推薦 + TikTok 區塊 */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* 主打房產輪播（2 欄） */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-6">主打房產推薦</h2>
            <Slider {...bannerSettings}>
              {properties.slice(0, 3).map((item) => (
                <div key={item.id} className="relative w-full h-[400px]">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 bg-black/60 text-white p-4 w-full">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm">
                      {item.location}｜{item.rooms}｜{item.price}
                    </p>
                    <Link href={`/property/${item.id}`} className="text-sm underline mt-2 inline-block">
                      查看詳情 →
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* TikTok 熱門影片（1 欄） */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">熱門短影片推薦</h2>
            <p className="text-gray-600 text-sm">探索更多房地產相關短影音故事。</p>
            <iframe
              className="w-full h-[400px] rounded-lg border"
              src="https://www.tiktok.com/embed/v2/7486338155478519047"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 🔍 搜尋功能 */}
      <section className="bg-gray-50 py-6 border-y">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4">
          <select
            className="border px-4 py-2 rounded text-base"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option>全部類型</option>
            <option>豪宅</option>
            <option>公寓</option>
            <option>商辦</option>
          </select>
          <input
            type="text"
            placeholder="輸入地點、社區、關鍵字"
            className="flex-1 border px-4 py-2 rounded text-base"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="bg-black text-white px-4 py-2 rounded text-base">搜尋</button>
        </div>
      </section>

      {/* 📍 Tabs 地區分類 */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-4 text-base font-medium">
          <button onClick={() => { setActiveCountry('台北市'); setSelectedType('豪宅'); }}
            className={`px-4 py-2 rounded-full ${activeCountry === '台北市' && selectedType === '豪宅' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-black hover:text-white'}`}>
            台灣豪宅
          </button>
          <button onClick={() => { setActiveCountry('吉隆坡'); setSelectedType('全部類型'); }}
            className={`px-4 py-2 rounded-full ${activeCountry === '吉隆坡' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-black hover:text-white'}`}>
            馬來西亞吉隆坡
          </button>
          <button onClick={() => { setActiveCountry('泰國曼谷'); setSelectedType('全部類型'); }}
            className={`px-4 py-2 rounded-full ${activeCountry === '泰國曼谷' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-black hover:text-white'}`}>
            泰國曼谷
          </button>
          <button onClick={() => { setActiveCountry('全部地區'); setSelectedType('全部類型'); }}
            className={`px-4 py-2 rounded-full ${activeCountry === '全部地區' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-black hover:text-white'}`}>
            全部地區
          </button>
        </div>
      </section>

      {/* 🏡 房產卡片清單 */}
      <section className="p-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4">精選房產</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((p) => (
            <Link key={p.id} href={`/property/${p.id}`}>
              <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-gray-500 text-sm">{p.location}｜{p.rooms}｜{p.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🤖 AI 房產助理 */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <AIChat />
      </section>

      {/* 🗺️ 地圖總覽 */}
      <section className="p-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4">地圖總覽</h2>
        <MapContainer center={[15, 110]} zoom={5} style={{ height: '400px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {properties.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <strong>{p.title}</strong><br />
                {p.location}｜{p.rooms}｜{p.price}<br />
                <Link href={`/property/${p.id}`} className="text-blue-600 underline">
                  查看詳情
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>

      {/* 👩‍💼 顧問表列區塊 */}
      <section className="p-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-6">顧問團隊</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
          <div className="text-center">
            <Image
              src="/images/consultant-us.png"
              alt="美國紐約顧問"
              width={300}
              height={400}
              className="mx-auto rounded-lg object-contain h-[400px]"
            />
            <p className="mt-2 font-semibold">美國紐約顧問</p>
            <p className="text-sm text-gray-500">QR code</p>
          </div>
          <div className="text-center">
            <Image
              src="/images/consultant-sea.png"
              alt="東南亞顧問"
              width={300}
              height={400}
              className="mx-auto rounded-lg object-contain h-[400px]"
            />
            <p className="mt-2 font-semibold">東南亞顧問</p>
            <p className="text-sm text-gray-500">QR code</p>
          </div>
        </div>
      </section>

      {/* 🤖 AI 小助手按鈕 */}
      <button
        onClick={() => alert('👋 我是 LUX 小助手，有任何房產問題歡迎發問！')}
        className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        💬 AI 小助手
      </button>

      <footer className="text-center text-base text-gray-500 py-6 border-t mt-12">
        &copy; {new Date().getFullYear()} LUX REALTORS 墅選．All rights reserved.
        <div className="mt-6">
          <Link href="https://www.facebook.com/TIREA.TW" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/association.png"
              alt="台灣國際不動產交流協會"
              width={300}
              height={80}
              className="mx-auto hover:opacity-80 transition"
            />
          </Link>
        </div>
      </footer>
    </div>
  );
}
