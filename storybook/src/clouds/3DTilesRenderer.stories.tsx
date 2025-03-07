import { type Meta, type StoryFn } from '@storybook/react'

import { Story } from './3DTilesRenderer-Story'

export default {
  title: 'clouds/3D Tiles Renderer Integration',
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta

export const Tokyo: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={7.5}
    exposure={10}
    longitude={139.8146}
    latitude={35.7455}
    heading={-110}
    pitch={-9}
    distance={1000}
    coverage={0.35}
  />
)

export const Fuji: StoryFn = () => (
  <Story
    dayOfYear={200}
    timeOfDay={17.5}
    exposure={10}
    longitude={138.634}
    latitude={35.5}
    heading={-91}
    pitch={-27}
    distance={8444}
    coverage={0.4}
  />
)

export const London: StoryFn = () => (
  <Story
    dayOfYear={0}
    timeOfDay={11}
    exposure={15}
    longitude={-0.1293}
    latitude={51.4836}
    heading={-94}
    pitch={-7}
    distance={3231}
    coverage={0.45}
  />
)

// Top 20 US Cities

export const NewYorkCity: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-73.940}
    latitude={40.670}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const LosAngeles: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-118.410}
    latitude={34.110}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Chicago: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-87.680}
    latitude={41.840}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Houston: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-95.464}
    latitude={29.741}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Phoenix: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-112.070}
    latitude={33.540}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Philadelphia: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-75.130}
    latitude={40.010}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const SanAntonio: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-98.510}
    latitude={29.460}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const SanDiego: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-117.140}
    latitude={32.810}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Dallas: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-96.770}
    latitude={32.790}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const SanJose: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-121.850}
    latitude={37.300}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Austin: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-97.750}
    latitude={30.310}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Jacksonville: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-81.660}
    latitude={30.330}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const FortWorth: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-97.340}
    latitude={32.750}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Columbus: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-82.990}
    latitude={39.990}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Charlotte: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-80.830}
    latitude={35.200}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Indianapolis: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-86.150}
    latitude={39.780}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const SanFrancisco: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-122.450}
    latitude={37.770}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Seattle: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-122.350}
    latitude={47.620}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Denver: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-104.870}
    latitude={39.770}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const WashingtonDC: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-77.020}
    latitude={38.910}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

// 10 More American Cities

export const Nashville: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-86.780}
    latitude={36.170}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const OklahomaCity: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-97.510}
    latitude={35.470}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Boston: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-71.020}
    latitude={42.340}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const ElPaso: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-106.440}
    latitude={31.850}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Portland: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-122.660}
    latitude={45.540}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const LasVegas: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-115.220}
    latitude={36.210}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Memphis: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-90.010}
    latitude={35.110}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Detroit: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-83.100}
    latitude={42.380}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Baltimore: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-76.612}
    latitude={39.290}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Louisville: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-85.758}
    latitude={38.253}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

// Top 20 European Cities

export const Istanbul: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={28.979}
    latitude={41.008}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Moscow: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={37.618}
    latitude={55.751}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Paris: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={2.352}
    latitude={48.857}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Berlin: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={13.405}
    latitude={52.520}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Madrid: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={-3.703}
    latitude={40.416}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Rome: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={12.496}
    latitude={41.902}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Kyiv: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={30.523}
    latitude={50.450}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Vienna: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={16.363}
    latitude={48.209}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Hamburg: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={9.993}
    latitude={53.551}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Warsaw: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={21.012}
    latitude={52.230}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Budapest: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={19.040}
    latitude={47.498}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Barcelona: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={2.170}
    latitude={41.387}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Munich: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={11.582}
    latitude={48.135}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Milan: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={9.190}
    latitude={45.464}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Prague: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={14.418}
    latitude={50.088}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Sofia: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={23.322}
    latitude={42.698}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Brussels: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={4.351}
    latitude={50.847}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Amsterdam: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={4.890}
    latitude={52.374}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Athens: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={23.727}
    latitude={37.983}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Stockholm: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={18.068}
    latitude={59.329}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

// Top 20 Asian Cities

export const TokyoCity: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={139.692}
    latitude={35.690}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Shanghai: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={121.473}
    latitude={31.230}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Beijing: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={116.407}
    latitude={39.904}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const DelhiCity: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={77.209}
    latitude={28.614}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const MumbaiCity: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={72.878}
    latitude={19.076}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Guangzhou: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={113.264}
    latitude={23.129}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Shenzhen: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={114.057}
    latitude={22.543}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const SeoulCity: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={126.978}
    latitude={37.566}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Jakarta: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={106.865}
    latitude={-6.175}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Chengdu: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={104.066}
    latitude={30.573}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Karachi: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={67.009}
    latitude={24.861}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Bangkok: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={100.501}
    latitude={13.754}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const HoChiMinhCity: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={106.629}
    latitude={10.823}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Kolkata: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={88.363}
    latitude={22.573}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Manila: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={120.984}
    latitude={14.599}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Tianjin: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={117.200}
    latitude={39.084}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Bangalore: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={77.594}
    latitude={12.972}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Tehran: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={51.389}
    latitude={35.690}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Lahore: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={74.329}
    latitude={31.550}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)

export const Osaka: StoryFn = () => (
  <Story
    dayOfYear={170}
    timeOfDay={10}
    exposure={10}
    longitude={135.502}
    latitude={34.693}
    heading={-90}
    pitch={-10}
    distance={2000}
    coverage={0.4}
  />
)
