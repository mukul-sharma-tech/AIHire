import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChooseType from './pages/ChooseType'
import InterviewPlatform from './pages/InterviewPlatform'
import Result from './pages/Result'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseType />} />
        <Route path="/interview" element={<InterviewPlatform />} />
        <Route path="/result" element={<Result />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}
export default App



// import React from "react";
// import FaceEmotionDetector from "./components/FaceEmotionDetector";

// function App() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-center mt-4">
//         😊 Real-Time Facial Emotion Detection
//       </h1>
//       <FaceEmotionDetector />
//     </div>
//   );
// }

// export default App;
