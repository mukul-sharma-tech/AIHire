import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FaceEmotionDetector = () => {
  const webcamRef = useRef(null);
  const [emotionTimeline, setEmotionTimeline] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const detectEmotions = async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const detections = await faceapi
          .detectSingleFace(
            webcamRef.current.video,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections && detections.expressions) {
          const expressions = detections.expressions;
          const topEmotion = Object.entries(expressions).reduce((a, b) =>
            a[1] > b[1] ? a : b
          )[0];

          setEmotionTimeline((prev) => [...prev, topEmotion]);
        }
      }
    };

    loadModels().then(() => {
      const interval = setInterval(detectEmotions, 1000);
      return () => clearInterval(interval);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">🎥 Facial Emotion Tracker</h2>
      <Webcam
        ref={webcamRef}
        audio={false}
        height={300}
        width={400}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
      />
      <div className="mt-4 bg-gray-100 p-3 rounded shadow">
        <h4 className="font-bold">🧠 Detected Emotions:</h4>
        <div className="mt-2">
          {emotionTimeline.map((emo, idx) => (
            <span key={idx} className="mr-2 px-2 py-1 bg-blue-200 rounded">
              {emo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceEmotionDetector;
