// Main Entry point of the application
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
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
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
