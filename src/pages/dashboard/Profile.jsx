import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Shield, Smartphone, Globe, Upload } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Handle Avatar Upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if(file) {
       const reader = new FileReader();
       reader.onloadend = () => {
          setAvatar(reader.result);
          // TODO: Call API to update profile
          // fetch('/api/auth/profile', { method: 'PUT', body: JSON.stringify({ avatar: reader.result }) })
       };
       reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Account & Security</h1>

      <div className="grid md:grid-cols-3 gap-6">
         {/* Profile Card */}
         <Card className="md:col-span-2 bg-surface/30 border-white/5">
            <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
            <CardContent className="flex items-start gap-6">
               <div className="relative group">
                  <img src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} className="w-24 h-24 rounded-full border-2 border-white/10 object-cover" />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition">
                     <Upload size={20} className="text-white" />
                     <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </label>
               </div>
               <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                  <p className="text-gray-400">{user?.email}</p>
                  <span className="inline-block px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs border border-sky-500/20 mt-2">Team Plan</span>
               </div>
            </CardContent>
         </Card>

         {/* 2FA Card */}
         <Card className="bg-surface/30 border-white/5">
            <CardHeader><CardTitle>Two-Factor Auth</CardTitle></CardHeader>
            <CardContent>
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/10 rounded text-red-400"><Smartphone size={20}/></div>
                  <div>
                     <p className="text-white font-bold text-sm">Disabled</p>
                     <p className="text-xs text-gray-500">Not secure</p>
                  </div>
               </div>
               <Button className="w-full" variant="secondary">Enable 2FA</Button>
            </CardContent>
         </Card>
      </div>

      {/* Login History */}
      <Card className="bg-surface/30 border-white/5">
         <CardHeader><CardTitle>Login History</CardTitle></CardHeader>
         <CardContent>
            <table className="w-full text-sm text-left">
               <thead className="text-xs text-gray-500 uppercase border-b border-white/5">
                  <tr><th className="py-2">Device</th><th>Location</th><th>Time</th></tr>
               </thead>
               <tbody className="text-gray-300">
                  <tr className="border-b border-white/5">
                     <td className="py-3 flex items-center gap-2"><Globe size={14}/> Chrome on Windows</td>
                     <td>103.20.x.x (ID)</td>
                     <td className="text-green-400">Active Now</td>
                  </tr>
                  <tr>
                     <td className="py-3 flex items-center gap-2"><Smartphone size={14}/> Safari on iPhone</td>
                     <td>112.50.x.x (ID)</td>
                     <td className="text-gray-500">2 days ago</td>
                  </tr>
               </tbody>
            </table>
         </CardContent>
      </Card>
    </div>
  );
}