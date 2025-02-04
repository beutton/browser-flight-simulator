import { type TypedArray, type TypedArrayConstructor } from './typedArray'

let hostLittleEndian: boolean | undefined

function isHostLittleEndian(): boolean {
  if (hostLittleEndian != null) {
    return hostLittleEndian
  }
  const a = new Uint32Array([0x10000000])
  const b = new Uint8Array(a.buffer, a.byteOffset, a.byteLength)
  return b[0] === 0
}

type GetValue = keyof {
  [K in keyof DataView as DataView[K] extends (byteOffset: number) => number
    ? K
    : never]: DataView[K]
}

function parseTypedArray<T extends TypedArrayConstructor, K extends GetValue>(
  buffer: ArrayBuffer,
  TypedArray: T,
  getValue: K,
  littleEndian?: boolean
): InstanceType<T>

function parseTypedArray<K extends GetValue>(
  buffer: ArrayBuffer,
  TypedArray: TypedArrayConstructor,
  getValue: K,
  littleEndian = true
): TypedArray {
  if (littleEndian === isHostLittleEndian()) {
    return new TypedArray(buffer)
  }
  const data = new DataView(buffer)
  const array = new TypedArray(data.byteLength / TypedArray.BYTES_PER_ELEMENT)
  for (
    let index = 0, byteIndex = 0;
    index < array.length;
    ++index, byteIndex += TypedArray.BYTES_PER_ELEMENT
  ) {
    array[index] = data[getValue](byteIndex, littleEndian)
  }
  return array
}

export type TypedArrayParser<T extends TypedArray> = (
  buffer: ArrayBuffer,
  littleEndian?: boolean
) => T

export const parseUint8Array: TypedArrayParser<Uint8Array> = buffer =>
  new Uint8Array(buffer)

export const parseInt8Array: TypedArrayParser<Int8Array> = buffer =>
  new Int8Array(buffer)

export const parseUint16Array: TypedArrayParser<Uint16Array> = (
  buffer,
  littleEndian
) => parseTypedArray(buffer, Uint16Array, 'getUint16', littleEndian)

export const parseInt16Array: TypedArrayParser<Int16Array> = (
  buffer,
  littleEndian
) => parseTypedArray(buffer, Int16Array, 'getInt16', littleEndian)

export const parseInt32Array: TypedArrayParser<Int32Array> = (
  buffer,
  littleEndian
) => parseTypedArray(buffer, Int32Array, 'getInt32', littleEndian)

export const parseUint32Array: TypedArrayParser<Uint32Array> = (
  buffer,
  littleEndian
) => parseTypedArray(buffer, Uint32Array, 'getUint32', littleEndian)

export const parseFloat32Array: TypedArrayParser<Float32Array> = (
  buffer,
  littleEndian
) => parseTypedArray(buffer, Float32Array, 'getFloat32', littleEndian)

export const parseFloat64Array: TypedArrayParser<Float64Array> = (
  buffer,
  littleEndian
) => parseTypedArray(buffer, Float64Array, 'getFloat64', littleEndian)
