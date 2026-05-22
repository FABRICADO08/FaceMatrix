import RegisterTeam from '../components/RegisterTeam';

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="ml-56 px-12">
        <div className="mb-8">
          <h2 className="text-4xl font-light text-white tracking-wide mb-2">Team Registration</h2>
          <p className="text-gray-400">Register your team and capture faces</p>
        </div>
        <RegisterTeam />
      </div>
    </div>
  );
}