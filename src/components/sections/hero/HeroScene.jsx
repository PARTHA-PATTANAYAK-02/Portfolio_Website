import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Float, Grid, Html, Line, Sparkles, Text } from "@react-three/drei";

import * as THREE from "three";
import { useTheme } from "../../providers/ThemeContext";

import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
} from "react-icons/si";

/* =========================================================
   TECH STACK
========================================================= */

const TECH_STACK = [
  {
    id: "react",
    name: "React",
    subtitle: "Frontend",
    color: "#61DAFB",
    icon: SiReact,
    position: [-2.65, 1.65, 0.35],
  },
  {
    id: "node",
    name: "Node.js",
    subtitle: "Runtime",
    color: "#68A063",
    icon: SiNodedotjs,
    position: [2.65, 1.65, 0.35],
  },
  {
    id: "express",
    name: "Express.js",
    subtitle: "Backend",
    color: "#CBD5E1",
    icon: SiExpress,
    position: [3.45, 0, -0.2],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    subtitle: "Database",
    color: "#47A248",
    icon: SiMongodb,
    position: [2.35, -1.75, 0.25],
  },
  {
    id: "mysql",
    name: "MySQL",
    subtitle: "Database",
    color: "#4479A1",
    icon: SiMysql,
    position: [-2.35, -1.75, 0.25],
  },
  {
    id: "java",
    name: "Java",
    subtitle: "Language",
    color: "#F89820",
    icon: null,
    position: [-3.45, 0, -0.2],
  },
  {
    id: "rest",
    name: "REST API",
    subtitle: "Architecture",
    color: "#A78BFA",
    icon: null,
    position: [-1.0, 2.85, -0.45],
  },
  {
    id: "fullstack",
    name: "FULL STACK",
    subtitle: "Development",
    color: "#22D3EE",
    icon: null,
    position: [1.0, -2.85, -0.45],
  },
];

/* =========================================================
   SCROLL PROGRESS
========================================================= */

function useScrollProgress() {
  const ref = useRef(0);

  useEffect(() => {
    const update = () => {
      ref.current = Math.min(
        window.scrollY / Math.max(window.innerHeight, 1),
        1,
      );
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", update);
    };
  }, []);

  return ref;
}

/* =========================================================
   DRAG ROTATION CONTROLLER
========================================================= */

function SceneInteraction({ rotationRef }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    let dragging = false;
    let pointerId = null;

    let startX = 0;
    let startY = 0;

    let startRotX = 0;
    let startRotY = 0;

    const onPointerDown = (event) => {
      dragging = true;
      pointerId = event.pointerId;

      startX = event.clientX;
      startY = event.clientY;

      startRotX = rotationRef.current.targetX;
      startRotY = rotationRef.current.targetY;

      canvas.setPointerCapture?.(event.pointerId);

      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (event) => {
      if (!dragging || event.pointerId !== pointerId) return;

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      rotationRef.current.targetY = startRotY + dx * 0.006;

      rotationRef.current.targetX = startRotX + dy * 0.0045;

      rotationRef.current.targetX = THREE.MathUtils.clamp(
        rotationRef.current.targetX,
        -0.9,
        0.9,
      );
    };

    const stopDragging = (event) => {
      if (!dragging) return;

      dragging = false;

      if (event?.pointerId != null) {
        canvas.releasePointerCapture?.(event.pointerId);
      }

      pointerId = null;

      canvas.style.cursor = "grab";
    };

    canvas.style.cursor = "grab";

    canvas.addEventListener("pointerdown", onPointerDown);

    canvas.addEventListener("pointermove", onPointerMove);

    canvas.addEventListener("pointerup", stopDragging);

    canvas.addEventListener("pointercancel", stopDragging);

    canvas.addEventListener("pointerleave", stopDragging);

    return () => {
      canvas.style.cursor = "";

      canvas.removeEventListener("pointerdown", onPointerDown);

      canvas.removeEventListener("pointermove", onPointerMove);

      canvas.removeEventListener("pointerup", stopDragging);

      canvas.removeEventListener("pointercancel", stopDragging);

      canvas.removeEventListener("pointerleave", stopDragging);
    };
  }, [gl, rotationRef]);

  return null;
}

/* =========================================================
   MAIN ROTATING ARCHITECTURE
========================================================= */

function RotatingArchitecture({ isMobile, isDark, scrollRef }) {
  const groupRef = useRef();

  const rotationRef = useRef({
    x: -0.04,
    y: 0.0,
    targetX: -0.04,
    targetY: 0.0,
  });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const rotation = rotationRef.current;

    rotation.x = THREE.MathUtils.damp(rotation.x, rotation.targetX, 5, delta);

    rotation.y = THREE.MathUtils.damp(rotation.y, rotation.targetY, 5, delta);

    groupRef.current.rotation.x = rotation.x;
    groupRef.current.rotation.y = rotation.y;

    const time = state.clock.elapsedTime;

    groupRef.current.position.y =
      Math.sin(time * 0.45) * 0.045 - (scrollRef?.current ?? 0) * 0.3;

    if (
      Math.abs(rotation.targetX - rotation.x) < 0.01 &&
      Math.abs(rotation.targetY - rotation.y) < 0.01
    ) {
      groupRef.current.rotation.z = Math.sin(time * 0.25) * 0.012;
    }
  });

  /* Desktop keeps node visual size; mobile shrinks noticeably */
  const scale = isMobile ? 0.66 : 1.15;

  return (
    <>
      <SceneInteraction rotationRef={rotationRef} />

      <group ref={groupRef} scale={scale}>
        <DeveloperCore isMobile={isMobile} isDark={isDark} />

        <TechNodes isMobile={isMobile} isDark={isDark} />

        <ArchitectureLines isDark={isDark} />

        <DataFlow />

        <OrbitalSystem isDark={isDark} />

        <AmbientRings isDark={isDark} />
      </group>
    </>
  );
}

/* =========================================================
   DEVELOPER CORE
========================================================= */

function DeveloperCore({ isMobile, isDark }) {
  const outerRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const glowRef = useRef();

  const purple = isDark ? "#8B5CF6" : "#7C3AED";

  const cyan = isDark ? "#22D3EE" : "#0891B2";

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.16;
      outerRef.current.rotation.y += delta * 0.28;
      outerRef.current.rotation.z += delta * 0.05;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.22;
      innerRef.current.rotation.y -= delta * 0.4;

      const scale = 1 + Math.sin(time * 1.7) * 0.035;

      innerRef.current.scale.setScalar(scale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += delta * 0.4;
      ring1Ref.current.rotation.z += delta * 0.12;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.25;
      ring2Ref.current.rotation.z -= delta * 0.22;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.18;
    }

    if (glowRef.current) {
      glowRef.current.intensity =
        (isMobile ? 4 : 7) + Math.sin(time * 2.1) * 1.6;
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.05, 2]} />

        <meshBasicMaterial
          color={purple}
          wireframe
          transparent
          opacity={isDark ? 0.52 : 0.6}
        />
      </mesh>

      <mesh scale={1.22}>
        <icosahedronGeometry args={[1.05, 1]} />

        <meshBasicMaterial
          color={cyan}
          wireframe
          transparent
          opacity={isDark ? 0.12 : 0.2}
        />
      </mesh>

      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.62, 3]} />

        <meshPhysicalMaterial
          color={isDark ? "#0B1020" : "#17112F"}
          emissive={purple}
          emissiveIntensity={isDark ? 1.8 : 2.2}
          metalness={0.9}
          roughness={0.14}
          transparent
          opacity={0.96}
        />
      </mesh>

      <pointLight
        ref={glowRef}
        color={purple}
        intensity={isMobile ? 4 : 7}
        distance={4.5}
      />

      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0.25, 0]}>
        <torusGeometry args={[1.28, 0.018, 12, 128]} />

        <meshBasicMaterial color={purple} transparent opacity={0.78} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[0.3, Math.PI / 2, 0]}>
        <torusGeometry args={[1.42, 0.012, 12, 128]} />

        <meshBasicMaterial color={cyan} transparent opacity={0.5} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0.8, 0.2, Math.PI / 3]}>
        <torusGeometry args={[1.6, 0.008, 10, 128]} />

        <meshBasicMaterial color="#A78BFA" transparent opacity={0.24} />
      </mesh>

      <Text
        position={[0, 0, 0.72]}
        fontSize={0.4}
        anchorX="center"
        anchorY="middle"
        color="#FFFFFF"
        outlineColor={purple}
        outlineWidth={0.018}
      >
        {"</>"}
      </Text>

      <Html
        position={[0, -1.7, 0]}
        center
        sprite
        distanceFactor={5.8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            padding: "7px 13px",
            borderRadius: "999px",
            border: `1px solid ${purple}66`,
            background: isDark ? "rgba(15,23,42,.82)" : "rgba(255,255,255,.88)",
            color: isDark ? "#C4B5FD" : "#7C3AED",
            fontSize: "9px",
            fontWeight: 800,
            letterSpacing: "0.18em",
            whiteSpace: "nowrap",
            boxShadow: `0 0 24px ${purple}22`,
            backdropFilter: "blur(10px)",
          }}
        >
          FULL-STACK CORE
        </div>
      </Html>
    </group>
  );
}

/* =========================================================
   TECH NODES
========================================================= */

function TechNodes({ isMobile, isDark }) {
  return (
    <group>
      {TECH_STACK.map((tech, index) => (
        <TechNode
          key={tech.id}
          tech={tech}
          index={index}
          isMobile={isMobile}
          isDark={isDark}
        />
      ))}
    </group>
  );
}

/* =========================================================
   SINGLE TECH NODE
========================================================= */

function TechNode({ tech, index, isMobile, isDark }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const ringRef = useRef();
  const innerRingRef = useRef();
  const glowRef = useRef();

  const [hovered, setHovered] = useState(false);

  const scaleRef = useRef(1);

  const tiltRef = useRef({
    x: 0,
    y: 0,
  });

  const Icon = tech.icon;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    const floatY = Math.sin(time * 1.2 + index) * 0.055;

    const targetScale = hovered ? 1.24 : 1;

    scaleRef.current = THREE.MathUtils.damp(
      scaleRef.current,
      targetScale,
      9,
      delta,
    );

    groupRef.current.scale.setScalar(scaleRef.current);

    groupRef.current.position.y = tech.position[1] + floatY;

    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      hovered ? tech.position[2] + 0.42 : tech.position[2],
      8,
      delta,
    );

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      hovered ? tiltRef.current.x : 0,
      7,
      delta,
    );

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      hovered ? tiltRef.current.y : Math.sin(time * 0.5 + index) * 0.035,
      7,
      delta,
    );

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (hovered ? 2.5 : 0.5);
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * (hovered ? 1.8 : 0.35);
    }

    if (sphereRef.current) {
      const pulse = 1 + Math.sin(time * 1.8 + index) * 0.035;

      sphereRef.current.scale.setScalar(pulse);
    }

    if (glowRef.current) {
      glowRef.current.intensity = THREE.MathUtils.damp(
        glowRef.current.intensity,
        hovered ? 4.5 : 0.7,
        7,
        delta,
      );
    }
  });

  const handlePointerMove = (event) => {
    if (!hovered) return;

    const x = event.pointer.x;
    const y = event.pointer.y;

    tiltRef.current = {
      x: -y * 0.25,
      y: x * 0.25,
    };
  };

  const panelBackground = isDark
    ? "linear-gradient(145deg, rgba(15,23,42,.96), rgba(2,6,23,.9))"
    : "linear-gradient(145deg, rgba(255,255,255,.96), rgba(241,245,249,.92))";

  const panelText = isDark ? "#F8FAFC" : "#0F172A";

  const panelSubtext = isDark ? "#94A3B8" : "#64748B";

  return (
    <group
      ref={groupRef}
      position={[tech.position[0], tech.position[1], tech.position[2]]}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);

        tiltRef.current = {
          x: 0,
          y: 0,
        };

        document.body.style.cursor = "grab";
      }}
      onPointerMove={handlePointerMove}
    >
      <mesh>
        <sphereGeometry args={[0.62, 24, 24]} />

        <meshBasicMaterial
          color={tech.color}
          transparent
          opacity={hovered ? 0.12 : 0.035}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />

        <meshBasicMaterial
          color={tech.color}
          transparent
          opacity={hovered ? 0.2 : 0.07}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.26, 32, 32]} />

        <meshPhysicalMaterial
          color={isDark ? "#0F172A" : "#1E1B4B"}
          emissive={tech.color}
          emissiveIntensity={hovered ? 2.4 : 0.65}
          metalness={0.9}
          roughness={0.12}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.012, 8, 48]} />

        <meshBasicMaterial
          color={tech.color}
          transparent
          opacity={hovered ? 1 : 0.52}
        />
      </mesh>

      <mesh ref={innerRingRef} rotation={[Math.PI / 2.6, 0.5, 0]}>
        <torusGeometry args={[0.3, 0.008, 8, 48]} />

        <meshBasicMaterial
          color={tech.color}
          transparent
          opacity={hovered ? 0.95 : 0.4}
        />
      </mesh>

      <mesh scale={hovered ? 1 : 0.01}>
        <ringGeometry args={[0.45, 0.48, 64]} />

        <meshBasicMaterial
          color={tech.color}
          transparent
          opacity={hovered ? 0.55 : 0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <Html
        center
        transform
        sprite
        distanceFactor={isMobile ? 9 : 5.6}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            minWidth: tech.id === "fullstack" ? "92px" : "76px",

            padding: "8px 11px",

            borderRadius: "14px",

            border: `1px solid ${tech.color}${hovered ? "dd" : "55"}`,

            background: panelBackground,

            boxShadow: hovered
              ? `0 0 32px ${tech.color}88,
                 inset 0 0 18px ${tech.color}20`
              : `0 0 14px ${tech.color}18`,

            backdropFilter: "blur(14px)",

            WebkitBackdropFilter: "blur(14px)",

            transform: "translateY(54px)",

            transition: "box-shadow .25s ease, border-color .25s ease",
          }}
        >
          {Icon ? (
            <Icon size={isMobile ? 15 : 19} color={tech.color} />
          ) : (
            <div
              style={{
                color: tech.color,
                fontSize: tech.id === "fullstack" ? "11px" : "10px",
                fontWeight: 900,
                letterSpacing: "0.08em",
              }}
            >
              {tech.id === "java" ? "JAVA" : tech.id === "rest" ? "API" : "FS"}
            </div>
          )}

          <div
            style={{
              marginTop: "5px",
              color: panelText,
              fontSize: isMobile ? "9px" : "11px",
              fontWeight: 750,
              whiteSpace: "nowrap",
            }}
          >
            {tech.name}
          </div>

          <div
            style={{
              marginTop: "2px",
              color: panelSubtext,
              fontSize: "7px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {tech.subtitle}
          </div>
        </div>
      </Html>

      <pointLight
        ref={glowRef}
        color={tech.color}
        intensity={hovered ? 4 : 0.7}
        distance={hovered ? 3.2 : 1.7}
      />

      <mesh position={[0.14, 0.16, 0.08]}>
        <sphereGeometry args={[0.022, 10, 10]} />

        <meshBasicMaterial color={tech.color} />
      </mesh>
    </group>
  );
}

/* =========================================================
   ARCHITECTURE LINES
========================================================= */

function ArchitectureLines({ isDark }) {
  const center = [0, 0.05, 0];

  return (
    <group>
      {TECH_STACK.map((tech) => (
        <group key={`line-${tech.id}`}>
          <Line
            points={[center, tech.position]}
            color={tech.color}
            transparent
            opacity={isDark ? 0.42 : 0.5}
            lineWidth={0.8}
          />

          <Line
            points={[
              [center[0], center[1], -0.08],
              [tech.position[0], tech.position[1], -0.08],
            ]}
            color={tech.color}
            transparent
            opacity={0.08}
            lineWidth={2}
          />
        </group>
      ))}
    </group>
  );
}

/* =========================================================
   DATA FLOW
========================================================= */

function DataFlow() {
  return (
    <group>
      {TECH_STACK.map((tech, index) => (
        <FlowParticle
          key={`flow-${tech.id}`}
          target={tech.position}
          color={tech.color}
          delay={index * 0.16}
        />
      ))}
    </group>
  );
}

function FlowParticle({ target, color, delay }) {
  const ref = useRef();

  const start = useMemo(() => [0, 0.05, 0.22], []);

  useFrame((state) => {
    if (!ref.current) return;

    const raw = state.clock.elapsedTime * 0.28 + delay;

    const progress = ((raw % 1) + 1) % 1;

    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    ref.current.position.x = THREE.MathUtils.lerp(start[0], target[0], eased);

    ref.current.position.y = THREE.MathUtils.lerp(start[1], target[1], eased);

    ref.current.position.z = THREE.MathUtils.lerp(
      start[2],
      target[2] + 0.15,
      eased,
    );
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.055, 12, 12]} />

        <meshBasicMaterial color={color} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.095, 10, 10]} />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   ORBITAL SYSTEM
========================================================= */

function OrbitalSystem({ isDark }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.055;

    groupRef.current.rotation.z -= delta * 0.018;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[3.2, 0.009, 8, 180]} />

        <meshBasicMaterial
          color="#6366F1"
          transparent
          opacity={isDark ? 0.16 : 0.22}
        />
      </mesh>

      <mesh rotation={[0.8, Math.PI / 2.8, 0]}>
        <torusGeometry args={[3.75, 0.007, 8, 180]} />

        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={isDark ? 0.1 : 0.16}
        />
      </mesh>

      <mesh rotation={[1.5, 0.2, 0]}>
        <torusGeometry args={[4.25, 0.005, 8, 180]} />

        <meshBasicMaterial
          color="#A78BFA"
          transparent
          opacity={isDark ? 0.07 : 0.11}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   AMBIENT RINGS
========================================================= */

function AmbientRings({ isDark }) {
  const opacityBoost = isDark ? 0 : 0.1;

  return (
    <>
      <Float speed={1} rotationIntensity={0.25} floatIntensity={0.25}>
        <mesh position={[-4.6, 2.8, -2.2]}>
          <torusGeometry args={[0.58, 0.012, 8, 80]} />

          <meshBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.25 + opacityBoost}
          />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.3}>
        <mesh position={[4.5, -2.4, -2]}>
          <torusGeometry args={[0.72, 0.012, 8, 80]} />

          <meshBasicMaterial
            color="#22D3EE"
            transparent
            opacity={0.2 + opacityBoost}
          />
        </mesh>
      </Float>
    </>
  );
}

/* =========================================================
   FIXED ENGINEERING GRID
========================================================= */

function EngineeringGrid({ isDark }) {
  return (
    <Grid
      position={[0, -3.1, -1.2]}
      args={[15, 15]}
      cellSize={0.5}
      cellThickness={0.45}
      cellColor={isDark ? "#334155" : "#94A3B8"}
      sectionSize={2}
      sectionThickness={0.8}
      sectionColor={isDark ? "#6366F1" : "#8B5CF6"}
      fadeDistance={11}
      fadeStrength={1.5}
      infiniteGrid
    />
  );
}

/* =========================================================
   MAIN HERO SCENE
========================================================= */

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const sceneRef = useRef(null);

  const scrollRef = useScrollProgress();

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    check();

    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  /* -----------------------------------------------
     Camera pulled further back + wider FOV so
     leftmost Java node never clips.
     Desktop scale compensates visually.
  ----------------------------------------------- */
  const camera = useMemo(
    () => ({
      position: [0, 0.35, 10],
      fov: isMobile ? 52 : 48,
      near: 0.1,
      far: 100,
    }),
    [isMobile],
  );

  return (
    <div
      ref={sceneRef}
      className={isMobile ? "hero-scene hero-scene-mobile" : "hero-scene"}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: isMobile ? "0" : "-18%",
        right: isMobile ? "0" : "-4%",
        overflow: "visible",
        pointerEvents: "auto",
      }}
    >
      <Canvas
        camera={camera}
        dpr={isMobile ? 1 : [1, 1.25]}
        frameloop={isVisible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isDark ? 0.42 : 0.7} />

          <pointLight
            position={[-4, 3, 4]}
            intensity={isDark ? 4.5 : 3.4}
            color="#8B5CF6"
            distance={11}
          />

          <pointLight
            position={[4, 1, 3]}
            intensity={isDark ? 3.5 : 2.8}
            color="#22D3EE"
            distance={10}
          />

          <pointLight
            position={[0, 0, 3]}
            intensity={2.5}
            color="#FFFFFF"
            distance={6}
          />

          <EngineeringGrid isDark={isDark} />

          <RotatingArchitecture
            isMobile={isMobile}
            isDark={isDark}
            scrollRef={scrollRef}
          />

          <Sparkles
            count={isMobile ? 30 : 80}
            scale={[10, 8, 8]}
            size={1.25}
            speed={0.18}
            opacity={isDark ? 0.35 : 0.48}
            color={isDark ? "#C4B5FD" : "#8B5CF6"}
          />

          <Sparkles
            count={isMobile ? 12 : 30}
            scale={[7, 6, 6]}
            size={2}
            speed={0.1}
            opacity={isDark ? 0.16 : 0.2}
            color="#22D3EE"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
