import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function GateScan({ isAdmin = false }) {
  const webcamRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  if (!isAdmin) {
    return (
      <div className="p-8 bg-red-900 bg-opacity-20 border border-red-600 rounded-lg text-red-400 text-center">
        <p className="font-semibold">⛔ Access Denied</p>
        <p className="text-sm mt-2">Gate Scan is only available to administrators.</p>
      </div>
    );
  }

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
    <div className="max-w-2xl mx-auto">
      <div className="dark-card rounded-lg p-8 mb-6">
        <h3 className="gold-text text-sm uppercase tracking-widest font-semibold mb-6">GATE SCANNING</h3>
        <Webcam 
          ref={webcamRef} 
          screenshotFormat="image/jpeg" 
          className="w-full rounded-lg mb-6 border border-gray-700"
        />
        <button 
          onClick={scanFace} 
          disabled={scanning} 
          className="button-gold w-full px-6 py-3 rounded font-semibold uppercase tracking-wider disabled:opacity-50"
        >
          {scanning ? '🔄 SCANNING...' : '📸 SCAN FACE AT GATE'}
        </button>
      </div>

      {result && (
        <div className={`p-6 rounded-lg border ${result.success ? 'bg-green-900 bg-opacity-20 border-green-600' : 'bg-red-900 bg-opacity-20 border-red-600'}`}>
          {result.success ? (
            <>
              <p className="font-bold text-green-400 text-lg mb-4">✅ ACCESS GRANTED</p>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Name:</span> <span className="text-white font-semibold">{result.name}</span></p>
                <p><span className="text-gray-400">Team:</span> <span className="text-white font-semibold">{result.team}</span></p>
                <p><span className="text-gray-400">Idea:</span> <span className="text-white font-semibold">{result.idea}</span></p>
              </div>
            </>
          ) : (
            <p className="text-red-400 font-semibold">❌ {result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
