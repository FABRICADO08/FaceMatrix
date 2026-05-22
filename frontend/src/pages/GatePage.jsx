import { useState } from 'react';
import GateScan from '../components/GateScan';

export default function GatePage() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="ml-56 px-12">
        <div className="mb-8">
          <h2 className="text-4xl font-light text-white tracking-wide mb-2">Gate Access</h2>
          <p className="text-gray-400">Face Scan Authentication</p>
        </div>
        <GateScan isAdmin={isAdmin} />
      </div>
    </div>
  );
}