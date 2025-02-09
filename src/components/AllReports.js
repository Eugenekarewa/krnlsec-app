"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { getAllAuditReports, deleteAuditReport, clearReports } from "../utils/canisterInteractions"

export default function AllReports() {
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAllReports = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getAllAuditReports()
      setReports(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteReport = async (contractId) => {
    try {
      await deleteAuditReport(contractId)
      fetchAllReports()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleClearAllReports = async () => {
    try {
      await clearReports()
      fetchAllReports()
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchAllReports()
  }, []) //This is the line that was causing the issue.  It needs no dependencies because it only runs once on mount.

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">All Audit Reports</h2>
        {isLoading && <p className="text-center">Loading reports...</p>}
        {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map(([contractId, report]) => (
            <div key={contractId} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Contract: {contractId}</h3>
              <p>Issues: {report.issues.length}</p>
              <p>Tests Performed: {report.testsPerformed.length}</p>
              <p>Functions Tested: {report.functionsTested.length}</p>
              <Button onClick={() => handleDeleteReport(contractId)} className="mt-4">
                Delete Report
              </Button>
            </div>
          ))}
        </div>
        {reports.length > 0 && (
          <Button onClick={handleClearAllReports} className="mt-8">
            Clear All Reports
          </Button>
        )}
      </div>
    </section>
  )
}

