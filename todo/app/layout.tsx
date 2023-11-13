import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TODO',
  description: 'Version 1.0 TODO app',
}




const RootLayout = ({children} : any) => {
  
    return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
        </body>
    </html>
  )
}

export default RootLayout;