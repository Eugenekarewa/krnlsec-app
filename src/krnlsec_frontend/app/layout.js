import "./globals.css"

export const metadata = {
  title: "KrnlSec - Smart Contract Auditing",
  description: "Secure your smart contracts with KrnlSec auditing service",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}



