import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { SMAA, ToneMapping } from '@react-three/postprocessing'
import {
  GLTFExtensionsPlugin,
  GoogleCloudAuthPlugin,
  TileCompressionPlugin,
  TilesFadePlugin,
  UpdateOnChangePlugin
} from '3d-tiles-renderer/plugins'
import {
  CameraTransition,
  GlobeControls,
  TilesAttributionOverlay,
  TilesPlugin,
  TilesRenderer
} from '3d-tiles-renderer/r3f'
import { useAtomValue } from 'jotai'
import {
  EffectMaterial,
  type EffectComposer as EffectComposerImpl
} from 'postprocessing'
import { Fragment, useLayoutEffect, useRef, type FC } from 'react'
import { DRACOLoader } from 'three-stdlib'

import { TileCreasedNormalsPlugin } from '@takram/three-3d-tiles-support'
import {
  AerialPerspective,
  Atmosphere,
  Sky,
  Stars,
  type AtmosphereApi
} from '@takram/three-atmosphere/r3f'
import { Geodetic, PointOfView, radians } from '@takram/three-geospatial'
import {
  Depth,
  Dithering,
  LensFlare,
  Normal
} from '@takram/three-geospatial-effects/r3f'

import {
  EffectComposer,
  HaldLUT,
  KeyboardNavigationHelper,
  Stats,
  useColorGradingControls,
  useControls,
  useGoogleMapsAPIKeyControls,
  useLocalDateControls,
  usePovControls,
  useToneMappingControls
} from '../helpers'
import { googleMapsApiKeyAtom } from '../helpers/states'
import type { LocalDateControlsParams } from '../helpers/useLocalDateControls'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

const Globe: FC = () => {
  const apiKey = useAtomValue(googleMapsApiKeyAtom)
  return (
    <TilesRenderer
      key={apiKey} // Reconstruct tiles when API key changes.
    >
      {apiKey !== '' ? (
        <TilesPlugin
          plugin={GoogleCloudAuthPlugin}
          args={{
            apiToken: apiKey,
            autoRefreshToken: true
          }}
        />
      ) : (
        <TilesPlugin
          plugin={GoogleCloudAuthPlugin}
          args={{
            apiToken: import.meta.env.STORYBOOK_GOOGLE_MAP_API_KEY,
            autoRefreshToken: true
          }}
        />
      )}
      <TilesPlugin plugin={GLTFExtensionsPlugin} dracoLoader={dracoLoader} />
      <TilesPlugin plugin={TileCompressionPlugin} />
      <TilesPlugin plugin={UpdateOnChangePlugin} />
      <TilesPlugin plugin={TilesFadePlugin} />
      <TilesPlugin
        plugin={TileCreasedNormalsPlugin}
        args={{ creaseAngle: radians(30) }}
      />
      <GlobeControls enableDamping />
      <TilesAttributionOverlay />
    </TilesRenderer>
  )
}

interface SceneProps extends LocalDateControlsParams {
  exposure?: number
  longitude?: number
  latitude?: number
  heading?: number
  pitch?: number
  distance?: number
}

const Scene: FC<SceneProps> = ({
  exposure = 10,
  longitude = 139.7671,
  latitude = 35.6812,
  heading = 180,
  pitch = -30,
  distance = 4500,
  ...localDate
}) => {
  const { toneMappingMode } = useToneMappingControls({ exposure })
  const { orthographic } = useControls(
    'camera',
    { orthographic: false },
    { collapsed: true }
  )
  const lut = useColorGradingControls()
  const { lensFlare, normal, depth } = useControls(
    'effects',
    {
      lensFlare: true,
      depth: false,
      normal: false
    },
    { collapsed: true }
  )
  const motionDate = useLocalDateControls({ longitude, ...localDate })
  const { correctAltitude, correctGeometricError, photometric } = useControls(
    'atmosphere',
    {
      correctAltitude: true,
      correctGeometricError: true,
      photometric: true
    }
  )
  const {
    enable: enabled,
    sun,
    sky,
    transmittance,
    inscatter
  } = useControls('aerial perspective', {
    enable: true,
    sun: true,
    sky: true,
    transmittance: true,
    inscatter: true
  })

  const camera = useThree(({ camera }) => camera)
  useLayoutEffect(() => {
    // Check the camera position to see if we've already moved it to globe surface
    if (camera.position.length() > 10) {
      return
    }

    new PointOfView(distance, radians(heading), radians(pitch)).decompose(
      new Geodetic(radians(longitude), radians(latitude)).toECEF(),
      camera.position,
      camera.quaternion,
      camera.up
    )
  }, [longitude, latitude, heading, pitch, distance, camera])

  // Effects must know the camera near/far changed by GlobeControls.
  const composerRef = useRef<EffectComposerImpl>(null)
  useFrame(() => {
    const composer = composerRef.current
    if (composer != null) {
      composer.passes.forEach(pass => {
        if (pass.fullscreenMaterial instanceof EffectMaterial) {
          pass.fullscreenMaterial.adoptCameraSettings(camera)
        }
      })
    }
  })

  const atmosphereRef = useRef<AtmosphereApi>(null)
  useFrame(() => {
    atmosphereRef.current?.updateByDate(new Date(motionDate.get()))
  })

  return (
    <Atmosphere
      ref={atmosphereRef}
      textures='atmosphere'
      correctAltitude={correctAltitude}
      photometric={photometric}
    >
      <KeyboardNavigationHelper 
        speed={15} 
        autoFocus={true}
        showIndicator={true}
        indicatorPosition="bottom-left"
        customText="WASD + Space/C to navigate"
        indicatorDelay={1000}
      />
      <Sky />
      <Stars data='atmosphere/stars.bin' />
      <Globe />
      <EffectComposer ref={composerRef} multisampling={0}>
        <Fragment
          // Effects are order-dependant; we need to reconstruct the nodes.
          key={JSON.stringify([
            enabled,
            sun,
            sky,
            transmittance,
            inscatter,
            correctGeometricError,
            lensFlare,
            normal,
            depth,
            lut
          ])}
        >
          {enabled && !normal && !depth && (
            <AerialPerspective
              sunIrradiance={sun}
              skyIrradiance={sky}
              transmittance={transmittance}
              inscatter={inscatter}
              correctGeometricError={correctGeometricError}
              irradianceScale={2 / Math.PI}
            />
          )}
          {lensFlare && <LensFlare />}
          {depth && <Depth useTurbo />}
          {normal && <Normal />}
          {!normal && !depth && (
            <>
              <ToneMapping mode={toneMappingMode} />
              {lut != null && <HaldLUT path={lut} />}
              <SMAA />
              <Dithering />
            </>
          )}
        </Fragment>
      </EffectComposer>
      <CameraTransition mode={orthographic ? 'orthographic' : 'perspective'} />
    </Atmosphere>
  )
}

export const Story: FC<SceneProps> = props => {
  useGoogleMapsAPIKeyControls()
  return (
    <Canvas gl={{ depth: false }} frameloop='demand'>
      <Stats />
      <Scene {...props} />
    </Canvas>
  )
}

export default Story
