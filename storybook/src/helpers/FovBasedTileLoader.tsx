import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState, useCallback } from 'react'
import { PerspectiveCamera, Object3D } from 'three'

import { useKeyboardControl } from './useKeyboardControl'

export interface FovBasedTileLoaderProps {
  /**
   * The FOV threshold below which high-detail tiles should be loaded
   * Lower FOV values mean more zoomed in
   */
  fovThreshold?: number
  
  /**
   * The error target to use when zoomed in (lower values = higher detail)
   */
  zoomedInErrorTarget?: number
  
  /**
   * The error target to use when zoomed out (higher values = lower detail)
   */
  zoomedOutErrorTarget?: number
  
  /**
   * Keyboard movement speed
   */
  movementSpeed?: number
  
  /**
   * Keyboard rotation speed
   */
  rotationSpeed?: number
  
  /**
   * Whether keyboard controls are enabled
   */
  enabled?: boolean
  
  /**
   * Whether to auto-focus the canvas
   */
  autoFocus?: boolean
  
  /**
   * Step size for FOV changes
   */
  fovStep?: number
  
  /**
   * Debounce time in milliseconds for FOV changes
   */
  debounceTime?: number
  
  /**
   * Whether to log debug information
   */
  debug?: boolean
}

// Interface for objects with setErrorTarget method
interface TilesRendererLike {
  setErrorTarget: (errorTarget: number) => void
}

// Type for cached TilesRenderer instances
interface TilesRendererInstance {
  object: Object3D
  setErrorTarget: (errorTarget: number) => void
}

/**
 * Component that adjusts the TilesRenderer error target based on camera FOV
 * to load higher detail tiles when zoomed in.
 */
export function FovBasedTileLoader({
  fovThreshold = 45,
  zoomedInErrorTarget = 2,
  zoomedOutErrorTarget = 16,
  movementSpeed = 10,
  rotationSpeed = 1,
  enabled = true,
  autoFocus = true,
  fovStep = 5,
  debounceTime = 200,
  debug = false
}: FovBasedTileLoaderProps): null {
  const { camera, scene } = useThree()
  
  // Use refs for values that don't need to trigger re-renders
  const isZoomedInRef = useRef(false)
  const tilesRenderersRef = useRef<TilesRendererInstance[]>([])
  const lastUpdateTimeRef = useRef(0)
  const timeoutIdRef = useRef<number | null>(null)
  
  // Find and cache TilesRenderer instances
  const findTilesRenderers = useCallback(() => {
    const tilesRenderers: TilesRendererInstance[] = []
    
    scene.traverse((object) => {
      // Check for TilesRenderer in userData
      if (object.userData) {
        // Case 1: Direct TilesRenderer with setErrorTarget method
        if (typeof object.userData.setErrorTarget === 'function') {
          tilesRenderers.push({
            object,
            setErrorTarget: object.userData.setErrorTarget
          })
        }
        // Case 2: Object with tilesRenderer property
        else if (object.userData.tilesRenderer && 
                typeof object.userData.tilesRenderer.setErrorTarget === 'function') {
          tilesRenderers.push({
            object,
            setErrorTarget: object.userData.tilesRenderer.setErrorTarget
          })
        }
        // Case 3: Object marked as TilesRenderer
        else if (object.userData.isTilesRenderer && 
                typeof (object as unknown as TilesRendererLike).setErrorTarget === 'function') {
          tilesRenderers.push({
            object,
            setErrorTarget: (object as unknown as TilesRendererLike).setErrorTarget
          })
        }
      }
      
      // Check for objects with TilesRenderer in name
      if (object.name && 
          object.name.includes('TilesRenderer') && 
          typeof (object as unknown as TilesRendererLike).setErrorTarget === 'function') {
        tilesRenderers.push({
          object,
          setErrorTarget: (object as unknown as TilesRendererLike).setErrorTarget
        })
      }
    })
    
    if (debug && tilesRenderers.length > 0) {
      console.log(`FovBasedTileLoader: Found ${tilesRenderers.length} TilesRenderer instances`)
    }
    
    return tilesRenderers
  }, [scene, debug])
  
  // Update error targets on all found TilesRenderer instances
  const updateErrorTargets = useCallback((isZoomedIn: boolean) => {
    const errorTarget = isZoomedIn ? zoomedInErrorTarget : zoomedOutErrorTarget
    const tilesRenderers = tilesRenderersRef.current
    
    // If no TilesRenderers are cached, find them first
    if (tilesRenderers.length === 0) {
      tilesRenderersRef.current = findTilesRenderers()
    }
    
    // Update all found TilesRenderers
    tilesRenderersRef.current.forEach(({ setErrorTarget }) => {
      setErrorTarget(errorTarget)
    })
    
    if (debug) {
      console.log(`FovBasedTileLoader: Set error target to ${errorTarget} (zoomed ${isZoomedIn ? 'in' : 'out'})`)
    }
  }, [zoomedInErrorTarget, zoomedOutErrorTarget, findTilesRenderers, debug])
  
  // Debounced FOV change handler
  const handleFovChange = useCallback((fov: number) => {
    const now = Date.now()
    const shouldBeZoomedIn = fov < fovThreshold
    
    // Clear any existing timeout
    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
    }
    
    // Only update if the zoom state has changed or it's been a while since the last update
    if (shouldBeZoomedIn !== isZoomedInRef.current || now - lastUpdateTimeRef.current > 1000) {
      // Set a timeout to debounce rapid FOV changes
      timeoutIdRef.current = window.setTimeout(() => {
        isZoomedInRef.current = shouldBeZoomedIn
        updateErrorTargets(shouldBeZoomedIn)
        lastUpdateTimeRef.current = now
        timeoutIdRef.current = null
      }, debounceTime)
    }
  }, [fovThreshold, updateErrorTargets, debounceTime])
  
  // Set up keyboard controls with our FOV change handler
  useKeyboardControl({
    speed: movementSpeed,
    rotationSpeed,
    enabled,
    autoFocus,
    fovStep,
    onFovChange: handleFovChange
  })
  
  // Check initial FOV and set up scene
  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      // Initialize with current FOV
      const initialZoom = camera.fov < fovThreshold
      isZoomedInRef.current = initialZoom
      
      // Find TilesRenderer instances
      tilesRenderersRef.current = findTilesRenderers()
      
      // Set initial error targets
      updateErrorTargets(initialZoom)
    }
    
    // Clean up timeout on unmount
    return () => {
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current)
      }
    }
  }, [camera, fovThreshold, findTilesRenderers, updateErrorTargets])
  
  // Check for new TilesRenderer instances periodically (not every frame)
  useFrame(({ clock }) => {
    // Only check for new TilesRenderer instances every 2 seconds
    if (Math.floor(clock.getElapsedTime()) % 2 === 0 && 
        clock.getElapsedTime() - lastUpdateTimeRef.current > 1.9) {
      tilesRenderersRef.current = findTilesRenderers()
      lastUpdateTimeRef.current = clock.getElapsedTime()
    }
  })
  
  return null
} 