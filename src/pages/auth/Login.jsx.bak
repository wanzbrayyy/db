import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Hexagon } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { sessionId } = useParams(); // Tangkap ID dari URL (hanya untuk visual)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[url('/grid.svg')] px-4 py-12">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600/20 p-3 rounded-xl">
              <Hexagon className="w-10 h-10 text-indigo-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono">wanzdb Console</h2>
          <p className="text-slate-400 text-sm mt-2">
            Session ID: <span className="font-mono text-indigo-400">{sessionId || 'init-secure'}</span>
          </p>
        </div>

        <Card className="p-8 border-slate-800 bg-slate-900/90 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="admin@wanzdb.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            
            <Button type="submit" isLoading={isLoading} className="w-full py-3">
              Authenticate & Access DB
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Belum punya database?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Buat Instance Baru
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}