import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.2;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.4}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#111111"
          metalness={0.95}
          roughness={0.15}
          distort={0.35}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

function Orb({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#e5e5e5"
          metalness={0.9}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#ffffff" />
        <Knot />
        <Orb position={[-2.6, 1.4, -1]} scale={0.7} />
        <Orb position={[2.8, -1.2, -0.5]} scale={0.5} />
        <Orb position={[2.2, 1.8, -2]} scale={0.4} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
