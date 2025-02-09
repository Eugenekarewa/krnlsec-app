"use client"

import dynamic from "next/dynamic"
import { useClientSideRendering } from "@/hooks/useClientSideRendering"

const Hero = dynamic(() => import("./Hero"), { ssr: false })
const AuditForm = dynamic(() => import("@/components/AuditForm"), { ssr: false })
const ReportVisualization = dynamic(() => import("@/components/ReportVisualization"), { ssr: false })

export function ClientComponents() {
  const isClient = useClientSideRendering()

  if (!isClient) {
    return null
  }

  return (
    <>
      <Hero />
      <AuditForm />
      <ReportVisualization />
    </>
  )
}

