import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hexagon, Mail, Lock } from 'lucide-react'; // Import Icon tambahan
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
// Gunakan komponen Card yang baru (destructuring)
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { sessionId } = useParams();

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
    <div className="min-h-screen flex items-center justify-center bg-background bg-[url('/grid.svg')] px-4 py-12 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl shadow-2xl shadow-sky-900/20 backdrop-blur-xl">
              <Hexagon className="w-8 h-8 text-sky-400 fill-sky-500/20" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono tracking-tight">wanzdb Console</h2>
          <p className="text-textMuted text-sm mt-3 flex items-center justify-center gap-2">
            Session ID: <code className="bg-white/5 px-2 py-0.5 rounded text-sky-400 font-mono text-xs border border-white/10">{sessionId || 'init-secure'}</code>
          </p>
        </div>

        {/* MENGGUNAKAN NEW CARD UI */}
        <Card className="border-white/5 bg-surface/60">
          <CardHeader className="text-center pb-2">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access the cluster.</CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input 
                label="Email Address" 
                type="email" 
                icon={Mail} // Icon Surat di kiri
                placeholder="admin@wanzdb.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <Input 
                label="Password" 
                type="password" 
                icon={Lock} // Icon Gembok di kiri
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              
              <Button type="submit" isLoading={isLoading} className="w-full py-2.5 mt-2">
                Authenticate & Access DB
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center text-sm text-textMuted">
              Belum punya database?{' '}
              <Link to="/register" className="text-sky-400 hover:text-sky-300 font-medium hover:underline decoration-sky-500/30 underline-offset-4 transition">
                Buat Instance Baru
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}