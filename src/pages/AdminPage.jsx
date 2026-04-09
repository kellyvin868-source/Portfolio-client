import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/admin/LoginForm';
import Dashboard from '../components/admin/Dashboard';

export default function AdminPage() {
  const { admin, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#2a2a45] border-t-violet-600 rounded-full animate-spin" />
    </div>
  );
  return admin ? <Dashboard /> : <LoginForm />;
}
