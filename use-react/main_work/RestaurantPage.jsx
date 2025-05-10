import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function RestaurantPage() {
  return (
    <div className="flex flex-col">
      {/* รูปร้านอาหาร */}
      <div className="w-full h-60 md:h-80 overflow-hidden">
        <img
          src="/restaurant-banner.jpg" // ใส่ path รูปจริง
          alt="Restaurant Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* คอมเมนต์ */}
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">รีวิวจากลูกค้า</h2>

        {/* Comment 1 */}
        <Card className="shadow-sm">
          <CardContent className="flex gap-4 py-4">
            <Avatar>
              <AvatarImage src="/user1.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Jirawat D.</p>
              <p className="text-sm text-muted-foreground">
                อาหารอร่อยมาก บรรยากาศดี ราคาโอเคครับ
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Comment 2 */}
        <Card className="shadow-sm">
          <CardContent className="flex gap-4 py-4">
            <Avatar>
              <AvatarImage src="/user2.jpg" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Manee M.</p>
              <p className="text-sm text-muted-foreground">
                บริการดี แต่รออาหารนานนิดนึงค่ะ 😅
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
