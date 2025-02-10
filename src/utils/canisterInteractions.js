import { Actor, HttpAgent } from "@dfinity/agent"
import { idlFactory as krnlSecIdlFactory } from "../declarations/krnlsec_backend/krnlsec_backend.did.js"
import { idlFactory as krnlSecAIIdlFactory } from "../declarations/krnlsec_ai/krnlsec_ai.did.js"
import { idlFactory as krnlSecStorageIdlFactory } from "../declarations/krnlsec_storage/krnlsec_storage.did.js"
import { idlFactory as krnlSecUsersIdlFactory } from "../declarations/krnlsec_users/krnlsec_users.did.js"

const host = process.env.NEXT_PUBLIC_IC_HOST || "https://ic0.app"
const agent = new HttpAgent({ host })

const krnlSecActor = Actor.createActor(krnlSecIdlFactory, {
  agent,
  canisterId: process.env.NEXT_PUBLIC_KRNLSEC_CANISTER_ID,
})
const krnlSecAIActor = Actor.createActor(krnlSecAIIdlFactory, {
  agent,
  canisterId: process.env.NEXT_PUBLIC_KRNLSEC_AI_CANISTER_ID,
})
const krnlSecStorageActor = Actor.createActor(krnlSecStorageIdlFactory, {
  agent,
  canisterId: process.env.NEXT_PUBLIC_KRNLSEC_STORAGE_CANISTER_ID,
})
const krnlSecUsersActor = Actor.createActor(krnlSecUsersIdlFactory, {
  agent,
  canisterId: process.env.NEXT_PUBLIC_KRNLSEC_USERS_CANISTER_ID,
})

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

export async function analyzeContract(code) {
  try {
    const result = await krnlSecAIActor.analyzeContract(code)
    return result
  } catch (error) {
    console.error("Error analyzing contract:", error)
    throw error
  }
}

export async function storeReport(contractId, report) {
  try {
    await krnlSecStorageActor.storeReport(contractId, report)
  } catch (error) {
    console.error("Error storing report:", error)
    throw error
  }
}

export async function getStoredReport(contractId) {
  try {
    const result = await krnlSecStorageActor.getReport(contractId)
    return result
  } catch (error) {
    console.error("Error getting stored report:", error)
    throw error
  }
}

export async function registerUser(principal, role) {
  try {
    await krnlSecUsersActor.registerUser(principal, role)
  } catch (error) {
    console.error("Error registering user:", error)
    throw error
  }
}

export async function getUserRole(principal) {
  try {
    const result = await krnlSecUsersActor.getUserRole(principal)
    return result
  } catch (error) {
    console.error("Error getting user role:", error)
    throw error
  }
}

