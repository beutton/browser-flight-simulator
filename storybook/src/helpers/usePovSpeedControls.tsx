import { type FolderSettings } from 'leva/dist/declarations/src/types'

import { useControls } from './useControls'

export interface PovSpeedControlValues {
  povChangeSpeed: number
}

/**
 * Hook to add a slider for controlling the speed of POV changes when using hotkeys.
 * 
 * @param initialValues - Initial value for POV change speed
 * @param folderSettings - Optional settings for the controls folder
 * @returns The current POV change speed value
 */
export function usePovSpeedControls(
  {
    povChangeSpeed: initialPovChangeSpeed = 5
  }: Partial<PovSpeedControlValues> = {},
  folderSettings?: FolderSettings
): PovSpeedControlValues {
  const { povChangeSpeed } = useControls(
    'POV controls',
    {
      povChangeSpeed: { 
        value: initialPovChangeSpeed, 
        min: 1, 
        max: 20, 
        step: 0.5,
        label: 'POV Change Speed'
      }
    },
    folderSettings
  )
  return { povChangeSpeed }
} 