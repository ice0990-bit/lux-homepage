'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { properties } from '@/src/data/properties';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';
import Image from 'next/image';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function MapPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">地圖找房</h1>

      <MapContainer
        center={[15, 110]} // 地圖中心移中一點
        zoom={5}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
        />

        {properties.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup maxWidth={280}>
              <div className="text-sm space-y-2">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  width={240}
                  height={160}
                  className="rounded object-cover w-full h-[140px]"
                />
                <div>
                  <strong>{p.title}</strong><br />
                  {p.location}｜{p.rooms}｜{p.price}
                </div>
                <Link href={`/property/${p.id}`} className="text-blue-600 underline">
                  查看詳情
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
