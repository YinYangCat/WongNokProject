"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

export default function RestaurantPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <Link href="/main" className="flex items-center space-x-2">
              <Image src="/WongNok_Logo.png" alt="WongNok Logo" width={32} height={32} />
              <h3 className="text-2xl font-bold">WongNok</h3>
            </Link>

            {/* Search */}
            <div className="flex-1 mx-6 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for restaurants, menu items, etc."
                  className="w-full border border-gray-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.65 6.15z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-700 hover:text-orange-500 text-sm font-medium">Restaurants</Link>
              <Link href="#" className="text-gray-700 hover:text-orange-500 text-sm font-medium">Profile</Link>
              <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full transition-colors">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner */}
      <div className="w-full h-64 overflow-hidden relative">
        <Image
          src="/เคบับบ้านคุณตา.jpg"
          alt="Restaurant Banner"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-6 py-4">
          <h1 className="text-3xl font-bold">สเต็ก & เคบ้บบ้านคุณตา</h1>
          <p className="text-sm">★ 4.5 (200 reviews) • Thai Food • Bangkok</p>
        </div>
      </div>

      {/* Restaurant Info */}
      <section className="max-w-5xl mx-auto px-4 py-8">

        <div className="bg-white rounded-lg shadow p-4 flex items-start space-x-4 mb-6">
          <Image src="/Map-locate.png" alt="Map" width={112} height={112} className="rounded object-cover" />
          <div className="flex-1">
            <p className="text-xl text-gray-800 mb-2">
              1, ถนน Pracha Uthit 32, Khwaeng Bang Mot, Khet Thung Khru, Krung Thep Maha Nakhon 10140, Thailand
            </p>
            <p className="text-xl text-gray-800 mt-2">
              <span className="font-semibold">เบอร์โทร :</span> 065 478 2351
              <span className="inline-block ml-2 text-gray-500">📞</span>
            </p>
          </div>
        </div>

        {/* Recommended Menu */}
        <h2 className="text-2xl font-semibold mb-2">Recommended Menu</h2>
        <p className="text-gray-700 mb-4">Steak</p>

        {/* Reviews */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-xl font-semibold mb-4">รีวิวจากลูกค้า</h2>

          {/* Comment 1 */}
          <Card className="shadow mb-4">
            <CardContent className="flex gap-4 py-4">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/40?img=1" />
                <AvatarFallback>NK</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">Nok123</p>
                <p className="text-sm text-gray-500">★ 5 • 2 days ago</p>
                <p className="text-gray-700 mt-2">รสชาติอร่อยมากก บริการดี ร้านสะอาด แนะนำเลย!</p>
              </div>
            </CardContent>
          </Card>

          {/* Comment 2 */}
          <Card className="shadow mb-4">
            <CardContent className="flex gap-4 py-4">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/40?img=2" />
                <AvatarFallback>FB</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">FoodieBoy</p>
                <p className="text-sm text-gray-500">★ 4 • 5 days ago</p>
                <p className="text-gray-700 mt-2">Pad Thai ดีงามมาก แต่รอนานนิดนึง</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
