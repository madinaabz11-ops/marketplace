import type { Metadata } from "next";
import { Space_Grotesk, Public_Sans } from "next/font/google";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import { getCartCount } from "@/lib/cart";
import { getFavoritesCount } from "@/lib/favorites";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wiskons - маркетплейс товаров",
  description: "Новые товары от разных продавцов в одном месте. Поиск по категориям и цене.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  const [cartCount, favoritesCount] = await Promise.all([
    getCartCount(user?.id),
    getFavoritesCount(user?.id),
  ]);

  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${publicSans.variable}`}>
      <body>
        <Header user={user} cartCount={cartCount} favoritesCount={favoritesCount} />
        {children}
        <Footer user={user} />
      </body>
    </html>
  );
}
