//typesafe 
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

type QAPair = {
  question: string;
  answer: string;
};

type ResultPageState = {
  qaPairs?: QAPair[];
  questionsAndAnswers?: QAPair[];
  interviewType?: string;
};

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [interviewType, setInterviewType] = useState<string>('');

  const locationState = state as ResultPageState;
  const questionsAndAnswers: QAPair[] =
    locationState?.qaPairs || locationState?.questionsAndAnswers || [];

  useEffect(() => {
    if (locationState?.interviewType) setInterviewType(locationState.interviewType);

    if (questionsAndAnswers.length === 0) {
      navigate('/');
      return;
    }

    const generateReport = async () => {
      setLoading(true);

      const prompt = `
You are an experienced AI Interview Evaluator.

Below is a ${interviewType} interview transcript with questions and the candidate's answers. Analyze the performance in detail.

## Analyze Each Answer:
Briefly evaluate the quality of the candidate’s response for each question.

${questionsAndAnswers
        .map(
          (pair, index) =>
            `Q${index + 1}: ${pair.question}\nA${index + 1}: ${pair.answer}\nEvaluate A${index + 1} in 2-3 sentences.`
        )
        .join('\n\n')}

## Summary:
Give a short overview of how the candidate performed.

## Strengths:
List 2–3 strengths observed in the responses.

## Areas for Improvement:
List 2–3 areas where the candidate can improve.

## Suggestions:
Provide actionable advice or resources the candidate can use to improve.

## Final Score:
Give an overall score out of 10 with a short justification.
`;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setReport(text);
      } catch (err) {
        console.error('Failed to generate report:', err);
        setReport('❌ Error generating report. Please try again.');
      }

      setLoading(false);
    };

    generateReport();
  }, [questionsAndAnswers, navigate, interviewType, locationState]);

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800">Interview Report</h1>
          {interviewType && (
            <h2 className="text-xl text-blue-600 mt-2">Role: {interviewType}</h2>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-blue-700 text-lg">Generating your detailed report...</p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 shadow-lg">
            <div className="prose prose-blue max-w-none whitespace-pre-wrap text-gray-800">
              {report.split('\n').map((line, index) => {
                if (line.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-blue-700 text-xl font-semibold mt-6 mb-3">
                      {line.replace('##', '').trim()}
                    </h2>
                  );
                } else if (line.startsWith('Q')) {
                  return (
                    <p key={index} className="font-medium text-gray-900 mb-2">
                      {line}
                    </p>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 mb-3">
                      {line}
                    </p>
                  );
                }
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-blue-200 text-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                🎯 Start New Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
