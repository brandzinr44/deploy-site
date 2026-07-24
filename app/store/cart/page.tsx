'use client'

import Link from 'next/link'
import Header from '@/components/header'
import FooterSection from '@/components/footer-section'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { items, updateQuantity, cartTotal } = useCart()

  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground pt-28 md:pt-32 px-3 lg:px-7 pb-20">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-[22px] text-foreground">Your bag is empty.</p>
            <Link
              href="/store"
              className="text-[16px] underline underline-offset-4 text-foreground"
            >
              Browse the store
            </Link>
          </div>
        ) : (
          <div className="max-w-full mx-auto flex flex-col">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 md:gap-6 py-8 border-b border-foreground"
              >
                <div className="w-34 h-10 md:w-50 md:h-40 flex-shrink-0 overflow-hidden bg-foreground">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1 text-left">
  <h3 className="text-[22px] font-regular tracking-tight text-foreground text-left">
    {item.title}
  </h3>
  <p className="text-[14px] md:text-[16px] text-foreground text-left">
    {item.license}
  </p>
  <p className="text-[14px] md:text-[16px] text-foreground/60 text-left">
    Qty: {item.quantity}
  </p>

  <div className="flex items-center gap-3 mt-3">
    <button
      onClick={() => updateQuantity(item.id, 1)}
      className="w-9 h-9 flex items-center justify-center text-[22px] text-foreground"
    >
      +
    </button>
    <button
      onClick={() => updateQuantity(item.id, -1)}
      className="w-9 h-9 flex items-center justify-center text-[22px] text-foreground"
    >
      −
    </button>
  </div>
</div>

                <p className="text-[16px] md:text-[20px] font-regular tracking-tight text-foreground flex-shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="flex items-center justify-between py-8">
              <span className="text-[20px] md:text-[24px] font-regular tracking-tight text-foreground">
                Total
              </span>
              <span className="text-[20px] md:text-[24px] font-regular tracking-tight text-foreground">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <button className="w-full py-4 bg-foreground text-background text-[18px] font-regular tracking-tight uppercase">
              Checkout
            </button>
          </div>
        )}
      </main>
      <FooterSection />
    </>
  )
}