import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [userType, setUserType] = useState('participant');

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 bg-black border-r border-gray-700 px-4 py-8 fixed h-screen">
          <div className="mb-8">
            <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-4">PARTICIPANT</h3>
            <div className="space-y-2">
              <Link to="/" className="sidebar-item active flex items-center gap-3 px-4 py-3 rounded text-yellow-500 bg-yellow-500 bg-opacity-10">
                <span>◆</span> HOME
              </Link>
              <Link to="/register" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded text-gray-400 hover:text-yellow-500 hover:bg-opacity-10">
                <span>●</span> REGISTER
              </Link>
              <div className="sidebar-item flex items-center gap-3 px-4 py-3 rounded text-gray-400 hover:text-yellow-500 cursor-not-allowed opacity-50">
                <span>○</span> GATE SCAN
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-4">MY INFO</h3>
            <div className="sidebar-item flex items-center gap-3 px-4 py-3 rounded text-gray-400 hover:text-yellow-500">
              <span>◎</span> MY STATUS
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-56 px-12">
          {/* Welcome Section */}
          <div className="welcome-section rounded-lg p-16 mb-12 mt-8">
            <div className="mb-6">
              <h4 className="text-yellow-500 text-sm uppercase tracking-widest font-semibold">Welcome to</h4>
            </div>
            <h1 className="text-6xl font-light text-white mb-6 tracking-wide">
              FaceMatrix
            </h1>
            <p className="text-gray-400 max-w-2xl mb-12 text-base leading-relaxed">
              Seamless identity verification for Ideathon 2025. Register your face once — check in at the gate instantly. No badges. No queues. No friction.
            </p>
            <div className="flex gap-6">
              <Link to="/register" className="button-gold px-8 py-3 rounded text-sm uppercase tracking-wider font-bold">
                REGISTER MY FACE
              </Link>
              <button className="button-outline px-8 py-3 rounded text-sm uppercase tracking-wider font-bold">
                PROCEED TO GATE
              </button>
            </div>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="dark-card rounded-lg p-8">
              <h3 className="gold-text text-sm uppercase tracking-widest font-semibold mb-8">HOW IT WORKS</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="step-number flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Register</h4>
                    <p className="text-gray-400 text-sm">Enter your team details and capture your face using the webcam.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="step-number flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Arrive at the Gate</h4>
                    <p className="text-gray-400 text-sm">Face the camera at Gate A. Our AI identifies you in under a second.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="step-number flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Access Granted</h4>
                    <p className="text-gray-400 text-sm">You're checked in automatically. Enjoy the event!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="dark-card rounded-lg p-8">
              <h3 className="gold-text text-sm uppercase tracking-widest font-semibold mb-8">EVENT DETAILS</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">EVENT</p>
                  <p className="text-white text-lg font-semibold">Ideathon 2025</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">DATE</p>
                  <p className="text-white text-lg font-semibold">22 May 2026</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">VENUE</p>
                  <p className="text-white text-lg font-semibold">Innovation Hub, Cape Town</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">GATE OPEN</p>
                  <p className="text-yellow-500 text-lg font-semibold">08:00 — 10:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
