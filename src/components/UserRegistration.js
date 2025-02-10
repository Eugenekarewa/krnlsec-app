"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { registerUser } from "../utils/canisterInteractions"

export default function UserRegistration() {
  const [principal, setPrincipal] = useState("")
  const [role, setRole] = useState("User")
  const [isRegistering, setIsRegistering] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsRegistering(true)
    setResult(null)

    try {
      await registerUser(principal, role)
      setResult({ success: `User registered successfully as ${role}` })
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setIsRegistering(false)
    }

    // Reset form after submission
    setPrincipal("")
    setRole("User")
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">User Registration</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Principal ID"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Select value={role} onValueChange={setRole}>
              <Select.Trigger className="w-full">
                <Select.Value placeholder="Select a role" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="User">User</Select.Item>
                <Select.Item value="Auditor">Auditor</Select.Item>
                <Select.Item value="Admin">Admin</Select.Item>
              </Select.Content>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isRegistering}>
            {isRegistering ? "Registering..." : "Register User"}
          </Button>
        </form>
        {result && (
          <div className={`mt-4 p-4 rounded ${result.success ? "bg-green-800" : "bg-red-800"}`}>
            <p>{result.success || result.error}</p>
          </div>
        )}
      </div>
    </section>
  )
}

