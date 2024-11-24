import { DirectionalLight, Vector3, type DataTexture } from 'three'

import { Ellipsoid } from '@geovanni/core'

import { AtmosphereParameters } from './AtmosphereParameters'
import { computeSunLightColor } from './computeSunLightColor'

const vectorScratch = /*#__PURE__*/ new Vector3()

export interface DirectionalSunLightParameters {
  transmittanceTexture?: DataTexture | null
  ellipsoid?: Ellipsoid
  osculateEllipsoid?: boolean
  photometric?: boolean
  worldPosition?: Vector3
  direction?: Vector3
}

export const directionalSunLightParametersDefaults = {
  ellipsoid: Ellipsoid.WGS84,
  osculateEllipsoid: true,
  photometric: true
} satisfies DirectionalSunLightParameters

export class DirectionalSunLight extends DirectionalLight {
  private readonly atmosphere: AtmosphereParameters
  transmittanceTexture: DataTexture | null
  ellipsoid: Ellipsoid
  osculateEllipsoid: boolean
  photometric: boolean
  readonly direction: Vector3

  constructor(
    params?: DirectionalSunLightParameters,
    atmosphere = AtmosphereParameters.DEFAULT
  ) {
    super()
    const {
      irradianceTexture = null,
      ellipsoid,
      osculateEllipsoid,
      photometric,
      direction
    } = { ...directionalSunLightParametersDefaults, ...params }

    this.atmosphere = atmosphere
    this.transmittanceTexture = irradianceTexture
    this.ellipsoid = ellipsoid
    this.osculateEllipsoid = osculateEllipsoid
    this.photometric = photometric
    this.direction = direction?.clone() ?? new Vector3()
  }

  update(): void {
    this.position.copy(this.direction).normalize().add(this.target.position)

    if (this.transmittanceTexture == null) {
      return
    }
    computeSunLightColor(
      this.transmittanceTexture,
      this.target.getWorldPosition(vectorScratch),
      this.direction,
      this.color,
      {
        ellipsoid: this.ellipsoid,
        osculateEllipsoid: this.osculateEllipsoid,
        photometric: this.photometric
      },
      this.atmosphere
    )
  }
}
