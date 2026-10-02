import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Torus, Grid, Float } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Central rotating wireframe cube with glowing core ---------- */
function TechCube() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.28;
      outerRef.current.rotation.y = t * 0.42;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.35;
      innerRef.current.rotation.y = -t * 0.5;
      const s = 0.62 + Math.sin(t * 1.8) * 0.03;
      innerRef.current.scale.setScalar(s);
    }
  });

  // 8 cube corners
  const corners = useMemo(
    () => [
      [0.8, 0.8, 0.8],
      [-0.8, 0.8, 0.8],
      [0.8, -0.8, 0.8],
      [-0.8, -0.8, 0.8],
      [0.8, 0.8, -0.8],
      [-0.8, 0.8, -0.8],
      [0.8, -0.8, -0.8],
      [-0.8, -0.8, -0.8],
    ],
    [],
  );

  return (
    <group>
      {/* Wireframe outer */}
      <mesh ref={outerRef}>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshBasicMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Glowing inner core */}
      <mesh ref={innerRef} scale={0.62}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#a855f7"
          emissiveIntensity={0.8}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Corner glowing dots */}
      {corners.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#e879f9" />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Orbiting tech nodes (like electrons around nucleus) ---------- */
function OrbitingNodes() {
  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  const nodes = useMemo(() => {
    const arr = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.15;
      arr.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.35,
          Math.sin(angle) * radius,
        ],
        color: i % 2 === 0 ? "#22d3ee" : "#e879f9",
        size: 0.055 + Math.random() * 0.035,
      });
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Particle field (data / network vibe) ---------- */
function Particles({ count = 1200 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.045;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c4b5fd"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

/* ---------- Orbit rings around the cube ---------- */
function OrbitRings() {
  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.07;
  });

  return (
    <group ref={groupRef}>
      <Torus args={[2.15, 0.006, 16, 120]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.45} />
      </Torus>
      <Torus args={[2.4, 0.005, 16, 120]} rotation={[Math.PI / 2.4, 0.5, 0]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </Torus>
    </group>
  );
}

/* ---------- Engineering grid floor ---------- */
function GridFloor() {
  return (
    <group position={[0, -1.9, 0]}>
      <Grid
        args={[12, 12]}
        cellSize={0.3}
        cellThickness={0.6}
        cellColor="#4c1d95"
        sectionSize={1.2}
        sectionThickness={1}
        sectionColor="#a855f7"
        fadeDistance={11}
        fadeStrength={1.4}
        infiniteGrid
      />
    </group>
  );
}

/* ---------- Mouse parallax wrapper ---------- */
function MouseParallax({ children }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.22,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.18,
      0.05,
    );
  });
  return <group ref={group}>{children}</group>;
}

/* ---------- Main Canvas ---------- */
export default function HeroScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.4, 7.8], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
        <pointLight position={[-5, -3, -5]} intensity={0.9} color="#22d3ee" />

        <Suspense fallback={null}>
          <MouseParallax>
            <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.6}>
              <TechCube />
            </Float>
            <OrbitingNodes />
            <OrbitRings />
            <Particles />
            <GridFloor />
          </MouseParallax>
        </Suspense>
      </Canvas>
    </div>
  );
}
