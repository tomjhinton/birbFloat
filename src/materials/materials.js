
import { extend, useLoader } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import vertexShaderTrunk from './shaders/trunks/vertex.js'
import fragmentShaderTrunk from './shaders/trunks/fragment.js'


import vertexShaderWater from './shaders/water/vertex.js'
import fragmentShaderWater from './shaders/water/fragment.js'





const TrunkMaterial = shaderMaterial(
    {
      uTime: 0,
      uSquishStrength: 0,
      uMousePosition: [0, 0, 0],
      u_progress: 0,
      uTexture: null,
      uTexture2: null,
      uTexture3: null
      
      
    },
    vertexShaderTrunk,
    fragmentShaderTrunk
  );
  
  extend({ TrunkMaterial });

  export { TrunkMaterial}


  const WaterMaterial = shaderMaterial(
    {
      uTime: 0,
      uSquishStrength: 0,
      uMousePosition: [0, 0, 0],
      u_progress: 0,
   
      
    },
    vertexShaderWater,
    fragmentShaderWater
  );
  
  extend({ WaterMaterial });

  export { WaterMaterial}
