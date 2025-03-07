import { useFrame, useThree } from '@react-three/fiber'
import { type GlobeControls } from '3d-tiles-renderer'
import { useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useKeyPress } from 'react-use'
import { Vector3 } from 'three'

import { Ellipsoid } from '@takram/three-geospatial'

import { springOptions } from './springOptions'

const position = new Vector3()
const direction = new Vector3()
const up = new Vector3()
const forward = new Vector3()
const right = new Vector3()

export interface KeyboardControlOptions {
  speed?: number
  enabled?: boolean
  autoFocus?: boolean
}

export function useKeyboardControl({
  speed = 10,
  enabled = true,
  autoFocus = true
}: KeyboardControlOptions = {}): { isActive: boolean; setActive: (active: boolean) => void } {
  const { gl, camera, controls } = useThree()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isActive, setActive] = useState(false)
  const [isInitialized, setInitialized] = useState(false)
  
  const motionX = useSpring(0, springOptions)
  const motionY = useSpring(0, springOptions)
  const motionZ = useSpring(0, springOptions)

  // Store key states in refs to avoid re-renders
  const keyStates = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    c: false
  })

  // Set up canvas reference
  useEffect(() => {
    if (gl.domElement) {
      canvasRef.current = gl.domElement
    }
  }, [gl])

  // Check if camera and controls are initialized
  useEffect(() => {
    if (!camera || !controls) {
      setInitialized(false)
      return
    }
    
    // For GlobeControls, we need to wait until it's fully initialized
    const isGlobeControls = (controls as { isGlobeControls?: boolean })?.isGlobeControls === true
    
    // Wait longer for GlobeControls to initialize
    const timeoutDuration = isGlobeControls ? 1500 : 100
    
    // Check if camera is properly set up
    const isCameraReady = () => {
      try {
        // Test if we can access camera properties without errors
        if (!camera.matrixWorldInverse) return false
        
        // Test if we can perform the operations needed for movement
        camera.getWorldPosition(position)
        camera.getWorldDirection(direction)
        return true
      } catch (error) {
        console.warn('Camera not ready yet:', error)
        return false
      }
    }
    
    // Wait for camera and controls to be ready
    const timeoutId = setTimeout(() => {
      if (isCameraReady()) {
        setInitialized(true)
        console.log('Keyboard controls initialized')
      } else {
        // Try again in a bit
        setTimeout(() => {
          if (isCameraReady()) {
            setInitialized(true)
            console.log('Keyboard controls initialized (retry)')
          } else {
            console.warn('Failed to initialize keyboard controls - camera not ready')
          }
        }, 1000)
      }
    }, timeoutDuration)
    
    return () => clearTimeout(timeoutId)
  }, [camera, controls])

  // Handle focus management
  useEffect(() => {
    if (!enabled || !canvasRef.current) return

    const canvas = canvasRef.current

    // Focus handlers
    const handleFocus = () => setActive(true)
    const handleBlur = () => setActive(false)
    const handleClick = () => {
      if (autoFocus && canvas) {
        canvas.focus()
      }
    }

    // Key handlers that work regardless of focus state
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive && autoFocus && canvas) {
        canvas.focus()
      }
      
      switch (e.key.toLowerCase()) {
        case 'w': keyStates.current.w = true; break
        case 'a': keyStates.current.a = true; break
        case 's': keyStates.current.s = true; break
        case 'd': keyStates.current.d = true; break
        case ' ': keyStates.current.space = true; e.preventDefault(); break
        case 'c': keyStates.current.c = true; break
      }
      
      updateMotion()
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w': keyStates.current.w = false; break
        case 'a': keyStates.current.a = false; break
        case 's': keyStates.current.s = false; break
        case 'd': keyStates.current.d = false; break
        case ' ': keyStates.current.space = false; break
        case 'c': keyStates.current.c = false; break
      }
      
      updateMotion()
    }

    // Update motion values based on current key states
    const updateMotion = () => {
      const { w, a, s, d, space, c } = keyStates.current
      
      motionX.set(d ? speed : a ? -speed : 0)
      motionY.set(w ? speed : s ? -speed : 0)
      motionZ.set(space ? speed : c ? -speed : 0)
    }

    // Make canvas focusable
    if (canvas && !canvas.hasAttribute('tabindex')) {
      canvas.setAttribute('tabindex', '0')
    }

    // Add event listeners
    canvas?.addEventListener('focus', handleFocus)
    canvas?.addEventListener('blur', handleBlur)
    canvas?.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Auto-focus on mount if enabled
    if (autoFocus && canvas) {
      // Delay focus to ensure the canvas is ready
      setTimeout(() => {
        canvas.focus()
      }, 200)
    }

    return () => {
      canvas?.removeEventListener('focus', handleFocus)
      canvas?.removeEventListener('blur', handleBlur)
      canvas?.removeEventListener('click', handleClick)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [enabled, autoFocus, speed, motionX, motionY, motionZ, isActive])

  // Apply movement in the animation frame
  useFrame(() => {
    if (!enabled || !isActive || !isInitialized) return
    
    // Safety check to ensure camera and controls are available
    if (!camera || !controls) return

    const x = motionX.get()
    const y = motionY.get()
    const z = motionZ.get()
    if (x === 0 && y === 0 && z === 0) {
      return
    }

    try {
      camera.getWorldPosition(position)
      camera.getWorldDirection(direction)
      Ellipsoid.WGS84.getSurfaceNormal(position, up)
      forward
        .copy(up)
        .multiplyScalar(direction.dot(up))
        .subVectors(direction, forward)
        .normalize()
      right.crossVectors(forward, up).normalize()

      camera.position
        .add(right.multiplyScalar(x))
        .add(forward.multiplyScalar(y))
        .add(up.multiplyScalar(z))

      // Safely check if controls is GlobeControls and has adjustCamera method
      if (controls && 
          (controls as { isGlobeControls?: boolean })?.isGlobeControls === true &&
          typeof (controls as GlobeControls).adjustCamera === 'function' &&
          camera.matrixWorldInverse !== null) {
        try {
          (controls as GlobeControls).adjustCamera(camera)
        } catch (error) {
          console.warn('Error adjusting camera:', error)
        }
      }
    } catch (error) {
      console.warn('Error in keyboard control frame update:', error)
    }
  })

  return { isActive, setActive }
}
