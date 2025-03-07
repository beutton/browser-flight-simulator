import { useFrame, useThree } from '@react-three/fiber'
import { type GlobeControls } from '3d-tiles-renderer'
import { useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useKeyPress } from 'react-use'
import { Vector3, Quaternion, Euler, PerspectiveCamera } from 'three'

import { Ellipsoid } from '@takram/three-geospatial'

import { springOptions } from './springOptions'

const position = new Vector3()
const direction = new Vector3()
const up = new Vector3()
const forward = new Vector3()
const right = new Vector3()
const rotationEuler = new Euler()
const rotationQuaternion = new Quaternion()

export interface KeyboardControlOptions {
  speed?: number
  rotationSpeed?: number
  enabled?: boolean
  autoFocus?: boolean
  fovStep?: number
}

export function useKeyboardControl({
  speed = 10,
  rotationSpeed = 1,
  enabled = true,
  autoFocus = true,
  fovStep = 5
}: KeyboardControlOptions = {}): { isActive: boolean; setActive: (active: boolean) => void } {
  const { gl, camera, controls } = useThree()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isActive, setActive] = useState(false)
  const [isInitialized, setInitialized] = useState(false)
  
  const motionX = useSpring(0, springOptions)
  const motionY = useSpring(0, springOptions)
  const motionZ = useSpring(0, springOptions)
  const rotationX = useSpring(0, springOptions) // Rotation around X axis (look up/down)
  const rotationY = useSpring(0, springOptions) // Rotation around Y axis (look left/right)
  const fovChange = useSpring(0, springOptions) // FOV change

  // Store key states in refs to avoid re-renders
  const keyStates = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    c: false,
    arrowUp: false,
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false,
    q: false,  // q key for decreasing FOV
    e: false   // e key for increasing FOV
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
        case 'arrowup': keyStates.current.arrowUp = true; e.preventDefault(); break
        case 'arrowdown': keyStates.current.arrowDown = true; e.preventDefault(); break
        case 'arrowleft': keyStates.current.arrowLeft = true; e.preventDefault(); break
        case 'arrowright': keyStates.current.arrowRight = true; e.preventDefault(); break
        case 'q': keyStates.current.q = true; e.preventDefault(); break
        case 'e': keyStates.current.e = true; e.preventDefault(); break
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
        case 'arrowup': keyStates.current.arrowUp = false; break
        case 'arrowdown': keyStates.current.arrowDown = false; break
        case 'arrowleft': keyStates.current.arrowLeft = false; break
        case 'arrowright': keyStates.current.arrowRight = false; break
        case 'q': keyStates.current.q = false; break
        case 'e': keyStates.current.e = false; break
      }
      
      updateMotion()
    }

    // Update motion values based on current key states
    const updateMotion = () => {
      const { w, a, s, d, space, c, arrowUp, arrowDown, arrowLeft, arrowRight, q, e } = keyStates.current
      
      motionX.set(d ? speed : a ? -speed : 0)
      motionY.set(w ? speed : s ? -speed : 0)
      motionZ.set(space ? speed : c ? -speed : 0)
      
      // Set rotation values based on arrow keys
      // Note: Inverted up/down controls (up arrow tilts down, down arrow tilts up)
      rotationX.set(arrowUp ? rotationSpeed : arrowDown ? -rotationSpeed : 0)
      rotationY.set(arrowRight ? -rotationSpeed : arrowLeft ? rotationSpeed : 0)
      
      // Set FOV change based on q and e keys
      fovChange.set(e ? fovStep : q ? -fovStep : 0)
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
  }, [enabled, autoFocus, speed, rotationSpeed, motionX, motionY, motionZ, rotationX, rotationY, isActive])

  // Apply movement in the animation frame
  useFrame(() => {
    if (!enabled || !isActive || !isInitialized) return
    
    // Safety check to ensure camera and controls are available
    if (!camera || !controls) return

    const x = motionX.get()
    const y = motionY.get()
    const z = motionZ.get()
    const rotX = rotationX.get()
    const rotY = rotationY.get()
    const fov = fovChange.get()
    
    try {
      // Handle position movement
      if (x !== 0 || y !== 0 || z !== 0) {
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
      }
      
      // Handle camera rotation
      if (rotX !== 0 || rotY !== 0) {
        // Get current camera orientation
        camera.getWorldPosition(position)
        camera.getWorldDirection(direction)
        Ellipsoid.WGS84.getSurfaceNormal(position, up)
        
        // Create rotation for looking left/right (around up vector)
        if (rotY !== 0) {
          rotationQuaternion.setFromAxisAngle(up, rotY * 0.01)
          camera.quaternion.premultiply(rotationQuaternion)
        }
        
        // Create rotation for looking up/down (around right vector)
        if (rotX !== 0) {
          // Recalculate right vector based on current camera orientation
          forward
            .copy(up)
            .multiplyScalar(direction.dot(up))
            .subVectors(direction, forward)
            .normalize()
          right.crossVectors(forward, up).normalize()
          
          rotationQuaternion.setFromAxisAngle(right, rotX * 0.01)
          camera.quaternion.premultiply(rotationQuaternion)
        }
        
        camera.updateMatrixWorld()
      }

      // Handle FOV change
      if (fov !== 0 && camera.type === 'PerspectiveCamera') {
        const perspectiveCamera = camera as PerspectiveCamera
        perspectiveCamera.fov = Math.max(10, Math.min(120, perspectiveCamera.fov + fov * 0.1))
        perspectiveCamera.updateProjectionMatrix()
      }

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
