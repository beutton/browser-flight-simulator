import { useControls, folder } from 'leva'
import { type FolderSettings } from 'leva/dist/declarations/src/types'

export interface TileRetentionControlValues {
  lruCacheSize: number
  tileRetentionTime: number
}

/**
 * Hook to add controls for tile retention settings to the controls panel.
 * 
 * TESTING VERSION: Default values are intentionally set very low to demonstrate
 * the problem of tiles unloading too quickly.
 * 
 * @param initialValues - Initial values for LRU cache size and tile retention time
 * @param folderSettings - Optional settings for the controls folder
 * @returns The current tile retention settings
 */
export function useTileRetentionControls(
  {
    lruCacheSize: initialLruCacheSize = 50, // Intentionally low for testing
    tileRetentionTime: initialTileRetentionTime = 0.5 // Intentionally low for testing (half a second)
  }: Partial<TileRetentionControlValues> = {},
  folderSettings?: FolderSettings
): TileRetentionControlValues {
  const { lruCacheSize, tileRetentionTime } = useControls(
    'tile retention (TESTING: LOW VALUES)',
    {
      lruCacheSize: { 
        value: initialLruCacheSize, 
        min: 10, 
        max: 10000, 
        step: 10,
        label: 'Cache Size (TEST: LOW)'
      },
      tileRetentionTime: { 
        value: initialTileRetentionTime, 
        min: 0, 
        max: 60, 
        step: 0.5,
        label: 'Retention Time (s) (TEST: LOW)'
      },
      testingNote: {
        value: 'Increase values to keep tiles loaded longer',
        editable: false,
        label: '⚠️ TESTING MODE'
      }
    },
    folderSettings
  )
  
  // Log a message about the testing values
  console.log('⚠️ TESTING MODE: Using intentionally low cache size and retention time to demonstrate tile unloading')
  console.log(`Current values: Cache Size = ${lruCacheSize}, Retention Time = ${tileRetentionTime}s`)
  console.log('Try increasing these values to see the difference in tile retention')
  
  return { lruCacheSize, tileRetentionTime }
} 