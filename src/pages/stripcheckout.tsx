import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProvider, useCheckout } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
// Import icons
import { IconCheck,IconArrowLeft } from '@tabler/icons-react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
// Your publishable key should be stored in an environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

// Main checkout component
const StripeCheckoutPage = () => {
  // Function to fetch client secret from your server
  const axiosPrivate=useAxiosPrivate()
  const fetchClientSecret = async () => {
    try {
      const response = await axiosPrivate.post('/api/v1/billing/create-checkout-session',{planId: localStorage.getItem('selectedPlanId')});
      console.log(response)
      const data = await response.data;
      
      if (data.success && data.data.clientSecret) {
        return data.data.clientSecret;
      } else {
        throw new Error(data.error?.message || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  };

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ fetchClientSecret }}
    >
      <CheckoutContent />
    </CheckoutProvider>
  );
};

// Component that uses the checkout context
const CheckoutContent = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    lineItems,
    total,
    canConfirm,
    confirm,
    email,
    updateEmail,
    status,
  } = useCheckout();

  // Form state
  const [emailInput, setEmailInput] = useState('');

  // Update email in checkout session when form is submitted
  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateEmail(emailInput);
      if (result.type === 'error') {
        setError(result.error.message);
      }
    } catch (err) {
        console.log(err)
      setError('Failed to update email');
    }
  };

  // Handle payment submission
  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await confirm({
        returnUrl: `${window.location.origin}/billing/success`,
      });
      
      if (result.type === 'error') {
        setError(result.error.message);
        setIsProcessing(false);
      }
      // On success, Stripe will handle the redirect
    } catch (err) {
      setError('Payment processing failed');
      setIsProcessing(false);
      console.error('Payment error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto pt-8 px-4">
        <button
          onClick={() => navigate('/pricing')}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 mb-6"
        >
          <IconArrowLeft size={20} className="mr-2" />
          Back to pricing
        </button>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Complete your purchase</h1>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Order Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Order Summary</h2>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                {lineItems && lineItems.length > 0 ? (
                  <div>
                    {lineItems.map((item) => (
                      <div key={item.id} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-800 dark:text-white">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: total.total.amount,
                            }).format(Number(item.total?.amount || 0) / 100)}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between pt-4 font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: total.total.amount,
                        }).format(Number(total.total?.amount||0) / 100)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">Loading order details...</p>
                )}
              </div>
            </div>
            
            {/* Customer Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Customer Information</h2>
              
              <form onSubmit={handleEmailUpdate} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      id="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder={email || "Enter your email"}
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Payment Button */}
            <div className="mt-8">
              {error && (
                <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-4 text-red-700 dark:text-red-200">
                  <p>{error}</p>
                </div>
              )}
              
              <button
                onClick={handlePayment}
                disabled={!canConfirm || isProcessing || status.type === 'complete'}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-2 ring-blue-300 focus:outline-none disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    Processing...
                  </span>
                ) : status.type === 'complete' ? (
                  <span className="flex items-center justify-center">
                    <IconCheck size={20} className="mr-2" />
                    Payment Complete
                  </span>
                ) : (
                  `Pay ${total && total.total.amount ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: total.total.amount,
                  }).format(Number(total.total.amount) / 100) : ''}`
                )}
              </button>
              
              {status.type === 'complete' && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckoutPage;