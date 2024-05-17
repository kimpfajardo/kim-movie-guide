import "./styles.css";

import { Cabin } from "next/font/google";

const cabin = Cabin({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={cabin.className}>
      <Component {...pageProps} />
    </main>
  );
}
