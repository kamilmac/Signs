import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function Boxes() {
  const count = 100
  const mesh = useRef<THREE.InstancedMesh>(null!)
  
  useEffect(() => {
    // Update instances
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      const rotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      const scale = 0.5 + Math.random() * 0.5
      
      const matrix = new THREE.Matrix4()
      matrix.compose(
        position,
        new THREE.Quaternion().setFromEuler(rotation),
        new THREE.Vector3(scale, scale, scale)
      )
      
      mesh.current.setMatrixAt(i, matrix)
    }
    // Need to flag the instanceMatrix as needs update
    mesh.current.instanceMatrix.needsUpdate = true
  }, [])
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </instancedMesh>
  )
}

export function Scene() {
  return (
    <Canvas 
      camera={{ position: [15, 15, 15], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Boxes />
    </Canvas>
  )
}
