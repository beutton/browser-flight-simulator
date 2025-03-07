import { type FolderSettings } from 'leva/dist/declarations/src/types'

import { useControls } from './useControls'

export interface KeyboardSpeedControlValues {
  movementSpeed: number
  rotationSpeed: number
}

/**
 * Hook to add sliders for keyboard movement and rotation speeds to the controls panel.
 * 
 * @param initialValues - Initial values for movement and rotation speeds
 * @param folderSettings - Optional settings for the controls folder
 * @returns The current movement and rotation speed values
 */
export function useKeyboardSpeedControls(
  {
    movementSpeed: initialMovementSpeed = 10,
    rotationSpeed: initialRotationSpeed = 1
  }: Partial<KeyboardSpeedControlValues> = {},
  folderSettings?: FolderSettings
): KeyboardSpeedControlValues {
  const { movementSpeed, rotationSpeed } = useControls(
    'keyboard controls',
    {
      movementSpeed: { 
        value: initialMovementSpeed, 
        min: 1, 
        max: 50, 
        step: 1,
        label: 'WASD Speed'
      },
      rotationSpeed: { 
        value: initialRotationSpeed, 
        min: 0.1, 
        max: 5, 
        step: 0.1,
        label: 'Arrow Keys Speed'
      }
    },
    folderSettings
  )
  return { movementSpeed, rotationSpeed }
} 