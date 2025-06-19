/* 
//proper working 
import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export function Avatar({ isSpeaking, animationName = 'Idle', ...props }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/human.glb')
  const { actions, mixer } = useAnimations(animations, group)

  const headMesh = useRef(null)
  const timeRef = useRef(0)
  const morphIndexRef = useRef(null)

  // Setup clipping to hide lower body
  useEffect(() => {
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.4)
    scene.traverse(child => {
      if (child.isMesh) {
        child.material.clippingPlanes = [clipPlane]
        child.material.clipShadows = true
        child.material.needsUpdate = true
      }
    })
  }, [scene])

  // Find the head mesh and morph target index for mouthOpen
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.name.includes('Head') && child.morphTargetInfluences) {
        headMesh.current = child
        const dict = child.morphTargetDictionary
        if (dict && dict.mouthOpen !== undefined) {
          morphIndexRef.current = dict.mouthOpen
        } else {
          console.warn('mouthOpen morph target not found')
        }
      }
    })
  }, [scene])

  // Animate lipsync using sine wave motion
  useFrame((_, delta) => {
    if (!isSpeaking || !headMesh.current || morphIndexRef.current === null) return

    timeRef.current += delta
    const influence = (Math.sin(timeRef.current * 10) + 1) / 2 // 0 to 1
    headMesh.current.morphTargetInfluences[morphIndexRef.current] = influence
  })

  // Reset mouth when not speaking
  useEffect(() => {
    if (!isSpeaking && headMesh.current && morphIndexRef.current !== null) {
      headMesh.current.morphTargetInfluences[morphIndexRef.current] = 0
    }
  }, [isSpeaking])

  // Play idle/talking/etc animation
  useEffect(() => {
    if (actions && actions[animationName]) {
      Object.values(actions).forEach(a => a.stop())
      actions[animationName].play()
    }
  }, [animationName, actions])

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  )
}
 */




//working code
/* 
import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export function Avatar({ isSpeaking, animationName = 'Idle', ...props }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/human.glb')
  const { actions } = useAnimations(animations, group)

  const headMesh = useRef(null)
  const morphIndexRef = useRef(null)
  const timeRef = useRef(0)
  const visemeTimer = useRef(0)
  const currentIntensity = useRef(0)

  // Setup clipping to hide lower body
  useEffect(() => {
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.4)
    scene.traverse(child => {
      if (child.isMesh) {
        child.material.clippingPlanes = [clipPlane]
        child.material.clipShadows = true
        child.material.needsUpdate = true
      }
    })
  }, [scene])

  // Find head mesh and morph target index
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase().includes('head') && child.morphTargetInfluences) {
        headMesh.current = child
        const dict = child.morphTargetDictionary
        if (dict && dict.mouthOpen !== undefined) {
          morphIndexRef.current = dict.mouthOpen
        } else {
          console.warn('mouthOpen morph target not found in', child.name)
        }
      }
    })
  }, [scene])

  // Improved lipsync simulation
  useFrame((_, delta) => {
    if (!isSpeaking || !headMesh.current || morphIndexRef.current === null) return

    timeRef.current += delta
    visemeTimer.current -= delta

    // Change intensity every 80–200ms
    if (visemeTimer.current <= 0) {
      currentIntensity.current = Math.random() * 0.7 + 0.3 // between 0.3 and 1
      visemeTimer.current = Math.random() * 0.1 + 0.08 // between 80ms and 180ms
    }

    // Smoothly interpolate to new intensity
    const prev = headMesh.current.morphTargetInfluences[morphIndexRef.current] || 0
    const lerped = THREE.MathUtils.lerp(prev, currentIntensity.current, 0.3)
    headMesh.current.morphTargetInfluences[morphIndexRef.current] = lerped
  })

  // Reset mouth
  useEffect(() => {
    if (!isSpeaking && headMesh.current && morphIndexRef.current !== null) {
      headMesh.current.morphTargetInfluences[morphIndexRef.current] = 0
    }
  }, [isSpeaking])

  // Play animation
  useEffect(() => {
    if (actions && actions[animationName]) {
      Object.values(actions).forEach((a) => a.stop())
      actions[animationName].play()
    }
  }, [animationName, actions])

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  )
}
 */



//Full updated -> lipsing, blinking, head move
/* import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export function Avatar({ isSpeaking, animationName = 'Idle', ...props }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/human.glb')
  const { actions } = useAnimations(animations, group)

  const headMesh = useRef(null)
  const morphIndexRef = useRef({})
  const timeRef = useRef(0)
  const visemeTimer = useRef(0)
  const currentIntensity = useRef(0)
  const blinkTimer = useRef(Math.random() * 4 + 2)

  // Setup clipping to hide lower body
  useEffect(() => {
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.4)
    scene.traverse(child => {
      if (child.isMesh) {
        child.material.clippingPlanes = [clipPlane]
        child.material.clipShadows = true
        child.material.needsUpdate = true
      }
    })
  }, [scene])

  // Find head mesh and morph targets
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase().includes('head') && child.morphTargetInfluences) {
        headMesh.current = child
        const dict = child.morphTargetDictionary || {}
        morphIndexRef.current = {
          mouthOpen: dict.mouthOpen ?? null,
          blinkL: dict.eyeBlinkLeft ?? null,
          blinkR: dict.eyeBlinkRight ?? null
        }
      }
    })
  }, [scene])

  // Frame-based animations: lip sync, blinking, head sway
  useFrame((_, delta) => {
    const head = headMesh.current
    const morphs = morphIndexRef.current
    if (!head || morphs.mouthOpen == null) return

    // Lip-sync animation
    if (isSpeaking) {
      timeRef.current += delta
      visemeTimer.current -= delta
      if (visemeTimer.current <= 0) {
        currentIntensity.current = Math.random() * 0.7 + 0.3
        visemeTimer.current = Math.random() * 0.1 + 0.08
      }
      const prev = head.morphTargetInfluences[morphs.mouthOpen] || 0
      head.morphTargetInfluences[morphs.mouthOpen] = THREE.MathUtils.lerp(prev, currentIntensity.current, 0.3)
    } else {
      head.morphTargetInfluences[morphs.mouthOpen] = 0
    }

    // Blinking
    blinkTimer.current -= delta
    if (blinkTimer.current <= 0 && morphs.blinkL != null && morphs.blinkR != null) {
      head.morphTargetInfluences[morphs.blinkL] = 1
      head.morphTargetInfluences[morphs.blinkR] = 1
      setTimeout(() => {
        if (head.morphTargetInfluences) {
          head.morphTargetInfluences[morphs.blinkL] = 0
          head.morphTargetInfluences[morphs.blinkR] = 0
        }
      }, 120)
      blinkTimer.current = Math.random() * 4 + 2 // 2 to 6 seconds
    }

    // Head gentle sway
    group.current.rotation.y = Math.sin(Date.now() * 0.0015) * 0.04
    group.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.02
  })

  // Reset morphs on speak stop
  useEffect(() => {
    if (!isSpeaking && headMesh.current && morphIndexRef.current.mouthOpen !== null) {
      headMesh.current.morphTargetInfluences[morphIndexRef.current.mouthOpen] = 0
    }
  }, [isSpeaking])

  // Play idle/talking animation
  useEffect(() => {
    if (actions && actions[animationName]) {
      Object.values(actions).forEach((a) => a.stop())
      actions[animationName].play()
    }
  }, [animationName, actions])

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  )
}
 */



// import { useGLTF, useAnimations } from '@react-three/drei'
// import { useEffect, useRef } from 'react'
// import * as THREE from 'three'
// import { useFrame } from '@react-three/fiber'

// export function Avatar({ isSpeaking, animationName = 'Idle', ...props }) {
//   const group = useRef()
//   const { scene, animations } = useGLTF('/models/human.glb')
//   const { actions } = useAnimations(animations, group)

//   const headMesh = useRef(null)
//   const morphIndexRef = useRef({})
//   const timeRef = useRef(0)
//   const visemeTimer = useRef(0)
//   const currentIntensity = useRef(0)
//   const blinkTimer = useRef(Math.random() * 4 + 2)

//   // Setup clipping to hide lower body
//   // useEffect(() => {
//   //   const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.4)
//   //   scene.traverse(child => {
//   //     if (child.isMesh) {
//   //       child.material.clippingPlanes = [clipPlane]
//   //       child.material.clipShadows = true
//   //       child.material.needsUpdate = true
//   //     }
//   //   })
//   // }, [scene])

//   // Detect head mesh and morph targets
//   useEffect(() => {
//     scene.traverse(child => {
//       if (child.isMesh && child.name.toLowerCase().includes('head')) {
//         if (child.morphTargetDictionary && child.morphTargetInfluences) {
//           headMesh.current = child
//           const dict = child.morphTargetDictionary
//           console.log('✅ Head Mesh Found:', child.name)
//           console.log('🧠 Morph Targets:', dict)

//           morphIndexRef.current = {
//             mouthOpen: dict.mouthOpen ?? dict.jawOpen ?? null,
//             blinkL: dict.eyeBlinkLeft ?? null,
//             blinkR: dict.eyeBlinkRight ?? null,
//           }
//         }
//       }
//     })
//   }, [scene])

//   // Frame loop for animation
//   useFrame((_, delta) => {
//     const head = headMesh.current
//     const morphs = morphIndexRef.current
//     if (!head || morphs.mouthOpen == null) return

//     // Lip-sync
//     if (isSpeaking) {
//       timeRef.current += delta
//       visemeTimer.current -= delta
//       if (visemeTimer.current <= 0) {
//         currentIntensity.current = Math.random() * 0.7 + 0.3
//         visemeTimer.current = Math.random() * 0.1 + 0.08
//       }
//       const prev = head.morphTargetInfluences[morphs.mouthOpen] || 0
//       head.morphTargetInfluences[morphs.mouthOpen] = THREE.MathUtils.lerp(prev, currentIntensity.current, 0.3)
//     } else {
//       head.morphTargetInfluences[morphs.mouthOpen] = 0
//     }

//     // Blinking
//     blinkTimer.current -= delta
//     if (blinkTimer.current <= 0 && morphs.blinkL != null && morphs.blinkR != null) {
//       head.morphTargetInfluences[morphs.blinkL] = 1
//       head.morphTargetInfluences[morphs.blinkR] = 1
//       setTimeout(() => {
//         if (head.morphTargetInfluences) {
//           head.morphTargetInfluences[morphs.blinkL] = 0
//           head.morphTargetInfluences[morphs.blinkR] = 0
//         }
//       }, 120)
//       blinkTimer.current = Math.random() * 4 + 2
//     }

//     // Gentle head sway
//     group.current.rotation.y = Math.sin(Date.now() * 0.0015) * 0.04
//     group.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.02
//   })

//   // Reset morph when speaking stops
//   useEffect(() => {
//     if (!isSpeaking && headMesh.current && morphIndexRef.current.mouthOpen !== null) {
//       headMesh.current.morphTargetInfluences[morphIndexRef.current.mouthOpen] = 0
//     }
//   }, [isSpeaking])

//   // Play idle animation
//   useEffect(() => {
//     if (actions && actions[animationName]) {
//       Object.values(actions).forEach((a) => a.stop())
//       actions[animationName].play()
//     }
//   }, [animationName, actions])

//   return (
//     <group ref={group} {...props}>
//       <primitive object={scene} />
//     </group>
//   )
// }



import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Group, Object3D } from 'three'

interface AvatarProps {
  isSpeaking: boolean
  animationName?: string
  position?: [number, number, number]
  scale?: number | [number, number, number]
}

export function Avatar({ isSpeaking, animationName = 'Idle', ...props }: AvatarProps) {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF('/models/human.glb')
  const { actions } = useAnimations(animations, group)

  const headMesh = useRef<THREE.Mesh | null>(null)
  const morphIndexRef = useRef<{
    mouthOpen?: number | null
    blinkL?: number | null
    blinkR?: number | null
  }>({})

  const timeRef = useRef(0)
  const visemeTimer = useRef(0)
  const currentIntensity = useRef(0)
  const blinkTimer = useRef(Math.random() * 4 + 2)

  // Detect head mesh and morph targets
  useEffect(() => {
    scene.traverse((child: Object3D) => {
      if ((child as THREE.Mesh).isMesh && child.name.toLowerCase().includes('head')) {
        const mesh = child as THREE.Mesh
        if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
          headMesh.current = mesh
          const dict = mesh.morphTargetDictionary

          morphIndexRef.current = {
            mouthOpen: dict.mouthOpen ?? dict.jawOpen ?? null,
            blinkL: dict.eyeBlinkLeft ?? null,
            blinkR: dict.eyeBlinkRight ?? null,
          }
        }
      }
    })
  }, [scene])

  // Frame loop for animation
  useFrame((_, delta) => {
    const head = headMesh.current
    const morphs = morphIndexRef.current
    if (!head || morphs.mouthOpen == null) return

    // Lip-sync
    if (isSpeaking) {
      timeRef.current += delta
      visemeTimer.current -= delta
      if (visemeTimer.current <= 0) {
        currentIntensity.current = Math.random() * 0.7 + 0.3
        visemeTimer.current = Math.random() * 0.1 + 0.08
      }
      const prev = head.morphTargetInfluences![morphs.mouthOpen] || 0
      head.morphTargetInfluences![morphs.mouthOpen] = THREE.MathUtils.lerp(prev, currentIntensity.current, 0.3)
    } else {
      head.morphTargetInfluences![morphs.mouthOpen] = 0
    }

    // Blinking
    blinkTimer.current -= delta
    if (blinkTimer.current <= 0 && morphs.blinkL != null && morphs.blinkR != null) {
      head.morphTargetInfluences![morphs.blinkL] = 1
      head.morphTargetInfluences![morphs.blinkR] = 1
      setTimeout(() => {
        if (head.morphTargetInfluences) {
          head.morphTargetInfluences[morphs.blinkL!] = 0
          head.morphTargetInfluences[morphs.blinkR!] = 0
        }
      }, 120)
      blinkTimer.current = Math.random() * 4 + 2
    }

    // Gentle head sway
    if (group.current) {
      group.current.rotation.y = Math.sin(Date.now() * 0.0015) * 0.04
      group.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.02
    }
  })

  // Reset morph when speaking stops
  useEffect(() => {
    if (!isSpeaking && headMesh.current && morphIndexRef.current.mouthOpen != null) {
      headMesh.current.morphTargetInfluences![morphIndexRef.current.mouthOpen] = 0
    }
  }, [isSpeaking])

  // Play specified animation
  useEffect(() => {
    if (actions && actions[animationName]) {
      Object.values(actions).forEach((a) => a?.stop())
      actions[animationName]?.play()
    }
  }, [animationName, actions])

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  )
}
