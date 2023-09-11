import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import {Questrial} from 'next/font/google'
import { ReduxProvider } from '@/redux/Provider';



const inter = Questrial({ subsets: ['latin'],weight:['400',] })

 function App({ Component, pageProps }: AppProps) {
  return (   <ReduxProvider><main
    className={`h-screen bg-white ${inter.className}`}
  ><Component {...pageProps} /></main></ReduxProvider>)
}
export default App