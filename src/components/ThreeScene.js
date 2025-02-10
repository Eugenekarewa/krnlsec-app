"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import RoamingRobot from "./RoamingRobot"

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <RoamingRobot />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

