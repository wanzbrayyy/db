import { Zap, Check, ArrowRight } from 'lucide-react';
import Card, { CardContent, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Upgrade() {
  const plans = [
    {
      name: 'Free Tier',
      price: '$0',
      period: 'per month',
      features: ['10K Docs Max', '50K Reads/Month', 'Basic Support', 'Community Forum Access'],
      buttonText: 'Current Plan',
      isCurrent: true,
      color: 'text-sky-400',
      bg: 'bg-white/5'
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      features: ['Unlimited Docs', '1M Reads/Month', 'Priority Email Support', 'Custom Domain'],
      buttonText: 'Go Pro',
      isCurrent: false,
      color: 'text-yellow-400',
      bg: 'bg-sky-500/10 border-sky-500/30 shadow-xl shadow-sky-900/30'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'per month',
      features: ['Dedicated Cluster', 'SLA 99.99%', '24/7 Phone Support', 'Private Region'],
      buttonText: 'Contact Sales',
      isCurrent: false,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30'
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Zap className="text-yellow-400" /> Choose Your Plan
        </h1>
        <p className="text-xl text-gray-400">Scale your project with WanzDB Pro and Enterprise features.</p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col p-6 transition-all duration-300 ${plan.bg} hover:scale-[1.01]`}>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className={`text-2xl font-bold ${plan.color}`}>{plan.name}</h2>
                    <p className="mt-4">
                        <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                        <span className="text-base font-medium text-gray-400">/{plan.period.split(' ')[1]}</span>
                    </p>
                </div>
                {plan.isCurrent && (
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        ACTIVE
                    </span>
                )}
            </div>
            
            <div className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                        <Check size={18} className="text-emerald-400" />
                        <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8">
              <Button 
                variant={plan.isCurrent ? "secondary" : "primary"} 
                className="w-full justify-between"
                disabled={plan.isCurrent}
              >
                {plan.buttonText} <ArrowRight size={18} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}