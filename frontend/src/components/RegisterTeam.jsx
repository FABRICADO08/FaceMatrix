import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterTeam() {
  const webcamRef = useRef(null);
  const [teamName, setTeamName] = useState('');
  const [idea, setIdea] = useState('');
  const [members, setMembers] = useState([
    { name: '', email: '', captured: false, image: null }
  ]);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const updated = [...members];
      updated[currentMemberIndex].image = imageSrc;
      updated[currentMemberIndex].captured = true;
      setMembers(updated);
      setMessage(`✓ Face captured for ${members[currentMemberIndex].name || `member ${currentMemberIndex+1}`}`);
    }
  };

  const addMember = () => {
    if (members.length < 5) {
      setMembers([...members, { name: '', email: '', captured: false, image: null }]);
      setCurrentMemberIndex(members.length);
    } else {
      setMessage('Maximum 5 members per team');
    }
  };

  const updateMemberField = (idx, field, value) => {
    const updated = [...members];
    updated[idx][field] = value;
    setMembers(updated);
  };

  const submitTeam = async () => {
    if (!teamName || !idea) {
      setMessage('Please enter team name and idea title');
      return;
    }
    if (members.some(m => !m.name || !m.email || !m.captured)) {
      setMessage('All members must have name, email, and captured face');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        team_name: teamName,
        idea_title: idea,
        members: members.map(m => ({
          name: m.name,
          email: m.email,
          image_base64: m.image
        }))
      };
      await axios.post(`${API_URL}/register/team`, payload);
      setMessage('✅ Team registered successfully!');
      setTimeout(() => {
        setTeamName('');
        setIdea('');
        setMembers([{ name: '', email: '', captured: false, image: null }]);
        setCurrentMemberIndex(0);
      }, 2000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="dark-card rounded-lg p-8 mb-8">
        <h3 className="gold-text text-sm uppercase tracking-widest font-semibold mb-6">Team Information</h3>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm uppercase tracking-wider mb-2">Team Name</label>
          <input 
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded focus:border-yellow-600 focus:outline-none transition" 
            value={teamName} 
            onChange={e => setTeamName(e.target.value)} 
            placeholder="Enter team name"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm uppercase tracking-wider mb-2">Idea Title</label>
          <input 
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded focus:border-yellow-600 focus:outline-none transition" 
            value={idea} 
            onChange={e => setIdea(e.target.value)} 
            placeholder="Enter your idea title"
          />
        </div>
      </div>

      <div className="dark-card rounded-lg p-8 mb-8">
        <h3 className="gold-text text-sm uppercase tracking-widest font-semibold mb-6">
          Member {currentMemberIndex+1} of {members.length}
        </h3>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 text-sm uppercase tracking-wider mb-2">Name</label>
            <input 
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded focus:border-yellow-600 focus:outline-none transition" 
              placeholder="Full name" 
              value={members[currentMemberIndex]?.name || ''}
              onChange={e => updateMemberField(currentMemberIndex, 'name', e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm uppercase tracking-wider mb-2">Email</label>
            <input 
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded focus:border-yellow-600 focus:outline-none transition" 
              placeholder="email@example.com" 
              value={members[currentMemberIndex]?.email || ''}
              onChange={e => updateMemberField(currentMemberIndex, 'email', e.target.value)} 
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm uppercase tracking-wider mb-2">Face Capture</label>
          <Webcam 
            ref={webcamRef} 
            screenshotFormat="image/jpeg" 
            className="w-full rounded-lg border border-gray-700 mb-4" 
          />
          <div className="flex gap-4">
            <button 
              onClick={capture} 
              className="button-gold px-6 py-2 rounded font-semibold uppercase tracking-wider flex-1"
            >
              📸 CAPTURE FACE
            </button>
            {members[currentMemberIndex]?.captured && (
              <div className="flex items-center px-4 py-2 bg-green-900 bg-opacity-20 border border-green-600 rounded text-green-400 font-semibold">
                ✓ Face Captured
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        {currentMemberIndex > 0 && (
          <button 
            onClick={() => setCurrentMemberIndex(currentMemberIndex-1)} 
            className="button-outline flex-1 px-4 py-2 rounded font-semibold uppercase tracking-wider"
          >
            ← PREVIOUS
          </button>
        )}
        {currentMemberIndex < members.length - 1 && (
          <button 
            onClick={() => setCurrentMemberIndex(currentMemberIndex+1)} 
            className="button-outline flex-1 px-4 py-2 rounded font-semibold uppercase tracking-wider"
          >
            NEXT →
          </button>
        )}
        {members.length < 5 && currentMemberIndex === members.length-1 && (
          <button 
            onClick={addMember} 
            className="button-outline flex-1 px-4 py-2 rounded font-semibold uppercase tracking-wider"
          >
            + ADD MEMBER
          </button>
        )}
      </div>

      <button 
        onClick={submitTeam} 
        disabled={loading} 
        className="button-gold w-full px-6 py-3 rounded font-semibold uppercase tracking-wider disabled:opacity-50 transition"
      >
        {loading ? '⏳ REGISTERING...' : '✓ REGISTER TEAM'}
      </button>
      
      {message && (
        <div className={`mt-6 p-4 rounded-lg border text-center ${
          message.includes('✅') || message.includes('✓') 
            ? 'bg-green-900 bg-opacity-20 border-green-600 text-green-400' 
            : 'bg-red-900 bg-opacity-20 border-red-600 text-red-400'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}