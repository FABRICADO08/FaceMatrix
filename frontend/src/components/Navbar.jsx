import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <nav className="bg-black border-b border-yellow-600 text-white px-6 py-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-2xl font-bold text-yellow-500">
            ✧ FACEMATRIX
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-widest">
            Identity Intelligence
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:text-yellow-500 hover:border-yellow-500 transition text-sm uppercase tracking-wider">
              ADMIN PORTAL
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-black hover:bg-yellow-500 transition font-semibold text-sm uppercase tracking-wider">
              PARTICIPANT
            </button>
          </div>
          
          <div className="text-right text-xs">
            <div className="text-yellow-500 font-semibold">SA</div>
            <div className="text-gray-400">Sianele - Admin</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
