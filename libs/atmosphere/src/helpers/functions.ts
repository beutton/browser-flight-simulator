import { type AtmosphereParameters } from '../AtmosphereParameters'
import { METER_TO_UNIT_LENGTH } from '../constants'

export function safeSqrt(a: number): number {
  return Math.sqrt(Math.max(a, 0))
}

export function clampDistance(d: number): number {
  return Math.max(d, 0)
}

export function rayIntersectsGround(
  atmosphere: AtmosphereParameters,
  r: number,
  mu: number
): boolean {
  const bottomRadius = atmosphere.bottomRadius * METER_TO_UNIT_LENGTH
  return mu < 0 && r * r * (mu * mu - 1) + bottomRadius * bottomRadius >= 0
}

export function distanceToTopAtmosphereBoundary(
  atmosphere: AtmosphereParameters,
  r: number,
  mu: number
): number {
  const topRadius = atmosphere.topRadius * METER_TO_UNIT_LENGTH
  const discriminant = r * r * (mu * mu - 1) + topRadius * topRadius
  return clampDistance(-r * mu + safeSqrt(discriminant))
}

export function getTextureCoordFromUnitRange(
  x: number,
  textureSize: number
): number {
  return 0.5 / textureSize + x * (1 - 1 / textureSize)
}
