/**
 * By default, this is a Server Side Rendering (SSR). You need to put 'use client'; directive at top of the file to turn it into a Client Side Rendering (CSR) - or Client Side Component.
 *
 * Whenever you're utilizing state (When managing state in the app) in your app or other client side management solutions,, for instance you want to use React useState or any other hook, you need to use CSR or declare the component as a Client Component - by 'use client'; at the top of the file or component because the state of the application always changes or updated in the browser. State management in React is primarily a client side thing. The component state is managed and updated within the browser.
 */

import Feed from '@components/Feed';

export default function Home() {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Discover Your FAQ and Share <br className="max-md:hidden" />
        <span className="orange_gradient text-center animate-pulse">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        FAQprompters is an AI prompting tool for modern world to discover, and
        share FAQ with Prompts
      </p>
      <Feed />
    </section>
  );
}
