import Header from "./components/Navigation";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { Lunasima } from "next/font/google";

const lunasima = Lunasima({
  weight: ["400", "700"], // можно выбрать нужные веса
  subsets: ["latin"], // поддержка языков
  variable: "--font-lunasima", // создаём CSS-переменную
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lunasima.variable}>
      <body>
        <AuthProvider>
          <Header></Header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
