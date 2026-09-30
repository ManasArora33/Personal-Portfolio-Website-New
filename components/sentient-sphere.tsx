"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { MathUtils } from "three";
import type { Mesh, ShaderMaterial } from "three";
import { useMemo, useRef } from "react";

const vertexShader = `
  uniform float uTime;
  varying float vWave;
  varying vec3 vNormal;

  void main() {
    float waveA = sin(position.y * 3.2 + uTime * 0.7) * 0.09;
    float waveB = sin(position.x * 4.1 - uTime * 0.5) * 0.06;
    float waveC = cos(position.z * 3.6 + uTime * 0.35) * 0.05;
    float displacement = waveA + waveB + waveC;
    vec3 transformed = position + normal * displacement;
    vWave = displacement;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying float vWave;
  varying vec3 vNormal;

  void main() {
    float edge = 1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
    float pulse = 0.78 + sin(uTime * 0.8) * 0.12;
    vec3 paper = vec3(0.96, 0.94, 0.89);
    vec3 signal = vec3(0.84, 1.0, 0.25);
    vec3 color = mix(paper, signal, clamp(edge + vWave * 2.0, 0.0, 1.0));
    gl_FragColor = vec4(color * pulse, 0.82);
  }
`;

function SphereMesh({ animate }: { animate: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { pointer } = useThree();
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    if (animate) materialRef.current.uniforms.uTime.value += delta;
    meshRef.current.rotation.y += animate ? delta * 0.08 : 0;
    meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.24, 0.055);
    meshRef.current.rotation.z = MathUtils.lerp(meshRef.current.rotation.z, -pointer.x * 0.24, 0.055);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.72, 18]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          wireframe
        />
      </mesh>
      <mesh scale={0.74} rotation={[0.4, 0.3, 0]}>
        <icosahedronGeometry args={[1.72, 6]} />
        <meshBasicMaterial color="#d6ff3f" wireframe transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

export function SentientSphere() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="sphere-canvas" data-cursor="explore" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SphereMesh animate={!reduceMotion} />
      </Canvas>
      <div className="sphere-reticle sphere-reticle--x" />
      <div className="sphere-reticle sphere-reticle--y" />
      <span className="sphere-coordinate sphere-coordinate--one">X 24.08</span>
      <span className="sphere-coordinate sphere-coordinate--two">Y 07.31</span>
    </div>
  );
}