import { useFrame, type Node } from '@react-three/fiber'
import { EffectComposerContext } from '@react-three/postprocessing'
import { useAtomValue } from 'jotai'
import { RenderPass, type BlendFunction } from 'postprocessing'
import { forwardRef, useContext, useEffect, useMemo } from 'react'
import { Texture } from 'three'

import {
  AerialPerspectiveEffect,
  aerialPerspectiveEffectOptionsDefaults,
  type AerialPerspectiveEffectOptions
} from '../AerialPerspectiveEffect'
import { AtmosphereContext } from './Atmosphere'
import { separateProps } from './separateProps'

export type AerialPerspectiveProps = Node<
  InstanceType<typeof AerialPerspectiveEffect>,
  AerialPerspectiveEffect
> &
  AerialPerspectiveEffectOptions & {
    blendFunction?: BlendFunction
    opacity?: number
  }

export const AerialPerspective = /*#__PURE__*/ forwardRef<
  AerialPerspectiveEffect,
  AerialPerspectiveProps
>(function AerialPerspective(props, forwardedRef) {
  const { textures, transientStates, atoms, ...contextProps } =
    useContext(AtmosphereContext)

  const [atmosphereParameters, { blendFunction, ...others }] = separateProps({
    ...aerialPerspectiveEffectOptionsDefaults,
    ...contextProps,
    ...textures,
    ...props
  })

  const context = useContext(EffectComposerContext)
  const { normalPass, camera } = context
  const geometryTexture =
    'geometryPass' in context &&
    context.geometryPass instanceof RenderPass &&
    'geometryTexture' in context.geometryPass &&
    context.geometryPass.geometryTexture instanceof Texture
      ? context.geometryPass.geometryTexture
      : undefined

  const effect = useMemo(
    () => new AerialPerspectiveEffect(undefined, { blendFunction }),
    [blendFunction]
  )

  useEffect(() => {
    return () => {
      effect.dispose()
    }
  }, [effect])

  const composite = useAtomValue(atoms.compositeAtom)
  useEffect(() => {
    effect.composite = composite
  }, [effect, composite])

  const shadow = useAtomValue(atoms.shadowAtom)
  useEffect(() => {
    effect.shadow = shadow
  }, [effect, shadow])

  const shadowLength = useAtomValue(atoms.shadowLengthAtom)
  useEffect(() => {
    effect.shadowLength = shadowLength
  }, [effect, shadowLength])

  useFrame(() => {
    if (transientStates != null) {
      effect.sunDirection.copy(transientStates.sunDirection)
      effect.moonDirection.copy(transientStates.moonDirection)
      effect.ellipsoidCenter.copy(transientStates.ellipsoidCenter)
      effect.ellipsoidMatrix.copy(transientStates.ellipsoidMatrix)
    }
  })

  return (
    <primitive
      ref={forwardedRef}
      object={effect}
      mainCamera={camera}
      normalBuffer={geometryTexture ?? normalPass?.texture ?? null}
      {...atmosphereParameters}
      {...others}
      octEncodedNormal={geometryTexture != null}
    />
  )
})
