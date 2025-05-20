import React from 'react';
import { IconX,IconCheck,IconAlertCircle } from '@tabler/icons-react';

interface PaymentConfirmationProps {
  planTitle: string;
  planPrice: string;
  planDuration: string;
  planFeatures: string[];
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  planTitle,
  planPrice,
  planDuration,
  planFeatures,
  onConfirm,
  onCancel,
  isProcessing = false
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Confirm Your Selection</h3>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            disabled={isProcessing}
          >
            <IconX size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <IconAlertCircle size={24} className="text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          
          <h4 className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {planTitle}
          </h4>
          
          <div className="text-center mb-4">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{planPrice}</span>
            <span className="text-gray-500 dark:text-gray-400"> per {planDuration}</span>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">This plan includes:</p>
            <ul className="space-y-2">
              {planFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <IconCheck size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
            You'll be redirected to our secure payment page to complete your purchase.
          </p>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3 rounded-b-lg">
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-white font-medium rounded-lg transition-colors focus:outline-none disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Processing...
              </span>
            ) : (
              'Proceed to Checkout'
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium rounded-lg transition-colors focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;