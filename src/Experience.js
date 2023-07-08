import React, { useRef, useEffect } from "react";
import { useGLTF , useTexture} from "@react-three/drei";
import { OrbitControls, QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import Title from "./Title/Title.js"
import Fish from  "./Fish/Fish.js"
import { TrunkMaterial, WaterMaterial } from "./materials/materials";

function Cable({ start, end, v1 = new THREE.Vector3(), v2 = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(() => ref.current.setPoints(start.current.getWorldPosition(v1), [-10,4]), [])
    return <QuadraticBezierLine ref={ref} lineWidth={3} color="#ff2060" />
  }
  

export default function Experience(props) {

    const trunkMaterial = useRef()
    const waterMaterial = useRef()
    const titleRef = useRef()
    const groupRef = useRef()

    const cheeses = useTexture('cheeses1.png');
  const cheeses2 = useTexture('cheeses2.png');
  const cheeses3 = useTexture('cheeses4.png');
const { nodes, materials } = useGLTF("float2.glb");


    useEffect(() => {
        
            trunkMaterial.current.uniforms.uTexture.value = cheeses
            trunkMaterial.current.uniforms.uTexture2.value = cheeses2
            trunkMaterial.current.uniforms.uTexture3.value = cheeses3
        
        
        }, []);

        useFrame(() => {
            // Update the time uniform
            trunkMaterial.current.uniforms.uTime.value += 0.01;
            waterMaterial.current.uniforms.uTime.value += 0.01;
        //   console.log(titleRef)
            // bodyMaterial.current.uniforms.uTime.value += 0.01;
            // legMaterial.current.uniforms.uTime.value += 0.01;
        
            
          });
  return (
    <>
    <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>
    <Title ref={titleRef}/>
    <Cable start={groupRef} end={titleRef} />
    <Fish />

    <mesh rotation-x={Math.PI * 1.5} >
            <planeBufferGeometry attach="geometry" args={[25, 25, 150, 150]}  />
            <waterMaterial side={THREE.DoubleSide} ref={waterMaterial} />
         </mesh>

    <group {...props} dispose={null} rotation-y={1.}>

    

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ring.geometry}
        material={materials["Material.004"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Vert001.geometry}
        material={materials["Material.001"]}
        ref={groupRef}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Vert001_1.geometry}
       
      >
         <trunkMaterial side={THREE.DoubleSide} ref={trunkMaterial} />
         </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Vert001_2.geometry}
        material={materials["Default OBJ"]}
        
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Vert001_3.geometry}
        material={materials["Material.002"]}
      />
    </group>
   

    </>
  );
}

useGLTF.preload("float2.glb");