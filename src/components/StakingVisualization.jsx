import { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import KEKModel from "./kek-model";

extend({ TextGeometry });

function StakingVisualization() {
  return (
    <Canvas
      camera={{ position: [0, 3, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <OrbitControls enableZoom={false} />

      <Suspense
        fallback={
          <mesh>
            <textGeometry args={["Loading 3D Model...", { size: 0.5 }]} />
            <meshBasicMaterial attach="material" color="#39FF14" />
          </mesh>
        }
      >
        <KEKModel position={[0, 0, 0]} />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.8}
        />
      </EffectComposer>
    </Canvas>
  );
}

export default StakingVisualization;
