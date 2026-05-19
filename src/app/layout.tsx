import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '4neverCompany OS — The Dynamic Office Hive',
  description: 'Agent swarm management platform with BMAD-Method workflow',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface text-white antialiased">
        {children}
      </body>
    </html>
  );
}