import "./globals.css";

export const metadata = {
  title: "INSANE",
  description: "PARALLAX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
