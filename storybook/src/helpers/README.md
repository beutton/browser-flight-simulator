# Keyboard Navigation Components

This directory contains components and hooks for implementing keyboard navigation in the Three-Geospatial project.

## KeyboardNavigationHelper

A simple component that adds keyboard navigation controls to a scene. It handles focus management and provides visual feedback to the user.

### Usage

```jsx
import { KeyboardNavigationHelper } from '../helpers'

// Inside your component
return (
  <Canvas>
    <Scene />
    <Globe />
    <KeyboardNavigationHelper 
      speed={15} 
      autoFocus={true}
      showIndicator={true}
      indicatorPosition="bottom-left"
      customText="WASD + Space/C to navigate"
      indicatorDelay={1000} 
    />
  </Canvas>
)
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | number | 10 | Movement speed |
| `enabled` | boolean | true | Whether keyboard controls are enabled |
| `autoFocus` | boolean | true | Whether to automatically focus the canvas on mount and click |
| `showIndicator` | boolean | true | Whether to show the keyboard controls indicator |
| `indicatorPosition` | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'bottom-left' | Position of the indicator |
| `customText` | string | 'WASD + Space/C to fly' | Custom text to display in the indicator |
| `indicatorDelay` | number | 500 | Delay in milliseconds before enabling controls to ensure proper initialization |

## useKeyboardControl

A hook that implements keyboard navigation controls. It handles focus management and returns the active state.

### Usage

```jsx
import { useKeyboardControl } from '../helpers'

// Inside your component
const { isActive, setActive } = useKeyboardControl({
  speed: 15,
  enabled: true,
  autoFocus: true
})

// You can use isActive to conditionally render UI elements
return isActive ? <ActiveUI /> : <InactiveUI />
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `speed` | number | 10 | Movement speed |
| `rotationSpeed` | number | 1 | Rotation speed |
| `enabled` | boolean | true | Whether keyboard controls are enabled |
| `autoFocus` | boolean | true | Whether to automatically focus the canvas on mount and click |
| `fovStep` | number | 5 | Step size for FOV changes |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `isActive` | boolean | Whether keyboard controls are currently active |
| `setActive` | (active: boolean) => void | Function to manually set the active state |

## Controls

The keyboard controls use the following keys:

- `W` - Move forward
- `A` - Move left
- `S` - Move backward
- `D` - Move right
- `Space` - Move up
- `C` - Move down
- `Arrow Up` - Look down
- `Arrow Down` - Look up
- `Arrow Left` - Look left
- `Arrow Right` - Look right
- `Q` - Decrease field of view (zoom in)
- `E` - Increase field of view (zoom out)

## Focus Management

The keyboard controls only work when the canvas has focus. The component and hook handle focus management automatically:

1. The canvas is made focusable by adding a `tabindex="0"` attribute
2. The canvas is focused automatically on mount if `autoFocus` is true
3. The canvas is focused when clicked if `autoFocus` is true
4. The canvas is focused when a key is pressed if `autoFocus` is true and the canvas is not already focused

## Initialization and Error Handling

The keyboard controls include robust initialization and error handling to prevent common issues:

1. **Delayed Initialization**: Controls are only enabled after a delay to ensure all Three.js components are properly initialized
2. **Camera and Controls Checks**: The hook verifies that camera and controls are available before attempting to use them
3. **Error Catching**: All operations that might fail are wrapped in try/catch blocks to prevent crashes
4. **Visual Feedback**: The indicator shows different status messages during initialization phases:
   - "Waiting for scene..." - When camera or controls are not yet available
   - "Initializing controls..." - When waiting for camera and controls to be fully initialized
   - "Controls initialization failed" - If initialization fails after retries
5. **Null Checks**: The hook checks for null values before accessing properties to prevent "Cannot read property of null" errors

For GlobeControls specifically, the hook:
1. Checks if controls is a GlobeControls instance
2. Verifies that adjustCamera method exists
3. Ensures camera.matrixWorldInverse is not null before calling adjustCamera
4. Catches and logs any errors that occur during camera adjustment
5. Uses a longer initialization delay for GlobeControls (1500ms minimum)
6. Performs multiple initialization attempts if the first one fails

## Component Order

When using with GlobeControls, it's important to add components in the correct order:

```jsx
<Atmosphere>
  {/* Add Globe component first */}
  <Globe />
  
  {/* Then add KeyboardNavigationHelper */}
  <KeyboardNavigationHelper />
  
  {/* Other components */}
</Atmosphere>
```

This ensures that GlobeControls is properly initialized before the keyboard controls try to use it.

## Troubleshooting

If you encounter issues with the keyboard controls:

1. **Increase the `indicatorDelay`**: If controls fail to initialize properly, try increasing the delay (e.g., to 1000ms or higher)
2. **Check the console for warnings**: The hook logs warnings when errors occur
3. **Ensure GlobeControls is properly initialized**: The controls should be added to the scene before the KeyboardNavigationHelper 