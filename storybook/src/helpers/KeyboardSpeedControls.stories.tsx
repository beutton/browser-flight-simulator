import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { type Meta, type StoryFn } from '@storybook/react'
import { useRef } from 'react'

import { KeyboardNavigationHelper, useKeyboardSpeedControls } from '.'

export default {
  title: 'helpers/Keyboard Speed Controls',
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta

const DemoScene = () => {
  const meshRef = useRef(null)
  
  // Use the keyboard speed controls hook
  const { movementSpeed, rotationSpeed } = useKeyboardSpeedControls(
    { movementSpeed: 10, rotationSpeed: 1 },
    { collapsed: false }
  )
  
  return (
    <>
      <KeyboardNavigationHelper 
        speed={movementSpeed}
        rotationSpeed={rotationSpeed}
        showIndicator={true}
        indicatorPosition="bottom-left"
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      
      <gridHelper args={[10, 10]} />
      <OrbitControls />
    </>
  )
}

export const Default: StoryFn = () => (
  <Canvas>
    <DemoScene />
  </Canvas>
)

export const WithCustomSettings: StoryFn = () => (
  <Canvas>
    <DemoScene />
    <color attach="background" args={['#f0f0f0']} />
  </Canvas>
) 