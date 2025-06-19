// import React, { useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment } from '@react-three/drei';
// import HumanModel from '../components/HumanModel';
// import InterviewControls from '../components/InterviewControls';

// export default function Test3D() {
//   const [spokenText, setSpokenText] = useState('');

//   const handleTranscript = (text) => {
//     setSpokenText(text);
//     const utterance = new SpeechSynthesisUtterance(`You said: ${text}`);
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 1.6, 3] }}>
//         <ambientLight intensity={0.4} />
//         <directionalLight position={[5, 10, 5]} intensity={1} />
//         <HumanModel position={[0, -1, 0]} />
//         <OrbitControls />
//         <Environment preset="sunset" />
//       </Canvas>
//       <InterviewControls onTranscript={handleTranscript} />
//     </div>
//   );
// }


import React, { useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HumanModel from '../components/HumanModel';
import InterviewControls from '../components/InterviewControls';

export default function Test3D() {
  const handleSpeech = useCallback((text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
    // TODO: trigger gestures or lip sync based on text
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <HumanModel position={[0, -1, 0]} />
        <OrbitControls enablePan={false} />
      </Canvas>
      <InterviewControls onSpeak={handleSpeech} />
    </div>
  );
}
