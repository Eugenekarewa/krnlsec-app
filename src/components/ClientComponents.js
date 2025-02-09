"use client"

import dynamic from "next/dynamic"
import ClientOnly from "./ClientOnly"

const Hero = dynamic(() => import("./Hero"), { ssr: false })
const AuditForm = dynamic(() => import("./AuditForm"), { ssr: false })
const ReportVisualization = dynamic(() => import("./ReportVisualization"), { ssr: false })
const AllReports = dynamic(() => import("./AllReports"), { ssr: false })

export function ClientComponents() {
  return (
    <ClientOnly>
      <Hero />
      <AuditForm />
      <ReportVisualization />
      <AllReports />
    </ClientOnly>
  )
}

