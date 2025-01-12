precision highp float;

uniform mat4 inverseProjectionMatrix;
uniform mat4 inverseViewMatrix;

layout(location = 0) in vec3 position;

out vec2 vUv;
out vec3 vRayDirection;

void main() {
  vUv = position.xy * 0.5 + 0.5;

  vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);
  vec4 rayDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);
  vRayDirection = rayDirection.xyz;

  gl_Position = vec4(position.xy, 1.0, 1.0);
}
