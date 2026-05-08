"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function AnimatedSphere({ load, isFocus }: { load: number, isFocus: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Calculate stress color based on cognitive load
  const color = useMemo(() => {
    if (isFocus) return "#ffffff"; // Pure calm white
    if (load > 80) return "#ff4d4d"; // Stressed red
    if (load > 50) return "#4d94ff"; // Moderate blue
    return "#888888"; // Idle grey
  }, [load, isFocus]);

  const speed = isFocus ? 0.5 : (load / 20);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4 + (load / 200)}
          speed={speed}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={isFocus ? 0.2 : (load / 100)}
        />
      </Sphere>
    </Float>
  );
}

export default function ZenSphere({ load = 24, isFocus = false }: { load?: number, isFocus?: boolean }) {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <AnimatedSphere load={load} isFocus={isFocus} />
      </Canvas>
    </div>
  );
}
