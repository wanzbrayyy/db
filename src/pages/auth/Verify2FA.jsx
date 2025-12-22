import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { AuthService } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ModernAlert from '../../components/ui/ModernAlert';

export default function Verify2FA() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useAuth(); // Kita akan tambah fungsi ini di AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Ambil tempToken dari local storage
      const tempToken = localStorage.getItem('temp_2fa_token');
      if (!tempToken) throw new Error("Session expired. Please login again.");

      // Panggil API Validasi Login
      const data = await AuthService.validateLogin2FA(tempToken, otp);
      
      // Jika sukses, simpan sesi asli
      setSuccess(true);
      setSession(data.user); // Update context
      
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4">
      <ModernAlert type="success" isOpen={success} message="Verification Successful!" />
      
      <Card className="w-full max-w-md border-white/10 bg-surface/50 p-8 shadow-2xl">
        <div className="text-center mb-8">
           <div className="mx-auto w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mb-4 border border-sky-500/20">
              <ShieldCheck className="w-8 h-8 text-sky-400" />
           </div>
           <h2 className="text-2xl font-bold text-white">Two-Factor Authentication</h2>
           <p className="text-textMuted text-sm mt-2">
             Enter the 6-digit code from your authenticator app.
           </p>
        </div>

        {error && (
           <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs text-center">
              {error}
           </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="flex justify-center">
              <input 
                type="text" 
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g,''))}
                className="w-full text-center text-3xl tracking-[0.5em] font-mono py-4 bg-black/20 border border-white/10 rounded-lg focus:border-sky-500 outline-none text-white placeholder-white/10"
                placeholder="000000"
                autoFocus
              />
           </div>

           <Button type="submit" isLoading={loading} className="w-full py-3">
              Verify Identity <ArrowRight size={16} className="ml-2"/>
           </Button>
        </form>

        <p className="text-center mt-6 text-xs text-textMuted">
           Lost your device? <a href="t.me/maverick_dark" className="text-sky-400 hover:underline">Contact Support</a>
        </p>
      </Card>
    </div>
  );
}