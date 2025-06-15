import { Link } from 'react-router-dom';
import { useUser, SignOutButton } from '@clerk/clerk-react';

function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="p-4 font-mono bg-gray-100 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {isSignedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/donation">Donation</Link>
            <Link to="/emergency">Emergency</Link>
          </>
        )}
      </div>
      <div>
        {isSignedIn ? (
          <SignOutButton>
            <button>Sign out</button>
          </SignOutButton>
        ) : (
          <Link to="/sign-in">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar