import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Moon, Sun, ChevronRight, Upload, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

type TabType = 'generate' | 'upload';

export default function ChooseType() {
  const [interviewType, setInterviewType] = useState<string>('');
  const [customType, setCustomType] = useState<string>('');
  const [interviewLevel, setInterviewLevel] = useState<string>('');
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('generate');

  const navigate = useNavigate();
  const types: string[] = ['SDE', 'HR', 'ML', 'System Design', 'Other'];
  const levels: string[] = ['Intern', 'Entry Level', 'Mid-Level', 'Senior Level'];

  const generateQuestions = async (): Promise<void> => {
    const role = interviewType === 'Other' ? customType : interviewType;
    if (!role || !interviewLevel) return;
    setLoading(true);

    try {
      const prompt = `
You are an experienced technical interviewer.
Generate 4 concise and realistic interview questions for a ${interviewLevel} ${role} position.
- Focus on practical and commonly asked questions in real interviews.
- Keep each question short (1-2 lines), clear, and direct.
- Include topics relevant to current technologies and industry needs.
- Avoid complex multi-part or hypothetical case studies.
- Do NOT include any explanations or headings — only list the questions.
`.trim();

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const aiQuestions = text
        .split('\n')
        .map(q => q.replace(/^[-•\d.]*\s*/, '').trim())
        .filter(Boolean)
        .slice(0, 4);

      const finalQuestions = [
        'Introduce yourself.',
        ...aiQuestions
      ];

      setQuestionList(finalQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
    }

    setLoading(false);
  };

  const handleUploadPdf = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('https://aihire-0ar6.onrender.com/extract-pdf', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.questions?.length > 0) {
        setQuestionList(data.questions);
      } else {
        alert('No questions extracted. Try another file.');
      }
    } catch (err) {
      console.error('Error uploading PDF:', err);
      alert('Something went wrong while uploading the PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = (): void => {
    if (questionList.length === 0) return;
    navigate('/interview', {
      state: {
        questions: questionList,
        interviewType: interviewType === 'Other' ? customType : interviewType,
        interviewLevel
      }
    });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'} min-h-screen transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
        {/* Header with dark mode toggle */}
        <motion.div 
          className="w-full flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Interview Prep AI
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-blue-100'} shadow-md transition-colors`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-700" />}
          </button>
        </motion.div>

        {/* Main card */}
        <motion.div 
          className={`w-full rounded-xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Card header */}
          <div className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-600'} text-white`}>
            <h2 className="text-2xl font-bold">Prepare for Your Interview</h2>
            <p className="opacity-90">Get personalized questions based on your role and experience level</p>
          </div>

          {/* Card body */}
          <div className="p-6">
            {/* Tab selector */}
            <div className="flex mb-6 border-b">
              <button
                onClick={() => setActiveTab('generate')}
                className={`px-4 py-2 font-medium ${activeTab === 'generate' ? 
                  `${darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}` : 
                  `${darkMode ? 'text-gray-400' : 'text-gray-500'}`}`}
              >
                <Sparkles className="inline mr-2 w-4 h-4" />
                Generate Questions
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 font-medium ${activeTab === 'upload' ? 
                  `${darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}` : 
                  `${darkMode ? 'text-gray-400' : 'text-gray-500'}`}`}
              >
                <Upload className="inline mr-2 w-4 h-4" />
                Upload PDF
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'generate' ? (
                <motion.div
                  key="generate"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Interview Type
                    </label>
                    <select
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      value={interviewType}
                      onChange={(e) => setInterviewType(e.target.value)}
                    >
                      <option value="">Select a type</option>
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {interviewType === 'Other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Custom Role
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your custom role"
                        className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        value={customType}
                        onChange={(e) => setCustomType(e.target.value)}
                      />
                    </motion.div>
                  )}

                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Experience Level
                    </label>
                    <select
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      value={interviewLevel}
                      onChange={(e) => setInterviewLevel(e.target.value)}
                    >
                      <option value="">Select a level</option>
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      disabled={!interviewType || (interviewType === 'Other' && !customType) || !interviewLevel || loading}
                      onClick={generateQuestions}
                      className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                        loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                      } text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {loading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block"
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.span>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Generate Questions with AI
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Upload Resume/Job Description (PDF)
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-blue-300 bg-blue-50'}`}>
                      <Upload className={`mx-auto w-10 h-10 mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Drag & drop your PDF file here</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>or</p>
                      <label className="inline-block mt-2">
                        <span className={`py-2 px-4 rounded-lg font-medium cursor-pointer ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
                          Browse Files
                          <input type="file" accept=".pdf" onChange={handleUploadPdf} className="hidden" />
                        </span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Questions preview card */}
        {questionList.length > 0 && (
          <motion.div 
            className={`w-full mt-6 rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} border-b ${darkMode ? 'border-gray-600' : 'border-blue-200'}`}>
              <h3 className="font-bold flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                Generated Questions Preview
              </h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {questionList.map((q, idx) => (
                  <motion.li 
                    key={idx}
                    className={`flex items-start p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-blue-50 hover:bg-blue-100'} transition-colors`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 flex-shrink-0 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-200 text-blue-800'}`}>
                      {idx + 1}
                    </span>
                    <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{q}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleProceed}
                  className={`py-2 px-6 rounded-lg font-medium flex items-center gap-2 transition-all ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white shadow-md`}
                >
                  Start Interview
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}







//without pdf upload

// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { GoogleGenerativeAI } from '@google/generative-ai'

// const genAI = new GoogleGenerativeAI("AIzaSyAy-dmBbhBNXWtxOQHj0yCf4WPlKeJB8U0") // Replace with your actual API key 
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// export default function ChooseType() {
//   const [interviewType, setInterviewType] = useState('')
//   const [questionList, setQuestionList] = useState([])
//   const [loading, setLoading] = useState(false)

//   const navigate = useNavigate()
//   const types = ['SDE', 'HR', 'ML', 'System Design']

//   const generateQuestions = async () => {
//     if (!interviewType) return
//     setLoading(true)

//     try {
//       const prompt = `Generate 5 interview questions for a ${interviewType} role. Return only questions.`
//       const result = await model.generateContent(prompt)
//       const response = await result.response
//       const text = response.text()
//       const questions = text
//         .split('\n')
//         .map(q => q.replace(/^[-•\d.]*\s*/, '').trim())
//         .filter(Boolean)

//       setQuestionList(questions)
//     } catch (error) {
//       console.error('Error generating questions:', error)
//     }

//     setLoading(false)
//   }

//   const handleProceed = () => {
//     if (questionList.length === 0) return
//     navigate('/interview', {
//       state: { questions: questionList, interviewType }
//     })
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-white">
//       <h1 className="text-3xl font-bold text-center">Choose Interview Type</h1>

//       <select
//         className="p-2 border rounded-md w-64"
//         value={interviewType}
//         onChange={(e) => setInterviewType(e.target.value)}
//       >
//         <option value="">Select Interview Type</option>
//         {types.map(type => (
//           <option key={type} value={type}>{type}</option>
//         ))}
//       </select>

//       <button
//         disabled={!interviewType || loading}
//         onClick={generateQuestions}
//         className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md"
//       >
//         {loading ? 'Generating...' : 'Generate with Gemini'}
//       </button>

//       <button
//         disabled={questionList.length === 0}
//         onClick={handleProceed}
//         className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md"
//       >
//         Start Interview
//       </button>

//       {questionList.length > 0 && (
//         <div className="w-full max-w-md bg-gray-50 p-4 rounded-lg mt-4 text-left shadow">
//           <h2 className="text-lg font-bold mb-2">Generated Questions:</h2>
//           <ul className="list-disc list-inside text-sm">
//             {questionList.map((q, idx) => (
//               <li key={idx}>{q}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }
