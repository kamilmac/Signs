import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { SignMaterial, convertCharacterToGrid } from './SignMaterial'
import { characters } from './signs'

interface BoxesProps {
  text: string;
}

function Boxes({ text }: BoxesProps) {
  const chars = text.split('')
  const count = chars.length
  const rowLength = Math.ceil(Math.sqrt(count)) // Make it roughly square
  
  return (
    <group>
      {chars.map((char, i) => {
        const x = (i % rowLength) - rowLength/2 // Center the text
        const z = Math.floor(i / rowLength) - Math.floor(count/rowLength)/2
        
        return (
          <mesh
            key={i}
            position={[x * 1.5, 0, z * 1.5]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <signMaterial
              characterGrid={convertCharacterToGrid(characters[char.toUpperCase()] || characters[' '])}
              color="#ff8800"
              transparent
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 30, 50], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Boxes text="HELLO WORLD!" />
    </Canvas>
  )
}
