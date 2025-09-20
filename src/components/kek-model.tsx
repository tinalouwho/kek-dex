"use client";

import { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function KEKModel({
  position,
}: {
  position: [number, number, number];
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Load the 3D model
  const gltf = useGLTF("/models/kek10.glb");

  // Reference to the 3D model
  const modelRef = useRef<THREE.Group>(null);

  // Mouse tracking state
  const [hover, setHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // How smoothly the model follows the mouse
  const lerpSpeed = 0.1;

  // Default rotation angles (Change these to adjust initial facing direction)
  const defaultRotation = new THREE.Euler(
    -0.25, // X: Slightly tilts the head UP
    Math.PI / -2, // Y: Faces FORWARD (change this to rotate left/right)
    0, // Z: No tilt sideways
  );

  // Set initial rotation when the model loads
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.set(
        defaultRotation.x,
        defaultRotation.y,
        defaultRotation.z,
      );
    }
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      if (!hover) {
        // Default slow rotation to the LEFT
        modelRef.current.rotation.y -= 0;
      } else {
        // When hovered, smoothly rotate toward the mouse direction
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          defaultRotation.x - mouse.y * 0.3, // Move up/down based on mouse Y
          lerpSpeed,
        );

        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          defaultRotation.y - mouse.x * 0.5, // Move left/right based on mouse X
          lerpSpeed,
        );
      }
    }
  });

  return (
    <group
      ref={modelRef}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={(e) => {
        if (!isMobile) {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = -(e.clientY / window.innerHeight) * 2 + 1;
          setMouse({ x, y });
        }
      }}
    >
      {/* Render the GLTF model */}
      <primitive object={gltf.scene} scale={4.5} />
    </group>
  );
}

// Preload the model to improve performance
useGLTF.preload("/models/kek10.glb");
