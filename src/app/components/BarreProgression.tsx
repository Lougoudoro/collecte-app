import { CheckCircle, Clock, FlaskConical } from 'lucide-react';

export type ValidationStatus = 'en-cours' | 'valide-communaute' | 'valide-scientifique';

interface BarreProgressionProps {
  status: ValidationStatus;
}

export function BarreProgression({ status }: BarreProgressionProps) {
  const steps = [
    { key: 'en-cours', label: 'En cours', icon: Clock },
    { key: 'valide-communaute', label: 'Validé communauté', icon: CheckCircle },
    { key: 'valide-scientifique', label: 'Validé scientifiquement', icon: FlaskConical },
  ];

  const currentIndex = steps.findIndex((step) => step.key === status);

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border border-[#87a878]/20">
      <h3 className="mb-4 text-[#5a5245]">Statut de validation</h3>
      
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-[#ececf0] rounded-full -z-10">
          <div
            className="h-full bg-[#87a878] rounded-full transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center gap-2 relative bg-white px-2"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-[#87a878] text-white shadow-lg'
                    : 'bg-[#ececf0] text-[#717182]'
                } ${isCurrent ? 'scale-110' : ''}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={`text-xs md:text-sm text-center max-w-[80px] ${
                  isActive ? 'text-[#5a5245]' : 'text-[#717182]'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
