import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hexagon, Mail, Lock } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';
import ModernAlert from '../../components/ui/ModernAlert'; // Import Alert

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading'); // Trigger Lottie Loading
    setErrorMsg('');
    
    try {
      await login(formData);
      
      // Sukses Login -> Tampilkan Lottie Sukses
      setStatus('success');
      
      // Delay sedikit agar user melihat animasi sukses sebelum redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500); // 2.5 detik durasi animasi sukses
      
    } catch (err) {
      setStatus('idle'); // Matikan lottie
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      {/* --- ALERT SYSTEMS --- */}
      <ModernAlert 
        type="loading" 
        isOpen={status === 'loading'} 
        message="Authenticating credentials with WanzDB Cluster..."
      />
      <ModernAlert 
        type="success" 
        isOpen={status === 'success'} 
        message="Authentication Verified! Redirecting to Dashboard..."
      />

      <div className="min-h-screen flex items-center justify-center bg-background bg-[url('/grid.svg')] px-4 py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] -z-10" />

        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl shadow-2xl shadow-sky-900/20 backdrop-blur-xl">
                <Hexagon className="w-8 h-8 text-sky-400 fill-sky-500/20" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white font-mono tracking-tight">wanzdb Console</h2>
            <p className="text-textMuted text-sm mt-3 flex items-center justify-center gap-2">
              Session ID: <code className="bg-white/5 px-2 py-0.5 rounded text-sky-400 font-mono text-xs border border-white/10">{sessionId || 'secure-session'}</code>
            </p>
          </div>

          <Card className="border-white/5 bg-surface/60">
            <CardHeader className="text-center pb-2">
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access the cluster.</CardDescription>
            </CardHeader>
            
            <CardContent>
              {errorMsg && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center flex items-center justify-center gap-2 animate-pulse">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input 
                  label="Email Address" 
                  type="email" 
                  icon={Mail}
                  placeholder="admin@wanzdb.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <Input 
                  label="Password" 
                  type="password" 
                  icon={Lock}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                
                <Button type="submit" isLoading={status === 'loading'} className="w-full py-2.5 mt-2">
                  Authenticate & Access DB
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/5 text-center text-sm text-textMuted">
                Don't have a cluster yet?{' '}
                <Link to="/register" className="text-sky-400 hover:text-sky-300 font-medium hover:underline decoration-sky-500/30 underline-offset-4 transition">
                  Deploy Instance
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}