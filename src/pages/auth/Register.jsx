import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hexagon, Mail, Lock, User } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';
import ModernAlert from '../../components/ui/ModernAlert';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    
    try {
      await register(formData);
      setStatus('success');
      
      setTimeout(() => {
        navigate('/login');
      }, 2500);
      
    } catch (err) {
      setStatus('idle');
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <ModernAlert 
        type="loading" 
        isOpen={status === 'loading'} 
        message="Provisioning your new WanzDB Cluster..."
      />
      <ModernAlert 
        type="success" 
        isOpen={status === 'success'} 
        message="Cluster Created Successfully! Redirecting to login..."
      />

      <div className="min-h-screen flex items-center justify-center bg-background bg-[url('/grid.svg')] px-4 py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] -z-10" />

        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white font-mono tracking-tight flex items-center justify-center gap-2">
               <Hexagon className="text-sky-400 fill-sky-500/20" /> New Deployment
            </h2>
            <p className="text-textMuted text-sm mt-2">
              Create your serverless database instance in seconds.
            </p>
          </div>

          <Card className="border-white/5 bg-surface/60">
            <CardHeader className="text-center pb-2">
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Start building with WanzDB Free Tier.</CardDescription>
            </CardHeader>
            
            <CardContent>
              {errorMsg && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center flex items-center justify-center gap-2">
                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                   {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input 
                  label="Full Name" 
                  placeholder="John Doe"
                  icon={User}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  icon={Mail}
                  placeholder="dev@wanzdb.com"
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
                  Provision Database
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/5 text-center text-sm text-textMuted">
                Already have an instance?{' '}
                <Link to="/login" className="text-sky-400 hover:text-sky-300 font-medium hover:underline decoration-sky-500/30 underline-offset-4 transition">
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}