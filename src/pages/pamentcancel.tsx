import { useNavigate } from 'react-router-dom';
import { IconUxCircle, IconArrowLeft } from '@tabler/icons-react';

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/pricing');
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute p-4 text-black dark:text-white hover:text-blue-300"
        >
          <IconArrowLeft size={20} />
        </button>
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <IconUxCircle size={32} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Cancelled</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Your payment process was cancelled.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6 text-center">
          <p className="text-gray-800 dark:text-gray-200">
            No worries! You can try again whenever you're ready.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            If you encountered any issues during checkout, please contact our support team.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleTryAgain}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-2 ring-blue-300 focus:outline-none"
          >
            Try Again
          </button>
          
          <button
            onClick={handleGoToDashboard}
            className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors focus:ring-2 ring-gray-300 focus:outline-none"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;