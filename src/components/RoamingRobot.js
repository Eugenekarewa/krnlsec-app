"use client"

import { useRef, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three"

export default function RoamingRobot() {
  const robotRef = useRef()
  const mixer = useRef()
  const clock = useRef(new THREE.Clock())
  const gltf = useLoader(GLTFLoader, "/robot.glb")

  useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.current.clipAction(gltf.animations[0])
      action.play()
    }
  }, [gltf])

  useFrame(() => {
    if (mixer.current) {
      mixer.current.update(clock.current.getDelta())
    }

    if (robotRef.current) {
      robotRef.current.position.x = Math.sin(clock.current.getElapsedTime() * 0.5) * 3
      robotRef.current.position.z = Math.cos(clock.current.getElapsedTime() * 0.5) * 3
      robotRef.current.rotation.y = -clock.current.getElapsedTime() * 0.5
    }
  })

  return <primitive ref={robotRef} object={gltf.scene} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />
}

