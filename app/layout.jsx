import "../src/index.css";

export const metadata = {
  title: "NOOR AL OUD — арабская парфюмерия",
  description: "Премиальная арабская парфюмерия NOOR AL OUD",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#241b17",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
