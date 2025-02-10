"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

export default function WalkingRobot(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/robot.glb")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t / 1.5) / 4
    group.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Robot.geometry} material={materials.RobotMaterial} />
    </group>
  )
}

useGLTF.preload("/robot.glb")

