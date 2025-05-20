import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconArrowLeft } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const axiosPrivate=useAxiosPrivate()

  useEffect(() => {
    // Get session ID from URL if present
    const sessionId = searchParams.get('session_id');
    console.log(sessionId)
    // Fetch user credits
    const fetchCredits = async () => {
      try {
        const response = await axiosPrivate.get('/api/v1/billing/credits');
        const data = await response.data;
        
        if (data.success) {
          setCredits(data.data.credits);
        } else {
          setError('Could not retrieve your credits. Please contact support.');
        }
      } catch {
        setError('An error occurred while fetching your data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();
  }, [axiosPrivate, searchParams]);

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate('/')}
          className="absolute p-4 text-black dark:text-white hover:text-blue-300"
        >
          <IconArrowLeft size={20} />
        </button>
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <IconCheck size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Successful!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Thank you for your purchase.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg text-center mb-6">
            {error}
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6 text-center">
            <p className="text-gray-800 dark:text-gray-200">
              Your account has been credited with
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 my-2">
              {credits} Credits
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              You can now generate more images with your subscription.
            </p>
          </div>
        )}

        <button
          onClick={handleGoToDashboard}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-2 ring-blue-300 focus:outline-none"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;