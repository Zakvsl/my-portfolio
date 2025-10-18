import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Mesh, Vector3 } from "three";

// Central sphere with distortion effect
function CentralSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]}>
      <MeshDistortMaterial
        color="#5dd3d3"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#1a4d4d"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

// Orbital rings around the sphere
function OrbitalRing({
  radius,
  speed,
  color,
  offset = 0,
}: {
  radius: number;
  speed: number;
  color: string;
  offset?: number;
}) {
  const ringRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed + offset;
      ringRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// Floating particles around
function FloatingParticle({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const initialPos = useMemo(() => new Vector3(...position), [position]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed;
      meshRef.current.position.x = initialPos.x + Math.sin(time) * 0.5;
      meshRef.current.position.y = initialPos.y + Math.cos(time * 0.7) * 0.5;
      meshRef.current.position.z = initialPos.z + Math.sin(time * 0.5) * 0.5;

      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export const Scene3D = () => {
  // Generate particles positions
  const particles = useMemo(() => {
    const colors = ["#5dd3d3", "#e07856", "#f0db4f", "#61dafb", "#764abc"];
    return Array.from({ length: 20 }, (_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 3 + Math.random() * 1;
      const height = (Math.random() - 0.5) * 4;

      return {
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: colors[i % colors.length],
        speed: 0.3 + Math.random() * 0.4,
      };
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lighting Setup */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#5dd3d3" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#e07856" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#61dafb" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#5dd3d3"
      />

      {/* Central Distorted Sphere */}
      <CentralSphere />

      {/* Orbital Rings */}
      <OrbitalRing radius={2} speed={0.2} color="#5dd3d3" offset={0} />
      <OrbitalRing
        radius={2.5}
        speed={-0.15}
        color="#e07856"
        offset={Math.PI / 2}
      />
      <OrbitalRing radius={3} speed={0.1} color="#61dafb" offset={Math.PI} />

      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <FloatingParticle
          key={index}
          position={particle.position}
          color={particle.color}
          speed={particle.speed}
        />
      ))}

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
};
