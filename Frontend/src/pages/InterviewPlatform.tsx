// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, Text } from '@react-three/drei'
// import { Avatar } from './Avatar'
// import { useState, useEffect, useRef } from 'react'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// export default function InterviewTest() {
//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

//   const [speechText, setSpeechText] = useState('')
//   const [inputText, setInputText] = useState('')
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')

//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)

//   // TTS logic
//   const speak = (text) => {
//     if (!text.trim()) return

//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     setSpeechText(text)

//     const utterance = new SpeechSynthesisUtterance(text)
//     utteranceRef.current = utterance

//     utterance.onstart = () => setIsSpeaking(true)
//     utterance.onend = () => setIsSpeaking(false)

//     synthRef.current.speak(utterance)
//   }

//   const toggleListening = () => {
//     if (listening) {
//       SpeechRecognition.stopListening()
//     } else {
//       SpeechRecognition.startListening({ continuous: true })
//     }
//   }

//   const playAnimation = (animName) => {
//     setCurrentAnimation(animName)
//   }

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 1.5, 2.5], fov: 50 }} gl={{ localClippingEnabled: true }}>
//         <ambientLight intensity={0.5} />
//         <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//         <pointLight position={[-10, -10, -10]} />

//         <Avatar position={[0, -1, 0]} animation={currentAnimation} isSpeaking={isSpeaking} />
//         <OrbitControls />

//         {speechText && (
//           <Text position={[0, 2, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
//             {speechText}
//           </Text>
//         )}
//       </Canvas>

//       {/* Controls */}
//       <div style={{
//         position: 'absolute', bottom: 20, left: 0, right: 0,
//         display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
//       }}>
//         {/* Text Input */}
//         <input
//           type="text"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Type something for avatar to speak"
//           style={{ padding: '8px', fontSize: '16px', width: '300px' }}
//         />

//         {/* Buttons */}
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button onClick={() => speak(inputText)}>Speak Text</button>
//           <button onClick={toggleListening} style={{ background: listening ? 'red' : 'green', color: 'white' }}>
//             {listening ? 'Stop Listening' : 'Start Listening'}
//           </button>
//           <button onClick={() => playAnimation('Idle')}>Idle</button>
//           <button onClick={() => playAnimation('Nodding')}>Nod</button>
//           <button onClick={() => playAnimation('Thinking')}>Think</button>
//         </div>

//         <div style={{ color: 'white', marginTop: '10px' }}>
//           Transcript: {transcript}
//         </div>
//       </div>
//     </div>
//   )
// }


// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from './Avatar'
// import { useRef, useState } from 'react'

// export default function InterviewTest() {
//   const [text, setText] = useState('')
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking') // assume animation exists
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }} gl={{ localClippingEnabled: true }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[2, 5, 2]} intensity={1} />
//         <Avatar isSpeaking={isSpeaking} animationName={currentAnimation} position={[0, -1, 0]} />
//         <OrbitControls />
//       </Canvas>

//       <div style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center' }}>
//         <textarea
//           rows={3}
//           placeholder="Type something for the avatar to say..."
//           style={{ width: '60%', fontSize: '16px', padding: '10px' }}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <br />
//         <button
//           onClick={() => speak(text)}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             background: '#007bff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px'
//           }}
//         >
//           Speak
//         </button>
//       </div>
//     </div>
//   )
// }


// import { useEffect, useRef, useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from './Avatar'

// export default function InterviewPlatform() {
//   const [text, setText] = useState('')
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')

//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)

//   useEffect(() => {
//     // Request webcam and mic
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
//       setStream(mediaStream)
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream
//       }
//     })
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

// const toggleVideo = async () => {
//   if (videoOn) {
//     // Turn off: Stop and release the camera
//     stream.getVideoTracks().forEach((track) => track.stop())
//     setVideoOn(false)
//     if (videoRef.current) {
//       videoRef.current.srcObject = null // IMPORTANT
//     }
//   } else {
//     // Turn on: Reacquire camera stream
//     try {
//       const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//       setStream(newStream)
//       setVideoOn(true)
//       if (videoRef.current) {
//         videoRef.current.srcObject = newStream
//       }
//     } catch (err) {
//       console.error('Failed to reacquire camera:', err)
//     }
//   }
// }

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   return (
//     <div className="w-screen h-screen flex flex-col md:flex-row">
//       {/* Left: Candidate Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 p-4 flex flex-col items-center justify-center gap-4">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           className={`w-full max-w-md rounded-xl shadow-lg ${videoOn ? '' : 'hidden'}`}
//         />
//         {!videoOn && (
//           <div className="w-full max-w-md h-64 bg-black text-white flex items-center justify-center rounded-xl">
//             Camera Off
//           </div>
//         )}
//         <div className="flex gap-4">
//           <button
//             onClick={toggleMic}
//             className={`px-4 py-2 rounded-lg text-white ${micOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {micOn ? 'Mute Mic' : 'Unmute Mic'}
//           </button>
//           <button
//             onClick={toggleVideo}
//             className={`px-4 py-2 rounded-lg text-white ${videoOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {videoOn ? 'Stop Video' : 'Start Video'}
//           </button>
//         </div>
//       </div>

//       {/* Right: Interviewer Avatar */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-start pt-12">
//         <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }} gl={{ localClippingEnabled: true }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[2, 5, 2]} intensity={1} />

//           <Avatar
//             isSpeaking={isSpeaking}
//             animationName={currentAnimation}
//             position={[0, -7, 0]}  // tweak as needed
//             scale={4.5}
//           />

//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             maxPolarAngle={Math.PI / 2.2}  // ~80°
//             minPolarAngle={Math.PI / 2.5}  // ~72°
//           />
//         </Canvas>

//         <div className="absolute bottom-6 w-full px-4 text-center">
//           <textarea
//             rows={2}
//             placeholder="Ask a question..."
//             className="w-full max-w-xl mx-auto p-3 rounded-lg border border-gray-300 focus:outline-none"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <button
//             onClick={() => speak(text)}
//             className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//           >
//             Speak
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



//Working code snippet

// import { useEffect, useRef, useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'

// const InterviewPlatform = () => {
//   const [text, setText] = useState('')
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')

//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)

//   // ✅ Inject the Omnidimension Web Widget script
//   useEffect(() => {
//     const script = document.createElement('script')
//     script.id = 'omnidimension-web-widget'
//     script.async = true
//     script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=6183fc7d6bcb5beb03d9dc89bd806233'
//     document.body.appendChild(script)

//     return () => {
//       document.getElementById('omnidimension-web-widget')?.remove()
//     }
//   }, [])

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
//       setStream(mediaStream)
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream
//       }
//     })
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   return (
//     <div className="w-screen h-screen flex flex-col md:flex-row">
//       {/* Left: Candidate Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 p-4 flex flex-col items-center justify-center gap-4">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           className={`w-full max-w-md rounded-xl shadow-lg ${videoOn ? '' : 'hidden'}`}
//         />
//         {!videoOn && (
//           <div className="w-full max-w-md h-64 bg-black text-white flex items-center justify-center rounded-xl">
//             Camera Off
//           </div>
//         )}
//         <div className="flex gap-4">
//           <button
//             onClick={toggleMic}
//             className={`px-4 py-2 rounded-lg text-white ${micOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {micOn ? 'Mute Mic' : 'Unmute Mic'}
//           </button>
//           <button
//             onClick={toggleVideo}
//             className={`px-4 py-2 rounded-lg text-white ${videoOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {videoOn ? 'Stop Video' : 'Start Video'}
//           </button>
//         </div>
//       </div>

//       {/* Right: Interviewer Avatar */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-start pt-12">
//         <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }} gl={{ localClippingEnabled: true }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[2, 5, 2]} intensity={1} />
//           <Avatar
//             isSpeaking={isSpeaking}
//             animationName={currentAnimation}
//             position={[0, -7, 0]}
//             scale={4.5}
//           />
//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             maxPolarAngle={Math.PI / 2.2}
//             minPolarAngle={Math.PI / 2.5}
//           />
//         </Canvas>

//         <div className="absolute bottom-6 w-full px-4 text-center">
//           <textarea
//             rows={2}
//             placeholder="Ask a question..."
//             className="w-full max-w-xl mx-auto p-3 rounded-lg border border-gray-300 focus:outline-none"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <button
//             onClick={() => speak(text)}
//             className="mb-10 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//           >
//             Speak
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InterviewPlatform;





// Updated InterviewPlatform.jsx with interactive Q&A loop and state persistence

// import { useEffect, useRef, useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'
// import { useLocation, useNavigate } from 'react-router-dom'

// const InterviewPlatform = () => {
//   const { state } = useLocation()
//   const navigate = useNavigate()

//   const questions = state?.questions || []
//   const interviewType = state?.interviewType || 'Interview'

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [answers, setAnswers] = useState([])
//   const [userAnswer, setUserAnswer] = useState('')
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')

//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)

//   useEffect(() => {
//     const script = document.createElement('script')
//     script.id = 'omnidimension-web-widget'
//     script.async = true
//     script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=6183fc7d6bcb5beb03d9dc89bd806233'
//     document.body.appendChild(script)

//     return () => {
//       document.getElementById('omnidimension-web-widget')?.remove()
//     }
//   }, [])

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
//       setStream(mediaStream)
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream
//       }
//     })
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   const handleAnswerSubmit = () => {
//     if (!userAnswer.trim()) return

//     const updatedAnswers = [...answers, {
//       question: questions[currentIndex],
//       answer: userAnswer.trim()
//     }]
//     setAnswers(updatedAnswers)
//     setUserAnswer('')

//     if (currentIndex + 1 < questions.length) {
//       setCurrentIndex(currentIndex + 1)
//       speak(questions[currentIndex + 1])
//     } else {
//       navigate('/result', { state: { interviewType, qaPairs: updatedAnswers } })
//     }
//   }

//   useEffect(() => {
//     if (questions.length > 0) speak(questions[0])
//   }, [questions])

//   return (
//     <div className="w-screen h-screen flex flex-col md:flex-row">
//       {/* Left: Candidate Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 p-4 flex flex-col items-center justify-center gap-4">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           className={`w-full max-w-md rounded-xl shadow-lg ${videoOn ? '' : 'hidden'}`}
//         />
//         {!videoOn && (
//           <div className="w-full max-w-md h-64 bg-black text-white flex items-center justify-center rounded-xl">
//             Camera Off
//           </div>
//         )}
//         <div className="flex gap-4">
//           <button onClick={toggleMic} className={`px-4 py-2 rounded-lg text-white ${micOn ? 'bg-red-500' : 'bg-gray-500'}`}>
//             {micOn ? 'Mute Mic' : 'Unmute Mic'}
//           </button>
//           <button onClick={toggleVideo} className={`px-4 py-2 rounded-lg text-white ${videoOn ? 'bg-red-500' : 'bg-gray-500'}`}>
//             {videoOn ? 'Stop Video' : 'Start Video'}
//           </button>
//         </div>
//       </div>

//       {/* Right: Interviewer Avatar */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-start pt-12">
//         <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }} gl={{ localClippingEnabled: true }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[2, 5, 2]} intensity={1} />
//           <Avatar
//             isSpeaking={isSpeaking}
//             animationName={currentAnimation}
//             position={[0, -7, 0]}
//             scale={4.5}
//           />
//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             maxPolarAngle={Math.PI / 2.2}
//             minPolarAngle={Math.PI / 2.5}
//           />
//         </Canvas>

//         <div className="absolute bottom-6 w-full px-4 text-center">
//           <h2 className="text-lg font-semibold mb-2">Q{currentIndex + 1}: {questions[currentIndex]}</h2>
//           <textarea
//             rows={2}
//             placeholder="Your answer..."
//             className="w-full max-w-xl mx-auto p-3 rounded-lg border border-gray-300 focus:outline-none"
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//           />
//           <button
//             onClick={handleAnswerSubmit}
//             className="mb-10 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//           >
//             Submit Answer
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InterviewPlatform


////working code snippet

// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { questions = [], interviewType = '' } = location.state || {}

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])

//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)

//   // Load webcam stream
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
//       setStream(mediaStream)
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream
//       }
//     })
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   // Speech synthesis
//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   // Speak first question on load
//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   // Setup Web Speech API
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.lang = 'en-US'
//       recognition.continuous = false
//       recognition.interimResults = true

//       recognition.onresult = (event) => {
//         let final = ''
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           final += event.results[i][0].transcript
//         }
//         setUserAnswer(final)
//       }

//       recognition.onerror = (e) => console.error('Speech Recognition error:', e)
//       recognitionRef.current = recognition
//     }
//   }, [])

//   const startListening = () => {
//     setUserAnswer('')
//     recognitionRef.current?.start()
//   }

//   const stopListening = () => {
//     recognitionRef.current?.stop()
//   }

//   // const handleAnswerSubmit = () => {
//   //   const q = questions[currentIndex]
//   //   setQaPairs([...qaPairs, { question: q, answer: userAnswer }])
//   //   setUserAnswer('')

//   //   if (currentIndex + 1 < questions.length) {
//   //     setCurrentIndex((prev) => prev + 1)
//   //     speak(questions[currentIndex + 1])
//   //   } else {
//   //     navigate('/result', {
//   //       state: {
//   //         interviewType,
//   //         qaPairs
//   //       }
//   //     })
//   //   }
//   // }

//   const handleAnswerSubmit = () => {
//   const q = questions[currentIndex]
//   const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }] // Create updated array first
  
//   if (currentIndex + 1 < questions.length) {
//     setQaPairs(updatedQaPairs)
//     setUserAnswer('')
//     setCurrentIndex((prev) => prev + 1)
//     speak(questions[currentIndex + 1])
//   } else {
//     navigate('/result', {
//       state: {
//         interviewType,
//         questionsAndAnswers: updatedQaPairs // Use the correct property name here
//       }
//     })
//   }
// }

//   return (
//     <div className="w-screen h-screen flex flex-col md:flex-row">
//       {/* Candidate Video Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 p-4 flex flex-col items-center justify-center gap-4">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           className={`w-full max-w-md rounded-xl shadow-lg ${videoOn ? '' : 'hidden'}`}
//         />
//         {!videoOn && (
//           <div className="w-full max-w-md h-64 bg-black text-white flex items-center justify-center rounded-xl">
//             Camera Off
//           </div>
//         )}
//         <div className="flex gap-4">
//           <button
//             onClick={toggleMic}
//             className={`px-4 py-2 rounded-lg text-white ${micOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {micOn ? 'Mute Mic' : 'Unmute Mic'}
//           </button>
//           <button
//             onClick={toggleVideo}
//             className={`px-4 py-2 rounded-lg text-white ${videoOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {videoOn ? 'Stop Video' : 'Start Video'}
//           </button>
//         </div>
//       </div>

//       {/* Interviewer Avatar + Question Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-start pt-12">
//         <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[2, 5, 2]} intensity={1} />
//           <Avatar
//             isSpeaking={isSpeaking}
//             animationName={currentAnimation}
//             position={[0, -7, 0]}
//             scale={4.5}
//           />
//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             maxPolarAngle={Math.PI / 2.2}
//             minPolarAngle={Math.PI / 2.5}
//           />
//         </Canvas>

//         <div className="absolute bottom-4 w-full px-4 text-center">
//           <h2 className="text-lg font-semibold mb-2">
//             Q{currentIndex + 1}: {questions[currentIndex]}
//           </h2>

//           <textarea
//             rows={3}
//             placeholder="Your answer will appear here..."
//             className="w-full max-w-xl mx-auto p-3 mb-2 rounded-lg border border-gray-300 focus:outline-none"
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//           />

//           <div className="flex justify-center gap-4 mb-4">
//             <button
//               onClick={startListening}
//               className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
//             >
//               🎤 Start Answer
//             </button>
//             <button
//               onClick={stopListening}
//               className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
//             >
//               ⛔ Stop
//             </button>
//           </div>

//           <button
//             onClick={handleAnswerSubmit}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//           >
//             ✅ Submit Answer
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { questions = [], interviewType = '' } = location.state || {}

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])

//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)

//   // Load webcam stream
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
//       setStream(mediaStream)
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream
//       }
//     })
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   // Speech synthesis
//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   // Speak first question on load
//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   // Setup Web Speech API
// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//   if (SpeechRecognition) {
//     const recognition = new SpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.continuous = false
//     recognition.interimResults = true

//     let isManuallyStopped = false // Track manual stop

//     recognition.onresult = (event) => {
//       let interim = ''
//       let finalTranscript = userAnswer

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript + ' '
//         } else {
//           interim += transcript
//         }
//       }

//       setUserAnswer(finalTranscript + interim)
//     }

//     recognition.onerror = (e) => {
//       console.error('Speech Recognition error:', e)
//     }

//     recognition.onend = () => {
//       if (!isManuallyStopped) {
//         recognition.start() // auto-restart when not stopped manually
//       }
//     }

//     recognitionRef.current = recognition

//     // Store manual stop status in ref
//     recognitionRef.current._stopManually = () => {
//       isManuallyStopped = true
//       recognition.stop()
//     }

//     recognitionRef.current._startListening = () => {
//       isManuallyStopped = false
//       recognition.start()
//     }
//   }
// }, [userAnswer])

// const startListening = () => {
//   recognitionRef.current?._startListening()
// }

// const stopListening = () => {
//   recognitionRef.current?._stopManually()
// }

//   const handleAnswerSubmit = () => {
//     const q = questions[currentIndex]
//     const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }]

//     if (currentIndex + 1 < questions.length) {
//       setQaPairs(updatedQaPairs)
//       setUserAnswer('')
//       setCurrentIndex((prev) => prev + 1)
//       speak(questions[currentIndex + 1])
//     } else {
//       navigate('/result', {
//         state: {
//           interviewType,
//           questionsAndAnswers: updatedQaPairs
//         }
//       })
//     }
//   }

//   return (
//     <div className="w-screen h-screen flex flex-col md:flex-row">
//       {/* Candidate Video Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 p-4 flex flex-col items-center justify-center gap-4">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           className={`w-full max-w-md rounded-xl shadow-lg ${videoOn ? '' : 'hidden'}`}
//         />
//         {!videoOn && (
//           <div className="w-full max-w-md h-64 bg-black text-white flex items-center justify-center rounded-xl">
//             Camera Off
//           </div>
//         )}
//         <div className="flex gap-4">
//           <button
//             onClick={toggleMic}
//             className={`px-4 py-2 rounded-lg text-white ${micOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {micOn ? 'Mute Mic' : 'Unmute Mic'}
//           </button>
//           <button
//             onClick={toggleVideo}
//             className={`px-4 py-2 rounded-lg text-white ${videoOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {videoOn ? 'Stop Video' : 'Start Video'}
//           </button>
//         </div>
//       </div>

//       {/* Interviewer Avatar + Question Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-start pt-12">
//         <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[2, 5, 2]} intensity={1} />
//           <Avatar
//             isSpeaking={isSpeaking}
//             animationName={currentAnimation}
//             position={[0, -7, 0]}
//             scale={4.5}
//           />
//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             maxPolarAngle={Math.PI / 2.2}
//             minPolarAngle={Math.PI / 2.5}
//           />
//         </Canvas>

//         <div className="absolute bottom-4 w-full px-4 text-center">
//           <h2 className="text-lg font-semibold mb-2">
//             Q{currentIndex + 1}: {questions[currentIndex]}
//           </h2>

//           <textarea
//             rows={3}
//             placeholder="Your answer will appear here..."
//             className="w-full max-w-xl mx-auto p-3 mb-2 rounded-lg border border-gray-300 focus:outline-none"
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//           />

//           <div className="flex justify-center gap-4 mb-4">
//             <button
//               onClick={startListening}
//               className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
//             >
//               🎤 Start Answer
//             </button>
//             <button
//               onClick={stopListening}
//               className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
//             >
//               ⛔ Stop
//             </button>
//           </div>

//           <button
//             onClick={handleAnswerSubmit}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//           >
//             ✅ Submit Answer
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }












///Proper working

// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { questions = [], interviewType = '' } = location.state || {}

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])
//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)
//   const [isListening, setIsListening] = useState(false) // Added listening state

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)

//   // Load webcam stream
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         setStream(mediaStream)
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream
//         }
//       })
//       .catch(err => {
//         console.error('Error accessing media devices:', err)
//         // Handle error (e.g., show message to user)
//       })

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop())
//       }
//     }
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       // Fixed typo: changed 'enabled' to 'enabled'
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ 
//           video: true, 
//           audio: micOn 
//         })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   // Speech synthesis
//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   // Speak first question on load
//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   // Setup Web Speech API
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.lang = 'en-US'
//       recognition.continuous = true // Changed to continuous for better UX
//       recognition.interimResults = true

//       recognition.onstart = () => {
//         setIsListening(true)
//       }

//       recognition.onresult = (event) => {
//         let interim = ''
//         let final = ''
        
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript
//           if (event.results[i].isFinal) {
//             final += transcript + ' '
//           } else {
//             interim += transcript
//           }
//         }
        
//         setUserAnswer(prev => prev + final)
//       }

//       recognition.onerror = (e) => {
//         console.error('Speech Recognition error:', e)
//         setIsListening(false)
//       }

//       recognition.onend = () => {
//         setIsListening(false)
//       }

//       recognitionRef.current = recognition
//     }
//   }, [])

//   const startListening = () => {
//     setUserAnswer('')
//     if (recognitionRef.current) {
//       recognitionRef.current.start()
//     }
//   }

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop()
//     }
//   }

//   const handleAnswerSubmit = () => {
//     const q = questions[currentIndex]
//     const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }]
    
//     if (currentIndex + 1 < questions.length) {
//       setQaPairs(updatedQaPairs)
//       setUserAnswer('')
//       setCurrentIndex((prev) => prev + 1)
//       speak(questions[currentIndex + 1])
//     } else {
//       navigate('/result', {
//         state: {
//           interviewType,
//           questionsAndAnswers: updatedQaPairs
//         }
//       })
//     }
//   }

//   return (
//     <div className="w-screen h-screen flex flex-col md:flex-row">
//       {/* Candidate Video Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 p-4 flex flex-col items-center justify-center gap-4">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           className={`w-full max-w-md rounded-xl shadow-lg ${videoOn ? '' : 'hidden'}`}
//         />
//         {!videoOn && (
//           <div className="w-full max-w-md h-64 bg-black text-white flex items-center justify-center rounded-xl">
//             Camera Off
//           </div>
//         )}
//         <div className="flex gap-4">
//           <button
//             onClick={toggleMic}
//             className={`px-4 py-2 rounded-lg text-white ${micOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {micOn ? 'Mute Mic' : 'Unmute Mic'}
//           </button>
//           <button
//             onClick={toggleVideo}
//             className={`px-4 py-2 rounded-lg text-white ${videoOn ? 'bg-red-500' : 'bg-gray-500'}`}
//           >
//             {videoOn ? 'Stop Video' : 'Start Video'}
//           </button>
//         </div>
//         {/* Add microphone status indicator */}
//         <div className={`text-sm ${isListening ? 'text-green-500' : 'text-gray-500'}`}>
//           Microphone: {isListening ? 'Active' : 'Inactive'}
//         </div>
//       </div>

//       {/* Interviewer Avatar + Question Panel */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-start pt-12">
        // <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
        //   <ambientLight intensity={0.5} />
        //   <directionalLight position={[2, 5, 2]} intensity={1} />
        //   <Avatar
        //     isSpeaking={isSpeaking}
        //     animationName={currentAnimation}
        //     position={[0, -7, 0]}
        //     scale={4.5}
        //   />
        //   <OrbitControls
        //     enableZoom={false}
        //     enablePan={false}
        //     maxPolarAngle={Math.PI / 2.2}
        //     minPolarAngle={Math.PI / 2.5}
        //   />
        // </Canvas>

//         <div className="absolute bottom-4 w-full px-4 text-center">
//           <h2 className="text-lg font-semibold mb-2">
//             Q{currentIndex + 1}: {questions[currentIndex]}
//           </h2>

//           <textarea
//             rows={3}
//             placeholder={isListening ? "Speak now..." : "Your answer will appear here..."}
//             className="w-full max-w-xl mx-auto p-3 mb-2 rounded-lg border border-gray-300 focus:outline-none"
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//           />

//           <div className="flex justify-center gap-4 mb-4">
//             <button
//               onClick={startListening}
//               className={`px-4 py-2 text-white rounded shadow ${
//                 isListening ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
//               }`}
//               disabled={isListening}
//             >
//               🎤 Start Answer
//             </button>
//             <button
//               onClick={stopListening}
//               className={`px-4 py-2 text-white rounded shadow ${
//                 !isListening ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'
//               }`}
//               disabled={!isListening}
//             >
//               ⛔ Stop
//             </button>
//           </div>

//           <button
//             onClick={handleAnswerSubmit}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//             disabled={!userAnswer.trim()}
//           >
//             ✅ Submit Answer
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'
// import { motion, AnimatePresence } from 'framer-motion'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { questions = [], interviewType = '' } = location.state || {}

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])
//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)
//   const [isListening, setIsListening] = useState(false)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)

//   // Load webcam stream
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         setStream(mediaStream)
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream
//         }
//       })
//       .catch(err => {
//         console.error('Error accessing media devices:', err)
//       })

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop())
//       }
//     }
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ 
//           video: true, 
//           audio: micOn 
//         })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.lang = 'en-US'
//       recognition.continuous = true
//       recognition.interimResults = true

//       recognition.onstart = () => {
//         setIsListening(true)
//       }

//       recognition.onresult = (event) => {
//         let interim = ''
//         let final = ''
        
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript
//           if (event.results[i].isFinal) {
//             final += transcript + ' '
//           } else {
//             interim += transcript
//           }
//         }
        
//         setUserAnswer(prev => prev + final)
//       }

//       recognition.onerror = (e) => {
//         console.error('Speech Recognition error:', e)
//         setIsListening(false)
//       }

//       recognition.onend = () => {
//         setIsListening(false)
//       }

//       recognitionRef.current = recognition
//     }
//   }, [])

//   const startListening = () => {
//     setUserAnswer('')
//     if (recognitionRef.current) {
//       recognitionRef.current.start()
//     }
//   }

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop()
//     }
//   }

//   const handleAnswerSubmit = () => {
//     const q = questions[currentIndex]
//     const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }]
    
//     if (currentIndex + 1 < questions.length) {
//       setQaPairs(updatedQaPairs)
//       setUserAnswer('')
//       setCurrentIndex((prev) => prev + 1)
//       speak(questions[currentIndex + 1])
//     } else {
//       navigate('/result', {
//         state: {
//           interviewType,
//           questionsAndAnswers: updatedQaPairs
//         }
//       })
//     }
//   }

//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
//       <div className="w-full h-full flex flex-col md:flex-row">
//         {/* Candidate Video Panel */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full md:w-1/2 h-1/2 md:h-full p-6 flex flex-col items-center justify-center gap-6"
//         >
//           <motion.div 
//             className="relative w-full max-w-lg"
//             whileHover={{ scale: 1.02 }}
//           >
//             <video
//               ref={videoRef}
//               autoPlay
//               muted
//               className={`w-full rounded-2xl shadow-2xl ${videoOn ? '' : 'hidden'}`}
//             />
//             {!videoOn && (
//               <div className="w-full aspect-video bg-blue-800/50 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center">
//                 <div className="text-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                   </svg>
//                   <p className="text-blue-200">Camera is off</p>
//                 </div>
//               </div>
//             )}
            
//             {/* Mic status indicator */}
//             <motion.div 
//               className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
//                 isListening ? 'bg-green-500 animate-pulse' : 'bg-red-500'
//               }`}
//               animate={{
//                 scale: isListening ? [1, 1.2, 1] : 1
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: isListening ? Infinity : 0
//               }}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//               </svg>
//             </motion.div>
//           </motion.div>

//           <div className="flex gap-4">
//             <motion.button
//               onClick={toggleMic}
//               className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 ${
//                 micOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80 hover:bg-blue-900'
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//               </svg>
//               {micOn ? 'Mute' : 'Unmute'}
//             </motion.button>
            
//             <motion.button
//               onClick={toggleVideo}
//               className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 ${
//                 videoOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80 hover:bg-blue-900'
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//               </svg>
//               {videoOn ? 'Stop Video' : 'Start Video'}
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Interviewer Avatar + Question Panel */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-blue-800/20">
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm"
//           />
          
//           <div className="relative h-full w-full">
//         <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[2, 5, 2]} intensity={1} />
//           <Avatar
//             isSpeaking={isSpeaking}
//             animationName={currentAnimation}
//             position={[0, -7, 0]}
//             scale={4.5}
//           />
//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             maxPolarAngle={Math.PI / 2.2}
//             minPolarAngle={Math.PI / 2.5}
//           />
//         </Canvas>
//           </div>

//           <motion.div 
//             className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent pt-16 pb-8 px-6"
//             initial={{ y: 100 }}
//             animate={{ y: 0 }}
//             transition={{ type: 'spring', damping: 20 }}
//           >
//             <motion.div 
//               className="max-w-2xl mx-auto bg-blue-800/70 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-blue-700/50"
//               whileHover={{ scale: 1.01 }}
//             >
//               <div className="flex items-start mb-4">
//                 <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
//                   <span className="font-bold text-white">{currentIndex + 1}</span>
//                 </div>
//                 <h2 className="text-xl font-medium text-blue-100">
//                   {questions[currentIndex]}
//                 </h2>
//               </div>

//               <motion.textarea
//                 rows={3}
//                 placeholder={isListening ? "Speak now..." : "Type or speak your answer..."}
//                 className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg p-4 mb-4 text-blue-100 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={userAnswer}
//                 onChange={(e) => setUserAnswer(e.target.value)}
//                 whileFocus={{ borderColor: "#3b82f6" }}
//               />

//               <div className="flex flex-wrap justify-center gap-3 mb-6">
//                 <motion.button
//                   onClick={startListening}
//                   className={`px-5 py-2.5 rounded-lg flex items-center gap-2 ${
//                     isListening ? 'bg-blue-900/50' : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//                   whileHover={!isListening ? { scale: 1.05 } : {}}
//                   whileTap={!isListening ? { scale: 0.95 } : {}}
//                   disabled={isListening}
//                 >
//                   <motion.div
//                     animate={isListening ? { scale: [1, 1.1, 1] } : { scale: 1 }}
//                     transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                     </svg>
//                   </motion.div>
//                   Start Answer
//                 </motion.button>
                
//                 <motion.button
//                   onClick={stopListening}
//                   className={`px-5 py-2.5 rounded-lg flex items-center gap-2 ${
//                     !isListening ? 'bg-blue-900/50' : 'bg-yellow-600 hover:bg-yellow-700'
//                   }`}
//                   whileHover={isListening ? { scale: 1.05 } : {}}
//                   whileTap={isListening ? { scale: 0.95 } : {}}
//                   disabled={!isListening}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
//                   </svg>
//                   Stop
//                 </motion.button>
//               </div>

//               <motion.button
//                 onClick={handleAnswerSubmit}
//                 className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
//                   !userAnswer.trim() ? 'bg-blue-900/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//                 whileHover={userAnswer.trim() ? { scale: 1.02 } : {}}
//                 whileTap={userAnswer.trim() ? { scale: 0.98 } : {}}
//                 disabled={!userAnswer.trim()}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 {currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Interview'}
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }





// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'
// import { motion } from 'framer-motion'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { questions = [], interviewType = '' } = location.state || {}

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])
//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)
//   const [isListening, setIsListening] = useState(false)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         setStream(mediaStream)
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream
//         }
//       })
//       .catch(err => {
//         console.error('Error accessing media devices:', err)
//       })

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop())
//       }
//     }
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.lang = 'en-US'
//       recognition.continuous = true
//       recognition.interimResults = true

//       recognition.onstart = () => setIsListening(true)

//       recognition.onresult = (event) => {
//         let final = ''
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript
//           if (event.results[i].isFinal) {
//             final += transcript + ' '
//           }
//         }
//         setUserAnswer(prev => prev + final)
//       }

//       recognition.onerror = (e) => {
//         console.error('Speech Recognition error:', e)
//         setIsListening(false)
//       }

//       recognition.onend = () => setIsListening(false)

//       recognitionRef.current = recognition
//     }
//   }, [])

//   const startListening = () => {
//     setUserAnswer('')
//     if (recognitionRef.current) recognitionRef.current.start()
//   }

//   const stopListening = () => {
//     if (recognitionRef.current) recognitionRef.current.stop()
//   }

//   // const handleAnswerSubmit = () => {
//   //   const q = questions[currentIndex]
//   //   const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }]

//   //   if (currentIndex + 1 < questions.length) {
//   //     setQaPairs(updatedQaPairs)
//   //     setUserAnswer('')
//   //     setCurrentIndex((prev) => prev + 1)
//   //     speak(questions[currentIndex + 1])
//   //   } else {
//   //     navigate('/result', {
//   //       state: {
//   //         interviewType,
//   //         questionsAndAnswers: updatedQaPairs
//   //       }
//   //     })
//   //   }
//   // }


//   const handleAnswerSubmit = () => {
//   const q = questions[currentIndex];
//   const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }];

//   stopListening(); // ✅ stop recording before avatar speaks

//   if (currentIndex + 1 < questions.length) {
//     setQaPairs(updatedQaPairs);
//     setUserAnswer('');
//     setCurrentIndex((prev) => prev + 1);

//     setTimeout(() => {
//       speak(questions[currentIndex + 1]); // ✅ speak after stopping mic
//     }, 300);
//   } else {
//     navigate('/result', {
//       state: {
//         interviewType,
//         questionsAndAnswers: updatedQaPairs,
//       },
//     });
//   }
// };

//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
//       <div className="w-full h-full flex flex-col md:flex-row">
//         {/* Left: Candidate Panel */}
// <motion.div className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-4 overflow-hidden">
//   {/* Top half: Video and mic/cam controls */}
//   <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-hidden">
//     <div className="relative w-full max-w-lg">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         className={`w-full aspect-video rounded-2xl shadow-2xl object-cover ${videoOn ? '' : 'hidden'}`}
//       />
//       {!videoOn && (
//         <div className="w-full aspect-video bg-blue-800/50 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center">
//           <p className="text-blue-200">Camera is off</p>
//         </div>
//       )}

//       {/* Mic indicator */}
//       <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
//         isListening ? 'bg-green-500 animate-pulse' : 'bg-red-500'
//       }`}>
//         🎤
//       </div>
//     </div>

//     <div className="flex gap-4">
//       <motion.button
//         onClick={toggleMic}
//         className={`px-4 py-2 rounded-xl text-sm ${micOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80'}`}
//       >
//         {micOn ? 'Mute Mic' : 'Unmute Mic'}
//       </motion.button>
//       <motion.button
//         onClick={toggleVideo}
//         className={`px-4 py-2 rounded-xl text-sm ${videoOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80'}`}
//       >
//         {videoOn ? 'Stop Video' : 'Start Video'}
//       </motion.button>
//     </div>
//   </div>

//   {/* Bottom half: Answers */}
//   <div className="flex-none w-full max-w-lg mx-auto p-4 bg-blue-800/60 rounded-xl backdrop-blur-md border border-blue-700/50 overflow-y-auto">
//     <textarea
//       rows={3}
//       placeholder={isListening ? "Speak now..." : "Type or speak your answer..."}
//       className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg p-3 mb-4 text-blue-100 placeholder-blue-300 resize-none"
//       value={userAnswer}
//       onChange={(e) => setUserAnswer(e.target.value)}
//     />

//     <div className="flex flex-wrap justify-center gap-3 mb-4">
//       <button
//         onClick={startListening}
//         disabled={isListening}
//         className={`px-4 py-2 text-sm rounded-lg ${isListening ? 'bg-blue-900/50' : 'bg-blue-600 hover:bg-blue-700'}`}
//       >
//         Start Answer
//       </button>
//       <button
//         onClick={stopListening}
//         disabled={!isListening}
//         className={`px-4 py-2 text-sm rounded-lg ${!isListening ? 'bg-blue-900/50' : 'bg-yellow-600 hover:bg-yellow-700'}`}
//       >
//         Stop
//       </button>
//     </div>

//     <button
//       onClick={handleAnswerSubmit}
//       disabled={!userAnswer.trim()}
//       className={`w-full py-2 rounded-lg font-medium text-sm ${
//         !userAnswer.trim() ? 'bg-blue-900/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//       }`}
//     >
//       {currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Interview'}
//     </button>
//   </div>
// </motion.div>
//         {/* Right: Interviewer Avatar + Question */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-blue-800/20">
//           <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
//             <ambientLight intensity={0.5} />
//             <directionalLight position={[2, 5, 2]} intensity={1} />
//             <Avatar isSpeaking={isSpeaking} animationName={currentAnimation} position={[0, -7, 0]} scale={4.5} />
//             <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.5} />
//           </Canvas>

//           <motion.div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent pt-16 pb-8 px-6">
//             <motion.div className="max-w-2xl mx-auto bg-blue-800/70 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-blue-700/50">
//               <div className="flex items-start mb-4">
//                 <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
//                   <span className="font-bold text-white">{currentIndex + 1}</span>
//                 </div>
//                 <h2 className="text-xl font-medium text-blue-100">
//                   {questions[currentIndex]}
//                 </h2>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }








// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'
// import { motion } from 'framer-motion'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { questions = [], interviewType = '' } = location.state || {}

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])
//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)
//   const [isListening, setIsListening] = useState(false)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         setStream(mediaStream)
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream
//         }
//       })
//       .catch(err => {
//         console.error('Error accessing media devices:', err)
//       })

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop())
//       }
//     }
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.lang = 'en-US'
//       recognition.continuous = true
//       recognition.interimResults = true

//       recognition.onstart = () => setIsListening(true)

//       recognition.onresult = (event) => {
//         let final = ''
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript
//           if (event.results[i].isFinal) {
//             final += transcript + ' '
//           }
//         }
//         setUserAnswer(prev => prev + final)
//       }

//       recognition.onerror = (e) => {
//         console.error('Speech Recognition error:', e)
//         setIsListening(false)
//       }

//       recognition.onend = () => setIsListening(false)

//       recognitionRef.current = recognition
//     }
//   }, [])

//   const startListening = () => {
//     setUserAnswer('')
//     if (recognitionRef.current) recognitionRef.current.start()
//   }

//   const stopListening = () => {
//     if (recognitionRef.current) recognitionRef.current.stop()
//   }

//   const handleAnswerSubmit = () => {
//     const q = questions[currentIndex];
//     const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }];

//     stopListening();

//     if (currentIndex + 1 < questions.length) {
//       setQaPairs(updatedQaPairs);
//       setUserAnswer('');
//       setCurrentIndex((prev) => prev + 1);

//       setTimeout(() => {
//         speak(questions[currentIndex + 1]);
//       }, 300);
//     } else {
//       navigate('/result', {
//         state: {
//           interviewType,
//           questionsAndAnswers: updatedQaPairs,
//         },
//       });
//     }
//   };

//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
//       {/* Header */}
//       <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-blue-900/30 backdrop-blur-sm border-b border-blue-700/50">
//         <div className="flex items-center">
//           <svg className="w-6 h-6 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//           </svg>
//           <span className="text-lg font-semibold text-blue-100">AI Interview Platform</span>
//         </div>
//         <div className="bg-blue-700/50 px-4 py-2 rounded-full text-sm font-medium text-blue-100">
//           {interviewType || 'Technical Interview'}
//         </div>
//         <div className="text-sm text-blue-300">
//           Question {currentIndex + 1} of {questions.length}
//         </div>
//       </div>

//       <div className="w-full h-full flex flex-col md:flex-row pt-16">
//         {/* Left: Candidate Panel */}
//         <motion.div 
//           className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-4 overflow-hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Video Feed */}
//           <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-hidden">
//             <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-600/30 bg-blue-900/20">
//               {videoOn ? (
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   muted
//                   className="w-full aspect-video object-cover"
//                 />
//               ) : (
//                 <div className="w-full aspect-video bg-blue-900/50 flex items-center justify-center">
//                   <div className="text-center">
//                     <svg className="w-12 h-12 mx-auto text-blue-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     <p className="mt-2 text-blue-300">Camera is disabled</p>
//                   </div>
//                 </div>
//               )}
              
//               {/* Status Indicators */}
//               <div className="absolute top-4 right-4 flex gap-2">
//                 <div className={`w-3 h-3 rounded-full ${micOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                 <div className={`w-3 h-3 rounded-full ${videoOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
//               </div>
              
//               {/* Mic Indicator */}
//               {isListening && (
//                 <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-blue-800/80 px-3 py-1 rounded-full">
//                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//                   <span className="text-xs text-blue-100">Listening</span>
//                 </div>
//               )}
//             </div>

//             {/* Controls */}
//             {/* <div className="flex gap-3">
//               <motion.button
//                 onClick={toggleMic}
//                 whileTap={{ scale: 0.95 }}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
//                   micOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80 hover:bg-blue-900'
//                 }`}
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={micOn ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"} />
//                 </svg>
//                 {micOn ? 'Mute' : 'Unmute'}
//               </motion.button>
              
//               <motion.button
//                 onClick={toggleVideo}
//                 whileTap={{ scale: 0.95 }}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
//                   videoOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80 hover:bg-blue-900'
//                 }`}
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={videoOn ? "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" : "M15.536 8.464a5 5 0 010 7.072M12 12h.01M15.536 4.464a9 9 0 010 12.728M12 12h.01M8.464 15.536a5 5 0 010-7.072M12 12h.01M8.464 8.464a9 9 0 010-12.728M12 12h.01"} />
//                 </svg>
//                 {videoOn ? 'Stop Video' : 'Start Video'}
//               </motion.button>
//             </div> */}
//           </div>

//           {/* Answer Section */}
//           <div className="flex-none w-full max-w-xl mx-auto p-5 bg-blue-800/60 rounded-xl backdrop-blur-md border border-blue-700/50 shadow-lg">
//             <h3 className="text-sm font-medium text-blue-300 mb-3">Your Response</h3>
//             <textarea
//               rows={4}
//               placeholder={isListening ? "Speak now (your words will appear here)..." : "Type or speak your answer..."}
//               className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg p-4 mb-4 text-blue-100 placeholder-blue-300/70 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//               value={userAnswer}
//               onChange={(e) => setUserAnswer(e.target.value)}
//             />

//             <div className="flex flex-wrap justify-between gap-3">
//               <div className="flex gap-2">
//                 <button
//                   onClick={startListening}
//                   disabled={isListening}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
//                     isListening ? 'bg-blue-900/50' : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                   </svg>
//                   Speak
//                 </button>
//                 <button
//                   onClick={stopListening}
//                   disabled={!isListening}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
//                     !isListening ? 'bg-blue-900/50' : 'bg-yellow-600 hover:bg-yellow-700'
//                   }`}
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
//                   </svg>
//                   Stop
//                 </button>
//               </div>
              
//               <button
//                 onClick={handleAnswerSubmit}
//                 disabled={!userAnswer.trim()}
//                 className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm ${
//                   !userAnswer.trim() ? 'bg-blue-900/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {currentIndex + 1 < questions.length ? (
//                   <>
//                     <span>Next Question</span>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
//                     </svg>
//                   </>
//                 ) : (
//                   <>
//                     <span>Finish Interview</span>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right: Interviewer Avatar + Question */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-blue-800/20 border-t md:border-t-0 md:border-l border-blue-700/30">
//           <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
//             <ambientLight intensity={0.5} />
//             <directionalLight position={[2, 5, 2]} intensity={1} />
//             <Avatar isSpeaking={isSpeaking} animationName={currentAnimation} position={[0, -7, 0]} scale={4.5} />
//             <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.5} />
//           </Canvas>

//           {/* Question Card */}
//           <motion.div 
//             className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent pt-16 pb-8 px-6"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//           >
//             <motion.div 
//               className="max-w-2xl mx-auto bg-blue-800/70 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-blue-700/50"
//               whileHover={{ scale: 1.01 }}
//             >
//               <div className="flex items-start">
//                 <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
//                   <span className="font-bold text-white">{currentIndex + 1}</span>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-medium text-blue-100 mb-2">
//                     {questions[currentIndex]}
//                   </h2>
//                   <div className="flex gap-2 mt-3">
//                     <div className={`text-xs px-2 py-1 rounded-full ${isSpeaking ? 'bg-blue-600/50 text-blue-200' : 'bg-blue-900/30 text-blue-400'}`}>
//                       {isSpeaking ? 'AI is speaking...' : 'AI is listening'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }


/// <reference lib="dom" />

import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Avatar } from '../components/Avatar'
import { motion } from 'framer-motion'

interface LocationState {
  questions: string[]
  interviewType: string
}

interface QAPair {
  question: string
  answer: string
}

// Fallback typings for speech recognition events
type MySpeechRecognitionEvent = Event & {
  results: SpeechRecognitionResultList
  resultIndex: number
}

type MySpeechRecognitionErrorEvent = Event & {
  error: string
}

export default function InterviewPlatform() {
  const location = useLocation()
  const navigate = useNavigate()
  const { questions = [], interviewType = '' } = (location.state as LocationState) || {}

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [currentAnimation, setCurrentAnimation] = useState<string>('Idle')
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [qaPairs, setQaPairs] = useState<QAPair[]>([])
  const [stream, setStream] = useState<MediaStream | null>(null)
  // const [micOn, setMicOn] = useState<boolean>(true)
  // const [videoOn, setVideoOn] = useState<boolean>(true)
  const [isListening, setIsListening] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Cross-browser support for SpeechRecognition
  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognitionRef = useRef<InstanceType<typeof SpeechRecognitionClass> | null>(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      })
      .catch((err: Error) => {
        console.error('Error accessing media devices:', err)
      })

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const speak = (textToSpeak: string): void => {
    if (utteranceRef.current) {
      synthRef.current.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utteranceRef.current = utterance

    utterance.onstart = () => {
      setIsSpeaking(true)
      setCurrentAnimation('Talking')
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setCurrentAnimation('Idle')
    }

    synthRef.current.speak(utterance)
  }

  useEffect(() => {
    if (questions.length > 0) {
      speak(questions[0])
    }
  }, [questions])

  useEffect(() => {
    if (SpeechRecognitionClass) {
      const recognition = new SpeechRecognitionClass()
      recognition.lang = 'en-US'
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => setIsListening(true)

      recognition.onresult = (event: MySpeechRecognitionEvent) => {
        let final = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            final += transcript + ' '
          }
        }
        setUserAnswer(prev => prev + final)
      }

      recognition.onerror = (event: MySpeechRecognitionErrorEvent) => {
        console.error('Speech Recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => setIsListening(false)

      recognitionRef.current = recognition
    }
  }, [])

  const startListening = (): void => {
    setUserAnswer('')
    if (recognitionRef.current) recognitionRef.current.start()
  }

  const stopListening = (): void => {
    if (recognitionRef.current) recognitionRef.current.stop()
  }

  const handleAnswerSubmit = (): void => {
    const q = questions[currentIndex]
    const updatedQaPairs: QAPair[] = [...qaPairs, { question: q, answer: userAnswer }]

    stopListening()

    if (currentIndex + 1 < questions.length) {
      setQaPairs(updatedQaPairs)
      setUserAnswer('')
      setCurrentIndex((prev) => prev + 1)

      setTimeout(() => {
        speak(questions[currentIndex + 1])
      }, 300)
    } else {
      navigate('/result', {
        state: {
          interviewType,
          questionsAndAnswers: updatedQaPairs,
        },
      })
    }
  }


  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-blue-900/30 backdrop-blur-sm border-b border-blue-700/50">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span className="text-lg font-semibold text-blue-100">AI Interview Platform</span>
        </div>
        <div className="bg-blue-700/50 px-4 py-2 rounded-full text-sm font-medium text-blue-100">
          {interviewType || 'Technical Interview'}
        </div>
        <div className="text-sm text-blue-300">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      <div className="w-full h-full flex flex-col md:flex-row pt-16">
        {/* Left: Candidate Panel */}
        <motion.div 
          className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Video Feed */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-hidden">
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-600/30 bg-blue-900/20">
              {videoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-video bg-blue-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto text-blue-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-blue-300">Camera is disabled</p>
                  </div>
                </div>
              )}
              
              {/* Status Indicators */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className={`w-3 h-3 rounded-full ${micOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div className={`w-3 h-3 rounded-full ${videoOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              
              {/* Mic Indicator */}
              {isListening && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-blue-800/80 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-100">Listening</span>
                </div>
              )}
            </div>
          </div>

          {/* Answer Section */}
          <div className="flex-none w-full max-w-xl mx-auto p-5 bg-blue-800/60 rounded-xl backdrop-blur-md border border-blue-700/50 shadow-lg">
            <h3 className="text-sm font-medium text-blue-300 mb-3">Your Response</h3>
            <textarea
              rows={4}
              placeholder={isListening ? "Speak now (your words will appear here)..." : "Type or speak your answer..."}
              className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg p-4 mb-4 text-blue-100 placeholder-blue-300/70 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />

            <div className="flex flex-wrap justify-between gap-3">
              <div className="flex gap-2">
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                    isListening ? 'bg-blue-900/50' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Speak
                </button>
                <button
                  onClick={stopListening}
                  disabled={!isListening}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                    !isListening ? 'bg-blue-900/50' : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                  Stop
                </button>
              </div>
              
              <button
                onClick={handleAnswerSubmit}
                disabled={!userAnswer.trim()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm ${
                  !userAnswer.trim() ? 'bg-blue-900/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {currentIndex + 1 < questions.length ? (
                  <>
                    <span>Next Question</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Finish Interview</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Interviewer Avatar + Question */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-blue-800/20 border-t md:border-t-0 md:border-l border-blue-700/30">
          <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <Avatar isSpeaking={isSpeaking} animationName={currentAnimation} position={[0, -7, 0]} scale={4.5} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.5} />
          </Canvas>

          {/* Question Card */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent pt-16 pb-8 px-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div 
              className="max-w-2xl mx-auto bg-blue-800/70 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-blue-700/50"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                  <span className="font-bold text-white">{currentIndex + 1}</span>
                </div>
                <div>
                  <h2 className="text-xl font-medium text-blue-100 mb-2">
                    {questions[currentIndex]}
                  </h2>
                  <div className="flex gap-2 mt-3">
                    <div className={`text-xs px-2 py-1 rounded-full ${isSpeaking ? 'bg-blue-600/50 text-blue-200' : 'bg-blue-900/30 text-blue-400'}`}>
                      {isSpeaking ? 'AI is speaking...' : 'AI is listening'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}









// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'
// import { motion } from 'framer-motion'
// import { Mic, MicOff, Video, VideoOff, Send, ChevronRight, Pause, Circle } from 'lucide-react'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { questions = [], interviewType = '' } = location.state || {}

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])
//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)
//   const [isListening, setIsListening] = useState(false)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         setStream(mediaStream)
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream
//         }
//       })
//       .catch(err => {
//         console.error('Error accessing media devices:', err)
//       })

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop())
//       }
//     }
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.lang = 'en-US'
//       recognition.continuous = true
//       recognition.interimResults = true

//       recognition.onstart = () => setIsListening(true)

//       recognition.onresult = (event) => {
//         let final = ''
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript
//           if (event.results[i].isFinal) {
//             final += transcript + ' '
//           }
//         }
//         setUserAnswer(prev => prev + final)
//       }

//       recognition.onerror = (e) => {
//         console.error('Speech Recognition error:', e)
//         setIsListening(false)
//       }

//       recognition.onend = () => setIsListening(false)

//       recognitionRef.current = recognition
//     }
//   }, [])

//   const startListening = () => {
//     setUserAnswer('')
//     if (recognitionRef.current) recognitionRef.current.start()
//   }

//   const stopListening = () => {
//     if (recognitionRef.current) recognitionRef.current.stop()
//   }

//   const handleAnswerSubmit = () => {
//     const q = questions[currentIndex];
//     const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }];

//     stopListening();

//     if (currentIndex + 1 < questions.length) {
//       setQaPairs(updatedQaPairs);
//       setUserAnswer('');
//       setCurrentIndex((prev) => prev + 1);

//       setTimeout(() => {
//         speak(questions[currentIndex + 1]);
//       }, 300);
//     } else {
//       navigate('/result', {
//         state: {
//           interviewType,
//           questionsAndAnswers: updatedQaPairs,
//         },
//       });
//     }
//   };

//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 overflow-hidden">
//       {/* Header */}
//       <div className="w-full py-4 px-6 bg-white shadow-sm border-b border-blue-100">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold text-blue-600 flex items-center">
//             <span className="bg-blue-600 text-white rounded-lg px-2 py-1 mr-2 text-sm">AI</span>
//             Interview Platform
//           </h1>
//           <div className="flex items-center space-x-4">
//             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
//               {interviewType || 'Technical'} Interview
//             </div>
//             <div className="text-sm text-gray-500">
//               Question {currentIndex + 1} of {questions.length}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full h-[calc(100vh-64px)] flex flex-col lg:flex-row">
//         {/* Left Panel - Candidate View */}
//         <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-4 flex flex-col">
//           {/* Video Feed */}
//           <div className="flex-1 flex flex-col items-center justify-center relative bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
//             {videoOn ? (
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-blue-50">
//                 <div className="text-center">
//                   <VideoOff className="w-12 h-12 mx-auto text-blue-300 mb-2" />
//                   <p className="text-blue-400 font-medium">Camera is disabled</p>
//                 </div>
//               </div>
//             )}

//             {/* Mic Indicator */}
//             <div className={`absolute top-4 right-4 p-2 rounded-full ${
//               isListening ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
//             } shadow-md`}>
//               {isListening ? (
//                 <div className="flex items-center">
//                   <div className="relative">
//                     <Mic className="w-5 h-5" />
//                     <motion.div 
//                       className="absolute -inset-1 border-2 border-green-500 rounded-full"
//                       animate={{ scale: [1, 1.2, 1] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <MicOff className="w-5 h-5" />
//               )}
//             </div>
//           </div>

//           {/* Controls */}
//           {/* <div className="flex justify-center space-x-4 mt-4">
//             <motion.button
//               onClick={toggleMic}
//               whileTap={{ scale: 0.95 }}
//               className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
//                 micOn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
//               } shadow-sm`}
//             >
//               {micOn ? (
//                 <>
//                   <Mic className="w-4 h-4 mr-2" />
//                   Mute
//                 </>
//               ) : (
//                 <>
//                   <MicOff className="w-4 h-4 mr-2" />
//                   Unmute
//                 </>
//               )}
//             </motion.button>
//             <motion.button
//               onClick={toggleVideo}
//               whileTap={{ scale: 0.95 }}
//               className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
//                 videoOn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
//               } shadow-sm`}
//             >
//               {videoOn ? (
//                 <>
//                   <Video className="w-4 h-4 mr-2" />
//                   Stop Video
//                 </>
//               ) : (
//                 <>
//                   <VideoOff className="w-4 h-4 mr-2" />
//                   Start Video
//                 </>
//               )}
//             </motion.button>
//           </div> */}

//           {/* Answer Section */}
//           <div className="mt-4 bg-white rounded-xl shadow-md border border-blue-100 p-4 flex-1 flex flex-col">
//             <h3 className="text-sm font-medium text-gray-500 mb-2">Your Response</h3>
//             <textarea
//               rows={4}
//               placeholder={isListening ? "Speak now (your words will appear here)..." : "Type or speak your answer..."}
//               className="flex-1 w-full bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3 text-gray-700 placeholder-blue-300 resize-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
//               value={userAnswer}
//               onChange={(e) => setUserAnswer(e.target.value)}
//             />
            
//             <div className="flex flex-wrap justify-between items-center">
//               <div className="flex space-x-2">
//                 <button
//                   onClick={startListening}
//                   disabled={isListening}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
//                     isListening ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
//                   }`}
//                 >
//                   {isListening ? (
//                     <>
//                       <Circle className="w-3 h-3 mr-2 text-green-500 animate-pulse" />
//                       Listening...
//                     </>
//                   ) : (
//                     <>
//                       <Mic className="w-4 h-4 mr-2" />
//                       Start Speaking
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={stopListening}
//                   disabled={!isListening}
//                   className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
//                     !isListening ? 'bg-gray-100 text-gray-400' : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
//                   }`}
//                 >
//                   <Pause className="w-4 h-4 mr-2" />
//                   Stop
//                 </button>
//               </div>
              
//               <button
//                 onClick={handleAnswerSubmit}
//                 disabled={!userAnswer.trim()}
//                 className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm ${
//                   !userAnswer.trim() ? 'bg-gray-100 text-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'
//                 } shadow-sm`}
//               >
//                 {currentIndex + 1 < questions.length ? (
//                   <>
//                     Next Question
//                     <ChevronRight className="w-4 h-4 ml-2" />
//                   </>
//                 ) : (
//                   <>
//                     Finish Interview
//                     <Send className="w-4 h-4 ml-2" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Interviewer View */}
//         <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-gradient-to-br from-blue-600 to-blue-500 relative overflow-hidden">
//           {/* 3D Avatar */}
//           <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
//             <ambientLight intensity={0.8} />
//             <directionalLight position={[2, 5, 2]} intensity={1} />
//             <Avatar 
//               isSpeaking={isSpeaking} 
//               animationName={currentAnimation} 
//               position={[0, -7, 0]} 
//               scale={4.5} 
//             />
//             <OrbitControls 
//               enableZoom={false} 
//               enablePan={false} 
//               maxPolarAngle={Math.PI / 2.2} 
//               minPolarAngle={Math.PI / 2.5} 
//             />
//           </Canvas>

//           {/* Current Question */}
//           <motion.div 
//             className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-800/90 to-transparent pt-12 pb-6 px-6"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/20">
//               <div className="flex items-start">
//                 <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
//                   <span className="font-bold text-white">{currentIndex + 1}</span>
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-medium text-gray-800 mb-1">
//                     {questions[currentIndex]}
//                   </h2>
//                   <div className={`flex items-center text-sm ${
//                     isSpeaking ? 'text-blue-600' : 'text-gray-500'
//                   }`}>
//                     <div className={`w-2 h-2 rounded-full mr-2 ${
//                       isSpeaking ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'
//                     }`} />
//                     {isSpeaking ? 'AI is speaking' : 'Waiting for your response'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }



// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../components/Avatar'
// import { motion, AnimatePresence } from 'framer-motion'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { questions = [], interviewType = '' } = location.state || {}

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])
//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)
//   const [isListening, setIsListening] = useState(false)
//   const [volume, setVolume] = useState(0)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)
//   const animationRef = useRef(null)

//   // Audio analyzer setup
//   useEffect(() => {
//     if (!stream || !micOn) return

//     const audioContext = new (window.AudioContext || window.webkitAudioContext)()
//     const analyser = audioContext.createAnalyser()
//     const microphone = audioContext.createMediaStreamSource(stream)
//     microphone.connect(analyser)
//     analyser.fftSize = 32

//     const bufferLength = analyser.frequencyBinCount
//     const dataArray = new Uint8Array(bufferLength)

//     const analyzeAudio = () => {
//       analyser.getByteFrequencyData(dataArray)
//       const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
//       setVolume(Math.min(average / 10, 1)) // Normalize to 0-1 range
//       animationRef.current = requestAnimationFrame(analyzeAudio)
//     }

//     analyzeAudio()

//     return () => {
//       cancelAnimationFrame(animationRef.current)
//       audioContext.close()
//     }
//   }, [stream, micOn])

//   // Load webcam stream
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         setStream(mediaStream)
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream
//         }
//       })
//       .catch(err => {
//         console.error('Error accessing media devices:', err)
//       })

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop())
//       }
//       cancelAnimationFrame(animationRef.current)
//     }
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach(track => (track.enabled = !micOn))
//       setMicOn(!micOn)
//       if (!micOn && isListening) {
//         startListening()
//       }
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach(track => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ 
//           video: true, 
//           audio: micOn 
//         })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   // Speech synthesis
//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   // Speak first question on load
//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   // Setup Web Speech API
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.lang = 'en-US'
//       recognition.continuous = true
//       recognition.interimResults = true

//       recognition.onstart = () => {
//         setIsListening(true)
//       }

//       recognition.onresult = (event) => {
//         let interim = ''
//         let final = ''
        
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript
//           if (event.results[i].isFinal) {
//             final += transcript + ' '
//           } else {
//             interim += transcript
//           }
//         }
        
//         setUserAnswer(prev => prev + final)
//       }

//       recognition.onerror = (e) => {
//         console.error('Speech Recognition error:', e)
//         setIsListening(false)
//       }

//       recognition.onend = () => {
//         setIsListening(false)
//       }

//       recognitionRef.current = recognition
//     }
//   }, [])

//   const startListening = () => {
//     setUserAnswer('')
//     if (recognitionRef.current) {
//       recognitionRef.current.start()
//     }
//   }

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop()
//     }
//   }

//   const handleAnswerSubmit = () => {
//     const q = questions[currentIndex]
//     const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }]
    
//     if (currentIndex + 1 < questions.length) {
//       setQaPairs(updatedQaPairs)
//       setUserAnswer('')
//       setCurrentIndex(prev => prev + 1)
//       speak(questions[currentIndex + 1])
//     } else {
//       navigate('/result', {
//         state: {
//           interviewType,
//           questionsAndAnswers: updatedQaPairs
//         }
//       })
//     }
//   }

//   // Animation variants
//   const questionVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   }

//   const buttonVariants = {
//     hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
//     tap: { scale: 0.95 }
//   }

//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
//       <div className="w-full h-full flex flex-col md:flex-row">
//         {/* Candidate Video Panel */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 flex flex-col items-center justify-center gap-6">
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
//           >
//             <div className="relative pt-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600">
//               <h3 className="text-white font-medium text-center">Your Camera</h3>
//               <div className="absolute top-3 right-3 flex gap-2">
//                 <motion.div 
//                   animate={{ scale: micOn ? [1, 1.2, 1] : 1 }}
//                   transition={{ duration: 0.5, repeat: micOn ? Infinity : 0 }}
//                   className={`w-3 h-3 rounded-full ${micOn ? 'bg-green-400' : 'bg-gray-400'}`}
//                 />
//                 <div className={`w-3 h-3 rounded-full ${videoOn ? 'bg-green-400' : 'bg-gray-400'}`} />
//               </div>
//             </div>
            
//             <AnimatePresence mode="wait">
//               {videoOn ? (
//                 <motion.video
//                   key="video"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   ref={videoRef}
//                   autoPlay
//                   muted
//                   className="w-full aspect-video object-cover"
//                 />
//               ) : (
//                 <motion.div 
//                   key="placeholder"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="w-full aspect-video bg-blue-900 flex items-center justify-center"
//                 >
//                   <div className="text-white text-lg">Camera is turned off</div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
            
//             <div className="p-4 bg-white flex justify-center gap-4">
//               <motion.button
//                 whileHover="hover"
//                 whileTap="tap"
//                 variants={buttonVariants}
//                 onClick={toggleMic}
//                 className={`px-5 py-2 rounded-xl text-white font-medium flex items-center gap-2 ${
//                   micOn ? 'bg-red-500' : 'bg-gray-500'
//                 }`}
//               >
//                 {micOn ? (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
//                     </svg>
//                     Mute
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                     Unmute
//                   </>
//                 )}
//               </motion.button>
              
//               <motion.button
//                 whileHover="hover"
//                 whileTap="tap"
//                 variants={buttonVariants}
//                 onClick={toggleVideo}
//                 className={`px-5 py-2 rounded-xl text-white font-medium flex items-center gap-2 ${
//                   videoOn ? 'bg-red-500' : 'bg-blue-500'
//                 }`}
//               >
//                 {videoOn ? (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
//                     </svg>
//                     Stop Video
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
//                     </svg>
//                     Start Video
//                   </>
//                 )}
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Audio visualization */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isListening ? 1 : 0.5 }}
//             className="w-full max-w-lg bg-white rounded-xl p-4 shadow-md"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <div className={`w-3 h-3 rounded-full ${isListening ? 'animate-pulse bg-green-500' : 'bg-gray-400'}`} />
//                 <span className="text-sm font-medium">
//                   {isListening ? 'Listening...' : 'Microphone Ready'}
//                 </span>
//               </div>
//               <span className="text-xs text-gray-500">
//                 {interviewType} Interview
//               </span>
//             </div>
            
//             <div className="flex items-end gap-1 h-12">
//               {Array.from({ length: 20 }).map((_, i) => (
//                 <motion.div
//                   key={i}
//                   animate={{
//                     height: `${isListening ? Math.max(5, volume * 100 * Math.random()) : 5}%`,
//                     backgroundColor: isListening 
//                       ? `hsl(${200 + volume * 60}, 80%, 50%)` 
//                       : '#e5e7eb'
//                   }}
//                   transition={{ duration: 0.1 }}
//                   className="w-2 rounded-t-sm"
//                 />
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Interviewer Avatar + Question Panel */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-gradient-to-b from-blue-800 to-blue-900 text-white">
//           <div className="absolute inset-0 overflow-hidden">
//             <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
//               <ambientLight intensity={0.8} />
//               <directionalLight position={[2, 5, 2]} intensity={1.5} color="#93c5fd" />
//               <pointLight position={[-2, 0, 5]} intensity={0.5} color="#3b82f6" />
//               <Avatar
//                 isSpeaking={isSpeaking}
//                 animationName={currentAnimation}
//                 position={[0, -7, 0]}
//                 scale={4.5}
//               />
//               <OrbitControls
//                 enableZoom={false}
//                 enablePan={false}
//                 maxPolarAngle={Math.PI / 2.2}
//                 minPolarAngle={Math.PI / 2.5}
//               />
//             </Canvas>
//           </div>

//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
//             <motion.div 
//               key={currentIndex}
//               variants={questionVariants}
//               initial="hidden"
//               animate="visible"
//               className="max-w-3xl mx-auto"
//             >
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
//                 <div className="flex items-start gap-3">
//                   <div className="bg-blue-500 rounded-lg p-2 flex-shrink-0">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="text-sm text-blue-300 font-medium mb-1">
//                       Question {currentIndex + 1} of {questions.length}
//                     </div>
//                     <h2 className="text-xl font-semibold">
//                       {questions[currentIndex]}
//                     </h2>
//                   </div>
//                 </div>
//               </div>

//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="mb-6"
//               >
//                 <textarea
//                   rows={3}
//                   placeholder={isListening ? "Speak now..." : "Type or speak your answer..."}
//                   className="w-full p-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   value={userAnswer}
//                   onChange={(e) => setUserAnswer(e.target.value)}
//                 />
//               </motion.div>

//               <div className="flex flex-wrap justify-center gap-3 mb-4">
//                 <motion.button
//                   whileHover="hover"
//                   whileTap="tap"
//                   variants={buttonVariants}
//                   onClick={startListening}
//                   className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 ${
//                     isListening ? 'bg-yellow-500/90' : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//                   disabled={isListening}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
//                   </svg>
//                   Start Answer
//                 </motion.button>
                
//                 <motion.button
//                   whileHover="hover"
//                   whileTap="tap"
//                   variants={buttonVariants}
//                   onClick={stopListening}
//                   className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 ${
//                     !isListening ? 'bg-gray-600' : 'bg-red-500 hover:bg-red-600'
//                   }`}
//                   disabled={!isListening}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
//                   </svg>
//                   Stop
//                 </motion.button>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleAnswerSubmit}
//                 disabled={!userAnswer.trim()}
//                 className={`w-full py-3 rounded-xl font-bold ${
//                   userAnswer.trim() 
//                     ? 'bg-blue-500 hover:bg-blue-600' 
//                     : 'bg-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 {currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Interview'}
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
