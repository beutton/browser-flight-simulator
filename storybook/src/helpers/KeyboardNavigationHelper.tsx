import { useThree } from '@react-three/fiber'
import { useEffect, useState, type FC } from 'react'

import { useKeyboardControl, type KeyboardControlOptions } from './useKeyboardControl'

export interface KeyboardNavigationHelperProps extends KeyboardControlOptions {
  showIndicator?: boolean
  indicatorPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  customText?: string
  indicatorDelay?: number
  fovStep?: number
}

/**
 * A reusable component that adds keyboard navigation controls to a scene.
 * 
 * Usage:
 * ```jsx
 * <Canvas>
 *   <Scene />
 *   <KeyboardNavigationHelper />
 * </Canvas>
 * ```
 */
export const KeyboardNavigationHelper: FC<KeyboardNavigationHelperProps> = ({
  speed = 10,
  rotationSpeed = 1,
  enabled = true,
  autoFocus = true,
  showIndicator = true,
  indicatorPosition = 'bottom-left',
  customText,
  indicatorDelay = 500,
  fovStep = 5
}) => {
  const { camera, controls } = useThree()
  const [isReady, setIsReady] = useState(false)
  const [initStatus, setInitStatus] = useState<'waiting' | 'initializing' | 'ready' | 'failed'>('waiting')
  
  // Only enable keyboard controls when camera and controls are ready
  const actualEnabled = enabled && isReady
  
  const { isActive } = useKeyboardControl({
    speed,
    rotationSpeed,
    enabled: actualEnabled,
    autoFocus,
    fovStep
  })

  // Check if the scene is ready for keyboard controls
  useEffect(() => {
    if (!camera || !controls) {
      setInitStatus('waiting')
      return
    }
    
    setInitStatus('initializing')
    
    // For GlobeControls, we need to wait longer
    const isGlobeControls = (controls as { isGlobeControls?: boolean })?.isGlobeControls === true
    const timeoutDuration = isGlobeControls ? Math.max(indicatorDelay, 1000) : indicatorDelay
    
    // Check if camera is properly set up
    const isCameraReady = () => {
      try {
        // Test if we can access camera properties without errors
        if (!camera.matrixWorldInverse) return false
        return true
      } catch (error) {
        return false
      }
    }
    
    // Wait for camera and controls to be ready
    const timeoutId = setTimeout(() => {
      if (isCameraReady()) {
        setIsReady(true)
        setInitStatus('ready')
      } else {
        // Try again in a bit
        setTimeout(() => {
          if (isCameraReady()) {
            setIsReady(true)
            setInitStatus('ready')
          } else {
            setInitStatus('failed')
            console.warn('Failed to initialize keyboard controls - camera not ready')
          }
        }, 1000)
      }
    }, timeoutDuration)
    
    return () => clearTimeout(timeoutId)
  }, [camera, controls, indicatorDelay])

  useEffect(() => {
    if (!showIndicator) return

    // Create or update the indicator
    const addKeyboardIndicator = () => {
      let indicator = document.getElementById('keyboard-control-indicator')
      if (!indicator) {
        indicator = document.createElement('div')
        indicator.id = 'keyboard-control-indicator'
        indicator.style.position = 'fixed'
        indicator.style.padding = '8px 12px'
        indicator.style.borderRadius = '4px'
        indicator.style.fontSize = '12px'
        indicator.style.fontFamily = 'monospace'
        indicator.style.zIndex = '1000'
        indicator.style.transition = 'all 0.3s ease'
        indicator.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)'
        document.body.appendChild(indicator)
      }

      // Set position based on indicatorPosition prop
      switch (indicatorPosition) {
        case 'top-left':
          indicator.style.top = '10px'
          indicator.style.left = '10px'
          break
        case 'top-right':
          indicator.style.top = '10px'
          indicator.style.right = '10px'
          break
        case 'bottom-right':
          indicator.style.bottom = '10px'
          indicator.style.right = '10px'
          break
        case 'bottom-left':
        default:
          indicator.style.bottom = '10px'
          indicator.style.left = '10px'
      }
      
      // Set text and styles based on initialization status and active state
      let statusText = customText || `WASD + Space/C to fly (speed: ${speed}), Arrow keys to rotate (speed: ${rotationSpeed}), Q/E to adjust FOV`
      let statusColor = 'rgba(0, 0, 0, 0.5)'
      
      switch (initStatus) {
        case 'waiting':
          statusText = 'Waiting for scene...'
          statusColor = 'rgba(255, 165, 0, 0.8)'
          break
        case 'initializing':
          statusText = 'Initializing controls...'
          statusColor = 'rgba(255, 165, 0, 0.8)'
          break
        case 'failed':
          statusText = 'Controls initialization failed'
          statusColor = 'rgba(255, 0, 0, 0.8)'
          break
        case 'ready':
          statusColor = isActive ? 'rgba(0, 128, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)'
          break
      }
      
      indicator.textContent = statusText
      indicator.style.backgroundColor = statusColor
      indicator.style.color = '#ffffff'
      indicator.style.opacity = isActive || initStatus !== 'ready' ? '1' : '0.7'
      indicator.style.transform = isActive ? 'scale(1.05)' : 'scale(1)'
    }
    
    addKeyboardIndicator()
    
    return () => {
      if (!showIndicator) return
      const indicator = document.getElementById('keyboard-control-indicator')
      if (indicator) {
        indicator.remove()
      }
    }
  }, [isActive, showIndicator, indicatorPosition, customText, initStatus, speed, rotationSpeed])

  return null
}

export default KeyboardNavigationHelper 