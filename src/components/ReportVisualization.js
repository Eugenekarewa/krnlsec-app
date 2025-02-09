"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { getAuditReport } from "../utils/canisterInteractions"

export default function ReportVisualization() {
  const [contractId, setContractId] = useState("")
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchReport = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getAuditReport(contractId)
      if (result.length > 0) {
        setReport(result[0])
      } else {
        setError("No report found for this contract ID")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Audit Report</h2>
        <div className="max-w-2xl mx-auto">
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Enter Contract ID"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={fetchReport} disabled={isLoading}>
              {isLoading ? "Fetching..." : "Fetch Report"}
            </Button>
          </div>
          {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
          {report && (
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Report for Contract: {report.contractId}</h3>
              <h4 className="text-lg font-semibold mb-2">Issues:</h4>
              <ul className="list-disc list-inside mb-4">
                {report.issues.map((issue, index) => (
                  <li key={index} className={`text-${issue.severity.toLowerCase()}-500`}>
                    {issue.severity}: {issue.description}
                  </li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold mb-2">Statistics:</h4>
              <pre className="bg-gray-800 p-2 rounded">{report.stats}</pre>
              <h4 className="text-lg font-semibold mt-4 mb-2">Tests Performed:</h4>
              <ul className="list-disc list-inside">
                {report.testsPerformed.map((test, index) => (
                  <li key={index}>{test}</li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold mt-4 mb-2">Functions Tested:</h4>
              <ul className="list-disc list-inside">
                {report.functionsTested.map((func, index) => (
                  <li key={index}>{func}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

