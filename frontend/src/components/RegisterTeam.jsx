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
      setMessage(`Face captured for ${members[currentMemberIndex].name || `member ${currentMemberIndex+1}`}`);
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
      setMessage('All 5 members must have name, email, and captured face');
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
      setMessage('Team registered successfully!');
      // reset form
      setTeamName('');
      setIdea('');
      setMembers([{ name: '', email: '', captured: false, image: null }]);
      setCurrentMemberIndex(0);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label className="block font-bold">Team Name</label>
        <input className="border p-2 w-full" value={teamName} onChange={e => setTeamName(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Idea Title</label>
        <input className="border p-2 w-full" value={idea} onChange={e => setIdea(e.target.value)} />
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Member {currentMemberIndex+1} / {members.length}</h3>
        <input className="border p-2 w-full mb-2" placeholder="Name" value={members[currentMemberIndex]?.name || ''}
               onChange={e => updateMemberField(currentMemberIndex, 'name', e.target.value)} />
        <input className="border p-2 w-full mb-2" placeholder="Email" value={members[currentMemberIndex]?.email || ''}
               onChange={e => updateMemberField(currentMemberIndex, 'email', e.target.value)} />
        
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full rounded mb-2" />
        <button onClick={capture} className="bg-gray-700 text-white px-4 py-2 rounded">Capture Face</button>
        {members[currentMemberIndex]?.captured && <span className="ml-2 text-green-600">✓ Face captured</span>}
      </div>

      <div className="flex gap-2 mb-4">
        {currentMemberIndex < members.length - 1 && (
          <button onClick={() => setCurrentMemberIndex(currentMemberIndex+1)} className="bg-blue-500 text-white px-4 py-2 rounded">Next Member</button>
        )}
        {currentMemberIndex > 0 && (
          <button onClick={() => setCurrentMemberIndex(currentMemberIndex-1)} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        )}
        {members.length < 5 && currentMemberIndex === members.length-1 && (
          <button onClick={addMember} className="bg-green-500 text-white px-4 py-2 rounded">Add Another Member</button>
        )}
      </div>

      <button onClick={submitTeam} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded w-full">
        {loading ? 'Registering...' : 'Register Team'}
      </button>
      {message && <div className="mt-4 p-2 bg-gray-100 rounded">{message}</div>}
    </div>
  );
}