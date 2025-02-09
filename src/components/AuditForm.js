"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { submitContract } from "../utils/canisterInteractions"

export default function AuditForm() {
  const [contractId, setContractId] = useState("")
  const [contractCode, setContractCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await submitContract(contractId, contractCode)
      setResult(response)
    } catch (error) {
      setResult({ err: error.message })
    } finally {
      setIsSubmitting(false)
    }

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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Audit"}
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-4 bg-gray-800 rounded">
            <h3 className="text-xl font-semibold mb-2">Submission Result:</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </section>
  )
}

