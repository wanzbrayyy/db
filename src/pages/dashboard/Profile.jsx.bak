import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../api/auth'; // Import Service
import Card, { CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input'; // Pastikan ada Input UI
import { Shield, Smartphone, Globe, Upload, CheckCircle, XCircle, QrCode } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || '');
  
  // State untuk 2FA
  const [is2FAEnabled, setIs2FAEnabled] = useState(user?.isTwoFactorEnabled || false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Handle Avatar Upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if(file) {
       const reader = new FileReader();
       reader.onloadend = async () => {
          setAvatar(reader.result);
          // Update ke backend
          await AuthService.updateProfile({ avatar: reader.result });
       };
       reader.readAsDataURL(file);
    }
  };

  // 1. Generate QR Code
  const handleEnable2FA = async () => {
    setLoading(true);
    setMsg('');
    try {
        const data = await AuthService.generate2FA();
        setQrCodeUrl(data.qrCode); // Tampilkan QR Image
    } catch (err) {
        setMsg('Error: ' + err.message);
    } finally {
        setLoading(false);
    }
  };

  // 2. Verify OTP
  const handleVerify2FA = async () => {
    if (!otpCode) return;
    setLoading(true);
    try {
        await AuthService.verify2FA(otpCode);
        setIs2FAEnabled(true);
        setQrCodeUrl(null); // Tutup QR scanner
        setMsg('Success: 2FA is now enabled!');
        // Update user state di localstorage manual atau re-fetch (opsional)
    } catch (err) {
        setMsg('Error: Invalid Code. Try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-white">Account & Security</h1>

      <div className="grid md:grid-cols-3 gap-6">
         {/* Profile Card */}
         <Card className="md:col-span-2 bg-surface/30 border-white/5">
            <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
            <CardContent className="flex items-start gap-6">
               <div className="relative group">
                  <img 
                    src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                    className="w-24 h-24 rounded-full border-2 border-white/10 object-cover" 
                    alt="User Avatar"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition">
                     <Upload size={20} className="text-white" />
                     <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </label>
               </div>
               <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                  <p className="text-gray-400">{user?.email}</p>
                  <span className="inline-block px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs border border-sky-500/20 mt-2 font-mono">
                    ID: {user?._id?.substring(0, 8)}...
                  </span>
               </div>
            </CardContent>
         </Card>

         {/* 2FA Card (Logic Implementation) */}
         <Card className="bg-surface/30 border-white/5">
            <CardHeader><CardTitle>Two-Factor Auth</CardTitle></CardHeader>
            <CardContent>
               <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded ${is2FAEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                     {is2FAEnabled ? <CheckCircle size={20}/> : <Smartphone size={20}/>}
                  </div>
                  <div>
                     <p className="text-white font-bold text-sm">{is2FAEnabled ? 'Enabled' : 'Disabled'}</p>
                     <p className="text-xs text-gray-500">{is2FAEnabled ? 'Account secured' : 'Not secure'}</p>
                  </div>
               </div>

               {/* Feedback Message */}
               {msg && (
                   <div className={`text-xs p-2 mb-3 rounded border ${msg.includes('Success') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                       {msg}
                   </div>
               )}

               {/* Logic Tampilan */}
               {!is2FAEnabled && !qrCodeUrl && (
                   <Button onClick={handleEnable2FA} className="w-full" variant="secondary" isLoading={loading}>
                      Setup Google Auth
                   </Button>
               )}

               {/* QR Code Scanner Area */}
               {qrCodeUrl && (
                   <div className="space-y-3 animate-in fade-in zoom-in-95">
                       <div className="bg-white p-2 rounded-lg mx-auto w-fit">
                           <img src={qrCodeUrl} alt="2FA QR Code" className="w-32 h-32" />
                       </div>
                       <p className="text-[10px] text-center text-gray-400">Scan with Google Authenticator</p>
                       
                       <div className="flex gap-2">
                           <input 
                             placeholder="123456" 
                             className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-center tracking-widest text-white outline-none focus:border-sky-500 font-mono"
                             maxLength={6}
                             value={otpCode}
                             onChange={(e) => setOtpCode(e.target.value)}
                           />
                       </div>
                       <Button onClick={handleVerify2FA} className="w-full" variant="primary" isLoading={loading}>
                           Verify & Enable
                       </Button>
                       <button onClick={() => setQrCodeUrl(null)} className="text-xs text-gray-500 hover:text-white w-full text-center mt-2">
                           Cancel
                       </button>
                   </div>
               )}

               {is2FAEnabled && (
                   <Button className="w-full opacity-50 cursor-not-allowed" variant="secondary" disabled>
                      2FA is Active
                   </Button>
               )}
            </CardContent>
         </Card>
      </div>

      {/* Login History */}
      <Card className="bg-surface/30 border-white/5">
         <CardHeader><CardTitle>Login History</CardTitle></CardHeader>
         <CardContent>
            <table className="w-full text-sm text-left">
               <thead className="text-xs text-gray-500 uppercase border-b border-white/5">
                  <tr><th className="py-2">Device</th><th>IP Address</th><th>Time</th></tr>
               </thead>
               <tbody className="text-gray-300">
                  {/* Mapping history dari user data jika ada */}
                  {user?.loginHistory?.slice().reverse().slice(0, 3).map((log, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-3 flex items-center gap-2"><Globe size={14}/> {log.device ? 'Browser' : 'Unknown'}</td>
                        <td className="font-mono text-xs">{log.ip || '127.0.0.1'}</td>
                        <td className="text-gray-500 text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                  )) || (
                      <tr className="border-b border-white/5">
                         <td className="py-3 flex items-center gap-2"><Globe size={14}/> Chrome on Windows</td>
                         <td>Current Session</td>
                         <td className="text-green-400">Active Now</td>
                      </tr>
                  )}
               </tbody>
            </table>
         </CardContent>
      </Card>
    </div>
  );
}