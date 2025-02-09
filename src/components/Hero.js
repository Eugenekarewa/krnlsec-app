"use client"

import dynamic from "next/dynamic"
import { useClientSideRendering } from "@/hooks/useClientSideRendering"

const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-800" />,
})

export default function Hero() {
  const isClient = useClientSideRendering()

  return (
    <section className="h-screen relative overflow-hidden">
      <div className="absolute inset-0">{isClient && <ThreeScene />}</div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-bold mb-4">KrnlSec</h1>
        <p className="text-xl mb-8">Smart Contract Auditing Service</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Start Audit</button>
      </div>
    </section>
  )
}

