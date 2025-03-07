import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Grid } from '@react-three/drei'
import { type Meta, type StoryFn } from '@storybook/react'
import { useRef } from 'react'

import { KeyboardNavigationHelper, usePovSpeedControls, useKeyboardSpeedControls } from '.'

export default {
  title: 'helpers/POV Speed Controls',
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
  
  // Use the POV speed controls hook
  const { povChangeSpeed } = usePovSpeedControls(
    { povChangeSpeed: 5 },
    { collapsed: false }
  )
  
  return (
    <>
      <KeyboardNavigationHelper 
        speed={movementSpeed}
        rotationSpeed={rotationSpeed}
        povChangeSpeed={povChangeSpeed}
        showIndicator={true}
        indicatorPosition="bottom-left"
        customText="Press Q to zoom out, E to zoom in (adjust speed with slider)"
      />
      
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Create a more visible scene to demonstrate POV changes */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      
      {/* Add some objects at different distances */}
      {[-5, -3, -1, 1, 3, 5].map((x) => (
        <mesh key={`box-${x}`} position={[x, 0, -5]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={x < 0 ? "blue" : "red"} />
        </mesh>
      ))}
      
      <Grid infiniteGrid fadeDistance={30} fadeStrength={5} />
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