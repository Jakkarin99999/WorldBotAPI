// pages/_app.js
import '../src/components/Sidebar.css'; // Import global CSS
import '../styles/globals.css'; // Existing global styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
