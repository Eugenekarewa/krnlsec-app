"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AuditForm() {
  const [contractId, setContractId] = useState("")
  const [contractCode, setContractCode] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would integrate with your canister's submitContract function
    console.log("Submitting contract:", { contractId, contractCode })
    // Reset form after submission
    setContractId("")
    setContractCode("")
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Submit Your Contract</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Contract ID"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Textarea
              placeholder="Paste your contract code here"
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
              className="w-full h-64"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit for Audit
          </Button>
        </form>
      </div>
    </section>
  )
}

