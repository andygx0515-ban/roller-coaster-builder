import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRollerCoaster } from "@/lib/stores/useRollerCoaster";
import { getTrackCurve } from "./Track";

export function CoasterCar() {
  const meshRef = useRef<THREE.Group>(null);
  const { trackPoints, rideProgress, isRiding, mode } = useRollerCoaster();
  
  useFrame(() => {
    if (!meshRef.current || !isRiding) return;
    
    const curve = getTrackCurve(trackPoints);
    if (!curve) return;
    
    const position = curve.getPoint(rideProgress);
    const tangent = curve.getTangent(rideProgress);
    
    meshRef.current.position.copy(position);
    meshRef.current.position.y -= 0.15;
    
    const angle = Math.atan2(tangent.x, tangent.z);
    meshRef.current.rotation.y = angle;
    
    const pitch = Math.asin(-tangent.y);
    meshRef.current.rotation.x = pitch;
  });
  
  if (!isRiding || mode !== "ride") return null;
  
  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.25, 1]} />
        <meshStandardMaterial color="#ff0000" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, -0.25]}>
        <boxGeometry args={[0.4, 0.15, 0.3]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-0.25, -0.175, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.05, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.8} />
      </mesh>
      <mesh position={[0.25, -0.175, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.05, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.8} />
      </mesh>
      <mesh position={[-0.25, -0.175, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.05, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.8} />
      </mesh>
      <mesh position={[0.25, -0.175, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.05, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.8} />
      </mesh>
    </group>
  );
}
