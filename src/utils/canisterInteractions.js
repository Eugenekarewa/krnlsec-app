import { Actor, HttpAgent } from "@dfinity/agent"
import { idlFactory } from "../declarations/krnlsec_backend/krnlsec_backend.did.js"

const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID
const host = process.env.NEXT_PUBLIC_IC_HOST || "https://ic0.app"

const agent = new HttpAgent({ host })
const krnlSecActor = Actor.createActor(idlFactory, { agent, canisterId })

export async function submitContract(contractId, contractCode) {
  try {
    const result = await krnlSecActor.submitContract(contractId, contractCode)
    return result
  } catch (error) {
    console.error("Error submitting contract:", error)
    throw error
  }
}

export async function getAuditReport(contractId) {
  try {
    const result = await krnlSecActor.getAuditReport(contractId)
    return result
  } catch (error) {
    console.error("Error getting audit report:", error)
    throw error
  }
}

export async function getAllAuditReports() {
  try {
    const result = await krnlSecActor.getAllAuditReports()
    return result
  } catch (error) {
    console.error("Error getting all audit reports:", error)
    throw error
  }
}

export async function deleteAuditReport(contractId) {
  try {
    const result = await krnlSecActor.deleteAuditReport(contractId)
    return result
  } catch (error) {
    console.error("Error deleting audit report:", error)
    throw error
  }
}

export async function clearReports() {
  try {
    const result = await krnlSecActor.clearReports()
    return result
  } catch (error) {
    console.error("Error clearing reports:", error)
    throw error
  }
}

