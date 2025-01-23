import { Button, Link, Section, Text, Img, Hr } from '@react-email/components'
import { Base } from './base'

export default function EmailTemplate() {
    return (
        <div className="w-full font-sans">
            {/* Header Section */}
            <div className="relative bg-[#FCF6EE] p-8 text-white">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1571795184552-5f1df723de54?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            }}
          >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="relative z-10">
                <h1 className="text-4xl font-bold tracking-wider text-center mb-2">FRONTLINE MILITARY</h1>
                <h2 className="text-2xl font-bold text-center mb-4">MONTHLY NEWSLETTER</h2>
                <p className="text-xl text-center text-[#B0B5BF]">JANUARY 2025</p>
            </div>
        </div>
  
    <div className="p-8 bg-[#2B4570] text-[#8c0313]">
        <h3 className="text-2xl font-bold mb-6 tracking-wide text-white">NEW ARRIVALS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FCF6EE] p-4 rounded-lg shadow border border-black">
                <img
                    src="https://www.frontlinemilitary.co.uk/image/cache/catalog/BAGS/HAWG%20CAMELBAK-500x500.jpg"
                    alt="CamelBak H.A.W.G."
                    className="w-full h-48 object-cover mb-4 rounded"
                />
                <h4 className="text-lg font-semibold text-[#8c0313]">CamelBak H.A.W.G.</h4>
                <p className="text-[#B0B5BF]">Tactical Hydration Pack - Multicam</p>
                <a
                    href="https://www.frontlinemilitary.co.uk/camelbak-hawg-multicam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-[#8c0313] text-white px-6 py-2 rounded hover:bg-opacity-90 inline-block"
                >
                    Shop Now
                </a>
            </div>
            <div className="bg-[#FCF6EE] p-4 rounded-lg shadow border border-black">
                <img
                    src="https://www.frontlinemilitary.co.uk/image/cache/catalog/products/altberg/altberg-sneeker-photo-520x520.jpg"
                    alt="Altberg Sneeker Microlight"
                    className="w-full h-48 object-cover mb-4 rounded"
                />
                <h4 className="text-lg font-semibold text-[#8c0313]">Altberg Sneeker Microlight</h4>
                <p className="text-[#B0B5BF]">Lightweight tactical footwear</p>
                <a
                    href="https://www.frontlinemilitary.co.uk/altberg-sneeker-microlight"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-[#8c0313] text-white px-6 py-2 rounded hover:bg-opacity-90 inline-block"
                >
                    Shop Now
                </a>
            </div>
        </div>
    </div>

    {/* Featured Product Section */ }
    <div className="bg-[#FCF6EE] text-[#8c0313] p-8">
        <h3 className="text-2xl font-bold mb-6 tracking-wide">FEATURED PRODUCT OF THE MONTH</h3>
        <div className="bg-white p-6 rounded-lg border border-black">
            <img
                src="https://www.frontlinemilitary.co.uk/image/cache/catalog/products/odin/molle-op-order-utility-pouch-multicam-back-600x600-500x500.jpg"
                alt="MOLLE OP Order Utility Pouch"
                className="w-full h-64 mb-4 rounded"
            />
            <h4 className="text-xl font-bold mb-2">MOLLE OP Order Utility Pouch</h4>
            <p className="text-[#B0B5BF] mb-4">
                Versatile tactical pouch with multiple attachment options. Perfect for organizing and carrying essential
                gear.
            </p>
            <div className="bg-[#2B4570] text-white p-2 rounded text-center">SPECIAL PRICE: £65.00</div>
        </div>
    </div>

    {/* Customer Testimonial */ }
    <div className="p-8 bg-[#2B4570] text-white">
        <h3 className="text-2xl font-bold mb-6 tracking-wide">CUSTOMER TESTIMONIAL</h3>
        <div className="bg-[#FCF6EE] p-6 rounded-lg shadow text-[#8c0313] border border-black">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#B0B5BF] rounded-full mr-4"></div>
                <div>
                    <h4 className="font-semibold">Tom Jackson</h4>
                    <p className="text-[#B0B5BF]">Verified Customer</p>
                </div>
            </div>
            <p className="italic mb-4">
                "I have been using this shop now for 4 years. Absolutely fantastic service, brilliant shop, if they haven't
                got it in stock then they try to get it in, both Gill and Laura are very knowledgeable about the kit. A
                thoroughly deserved 5star rating. Would absolutely recommend this shop"
            </p>
            <div className="flex text-[#8c0313]">★★★★★</div>
        </div>
    </div>

    {/* Updates Section */ }
    <div className="bg-[#FCF6EE] text-[#8c0313] p-8">
        <h3 className="text-2xl font-bold mb-6 tracking-wide">UPDATES</h3>
        <div className="space-y-4">
            <div className="bg-white p-4 rounded border border-black">
                <h4 className="font-semibold mb-2">Winter Collection Arriving Soon</h4>
                <p className="text-sm text-[#B0B5BF]">Get ready for our new winter tactical gear lineup.</p>
            </div>
            <div className="bg-white p-4 rounded border border-black">
                <h4 className="font-semibold mb-2">Extended Holiday Hours</h4>
                <p className="text-sm text-[#B0B5BF]">We're open longer to serve you better this season.</p>
            </div>
        </div>
    </div>

    {/* Footer */ }
    <div className="p-8 bg-[#2B4570] text-center text-white">
        <p className="mb-4">Follow us on social media for daily updates</p>
        <div className="flex justify-center space-x-4 mb-4">
            <a
                href="https://www.instagram.com/frontlinemilitaryshop?igsh=ejA3bjRvZXFiZmtr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FCF6EE] rounded-full border border-black flex items-center justify-center overflow-hidden hover:bg-opacity-90 transition-colors"
                aria-label="Follow us on Instagram"
            >
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZYQsNY8n4fIYP0iFBkMMwyCEwm0MkK.png"
                    alt="Instagram"
                    className="w-6 h-6"
                />
            </a>
            <a
                href="https://www.facebook.com/share/183tV9sWt6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FCF6EE] rounded-full border border-black flex items-center justify-center overflow-hidden hover:bg-opacity-90 transition-colors"
                aria-label="Follow us on Facebook"
            >
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O7VjhhUgICsl1nhIU0PWHpPn6aIzPB.png"
                    alt="Facebook"
                    className="w-6 h-6"
                />
            </a>
            <div className="w-10 h-10 bg-[#FCF6EE] rounded-full border border-black flex items-center justify-center overflow-hidden">
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xfJHy5MYpqxpuclgmi4XaYQbzkkA6n.png"
                    alt="TikTok"
                    className="w-6 h-6"
                />
            </div>
        </div>
        <p className="text-sm text-[#B0B5BF]">© 2025 Frontline Military Supplies. All rights reserved.</p>
    </div>
  </div >
)
}