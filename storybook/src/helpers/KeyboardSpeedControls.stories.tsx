import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { type Meta, type StoryFn } from '@storybook/react'
import { useRef } from 'react'

import { KeyboardNavigationHelper, useKeyboardSpeedControls } from '.'
import { useKeyboardControl } from './useKeyboardControl'

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
  
  useKeyboardControl({ speed: movementSpeed, rotationSpeed })
  
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

export const WithFOVControls: StoryFn = () => (
  <Canvas>
    <DemoScene />
    <KeyboardNavigationHelper 
      fovStep={10} 
      customText="Use Q and E keys to adjust FOV (Field of View) - higher fovStep value (10)"
    />
    <color attach="background" args={['#e0f0ff']} />
  </Canvas>
)

WithFOVControls.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates FOV controls with a higher step value (10 degrees). Use the Q and E keys to decrease and increase the FOV respectively.'
    }
  }
}

Default.parameters = {
  docs: {
    description: {
      story:
        'Keyboard controls with adjustable speed. Use the following keys:\n' +
        '- WASD: Move forward, left, backward, right\n' +
        '- Space/C: Move up/down\n' +
        '- Arrow keys: Look around\n' +
        '- Q/E: Decrease/increase FOV\n' +
        '- Shift+Arrow Up/Down: Increase/decrease movement speed\n' +
        '- Shift+Arrow Left/Right: Increase/decrease rotation speed'
    }
  }
} 