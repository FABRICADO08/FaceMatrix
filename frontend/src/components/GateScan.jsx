import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function GateScan() {
  const webcamRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const scanFace = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setResult({ success: false, message: 'Could not capture image' });
      return;
    }
    setScanning(true);
    try {
      const response = await axios.post(`${API_URL}/checkin`, { image_base64: imageSrc });
      setResult(response.data);
    } catch (err) {
      setResult({ success: false, message: 'Server error' });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full rounded mb-4" />
      <button onClick={scanFace} disabled={scanning} className="bg-green-600 text-white px-6 py-2 rounded w-full">
        {scanning ? 'Scanning...' : 'Scan Face at Gate'}
      </button>

      {result && (
        <div className={`mt-6 p-4 rounded ${result.success ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border`}>
          {result.success ? (
            <>
              <p className="font-bold text-green-800">✅ Access Granted</p>
              <p>Name: {result.name}</p>
              <p>Team: {result.team}</p>
              <p>Idea: {result.idea}</p>
            </>
          ) : (
            <p className="text-red-800">❌ {result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}