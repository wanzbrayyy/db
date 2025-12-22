import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Shield, Key } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Account Settings</h1>

      <Card className="border-white/10">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-400 p-[1px]">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                <img 
                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                   alt="avatar" 
                   className="w-full h-full"
                />
              </div>
            </div>
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>
                <span className="inline-flex items-center gap-1 text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded text-xs font-medium border border-sky-400/20">
                  <Shield size={10} /> {user?.role || 'Developer'}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Input label="Display Name" value={user?.name} readOnly icon={User} className="opacity-70 cursor-not-allowed" />
             <Input label="Email Address" value={user?.email} readOnly icon={User} className="opacity-70 cursor-not-allowed" />
          </div>
          
          <div>
            <label className="text-sm font-medium text-textMuted mb-2 block">Unique User ID (UUID)</label>
            <div className="bg-black/30 p-3 rounded-lg border border-white/10 flex items-center justify-between">
              <code className="text-xs text-sky-400 font-mono break-all">{user?._id}</code>
              <Key size={14} className="text-textMuted flex-shrink-0 ml-2" />
            </div>
            <p className="text-xs text-textMuted mt-1">This ID is used for internal system auditing.</p>
          </div>
        </CardContent>
        
        <div className="p-6 border-t border-white/5 flex justify-between items-center bg-surface/50">
          <p className="text-xs text-textMuted">Session ID: {Date.now()}</p>
          <Button variant="danger" onClick={logout} size="sm">
            Sign Out Session
          </Button>
        </div>
      </Card>
    </div>
  );
}