import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">AI Facial Recognition Event Check-in</h1>
      <p className="text-lg mb-8">Register your team of 5, then get instant access at the gate.</p>
      <div className="flex justify-center gap-4">
        <Link to="/register" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Register Team
        </Link>
        <Link to="/gate" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
          Go to Gate
        </Link>
      </div>
    </div>
  );
}