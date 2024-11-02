import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const SignMaterial = shaderMaterial(
  {
    characterGrid: { value: new Array(64).fill(0) }, // 8x8 grid as flat array
    color: new THREE.Color('orange'),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float characterGrid[64];
    uniform vec3 color;
    varying vec2 vUv;
    
    void main() {
      // Only show on front face (positive Z)
      if (gl_FrontFacing) {
        // Convert UV to grid position
        vec2 grid = floor(vUv * 8.0);
        int index = int(grid.y) * 8 + int(grid.x);
        
        // Sample the grid
        float value = characterGrid[index];
        
        // Output color or transparent based on grid value
        gl_FragColor = value > 0.5 ? vec4(color, 1.0) : vec4(0.0, 0.0, 0.0, 0.0);
      } else {
        gl_FragColor = vec4(color, 1.0);
      }
    }
  `
)

extend({ SignMaterial })

// Add types for the material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      signMaterial: any
    }
  }
}

export function convertCharacterToGrid(char: string[]): number[] {
  const grid = new Array(64).fill(0)
  char.forEach((row, y) => {
    for (let x = 0; x < 8; x++) {
      if (row[x] === 'X') {
        grid[y * 8 + x] = 1
      }
    }
  })
  return grid
}

export { SignMaterial }
