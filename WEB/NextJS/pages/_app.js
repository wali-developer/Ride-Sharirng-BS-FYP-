import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify'
import { AppContext } from '../context/state';
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <Script
        src="https://kit.fontawesome.com/8441000675.js"
        crossorigin="anonymous"
      ></Script>
      <NextNProgress color="#4f56ff" />
      <Component {...pageProps} />
      <ToastContainer />
    </AppContext>
  )
}

export default MyApp
