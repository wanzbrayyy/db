import Card from '../ui/Card';

export default function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <Card className="p-6 hover:border-indigo-500/30 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
          {trend && (
            <p className="text-xs font-medium text-emerald-400 mt-2">
              +{trend}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg text-indigo-400">
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
}