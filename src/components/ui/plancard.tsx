import React from 'react';

interface PlanCardProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  isHighlighted: boolean;
  onSelect: () => void;
  isSelected: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  duration,
  features,
  isHighlighted,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80 cursor-pointer transition-all transform ${
        isSelected ? 'border-2 border-blue-500 scale-105' : ''
      } hover:shadow-lg hover:scale-105 ${
        isHighlighted && !isSelected ? 'border-2 border-blue-500' : ''
      }`}
      onClick={onSelect}
    >
      <h2 className="text-lg font-bold text-center">{title}</h2>
      <p className="text-center text-2xl font-semibold my-4">
        {price}
        <span className="text-sm">/{duration}</span>
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index}>✔ {feature}</li>
        ))}
      </ul>
      <button
        className={`mt-6 w-full py-2 rounded ${
          isSelected
            ? 'bg-blue-600 text-white'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isSelected ? 'Selected' : 'Get Started'}
      </button>
    </div>
  );
};

export default PlanCard;