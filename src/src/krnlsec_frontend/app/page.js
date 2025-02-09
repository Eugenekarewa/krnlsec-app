import { Features } from "../components/Features"
import { ClientComponents } from "../components/ClientComponents"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <ClientComponents />
      <Features />
    </main>
  )
}

