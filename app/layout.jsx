// Main Entry point of the application
import '@styles/globals.css';

export const metadata = {
  title: 'FAQprompters',
  description:
    'We have developed it, so you can use it. Just ask and share your AI Prompts with the world.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
