import { useState, useMemo } from 'react';
import PlanCard from '../components/ui/plancard';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import PaymentConfirmation from '../components/pamentconformation';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

interface Plan {
  title: string;
  duration: string;
  features: string[];
  isHighlighted: boolean;
  planId: string;
  prices: { [region: string]: { amount: number; currency: string; display: string } };
}

const getUserRegion = () => {
  try {
    // Try to get region from timezone first
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(timeZone)
    if (timeZone.includes('Asia/Calcutta')) return 'IN';
    if (timeZone.includes('Europe/London')) return 'GB';
    if (timeZone.includes('America')) return 'US';

    // Fallback to language detection
    const lang = navigator.language || 'en-US';
    if (lang.includes('IN')) return 'IN';
    if (lang.includes('GB')) return 'GB';
    if (lang.includes('US')) return 'US';
    
    return 'US'; // default if nothing matches
  } catch {
    return 'US'; // fallback if any error occurs
  }
};

const PricingPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Define region-aware plans
  const plans: Plan[] = [
    {
      title: 'Monthly Plan',
      duration: 'month',
      features: ['Basic access to all features', '24/7 Customer Support', 'Single user license'],
      isHighlighted: false,
      planId: 'monthly',
      prices: {
        US: { amount: 9.99, currency: 'USD', display: '$9.99' },
        IN: { amount: 499, currency: 'INR', display: '₹499' },
        GB: { amount: 7.99, currency: 'GBP', display: '£7.99' },
      },
    },
    {
      title: 'Yearly Plan',
      duration: 'year',
      features: [
        'All Monthly Plan features',
        'Save 25% annually',
        'Priority support',
        'Advanced features',
      ],
      isHighlighted: true,
      planId: 'yearly',
      prices: {
        US: { amount: 89.99, currency: 'USD', display: '$89.99' },
        IN: { amount: 4499, currency: 'INR', display: '₹4,499' },
        GB: { amount: 69.99, currency: 'GBP', display: '£69.99' },
      },
    },
    {
      title: 'Family Plan',
      duration: 'year',
      features: [
        'Up to 5 family members',
        'All Yearly Plan features',
        'Family dashboard',
        'Parental controls',
      ],
      isHighlighted: false,
      planId: 'family',
      prices: {
        US: { amount: 149.99, currency: 'USD', display: '$149.99' },
        IN: { amount: 7499, currency: 'INR', display: '₹7,499' },
        GB: { amount: 119.99, currency: 'GBP', display: '£119.99' },
      },
    },
  ];

  // Detect user region
  const userRegion = useMemo(getUserRegion, []);
  // Fallback to US if region not found
  const getPlanPrice = (plan: Plan) => plan.prices[userRegion] || plan.prices['US'];

  const handleSelectPlan = (index: number) => {
    setSelectedPlan(index);
    setShowConfirmation(true);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleConfirmPayment = async () => {
    if (selectedPlan === null) return;
    setIsProcessing(true);
    try {
      // Store the selected plan ID and region for the backend
      localStorage.setItem('selectedPlanId', plans[selectedPlan].planId);
      localStorage.setItem('selectedRegion', userRegion);

      // Call your backend to create the session
      const response = await axiosPrivate.post('/api/v1/billing/create-checkout-session', {
        planId: plans[selectedPlan].planId,
        region: userRegion,
      });
      const data = response.data;

      if (data.success && data.data.checkoutUrl) {
        window.location.href = data.data.checkoutUrl; // Redirect to Stripe Checkout
      } else {
        throw new Error(data.error?.message || 'Failed to create checkout session');
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 mb-6"
        >
          <IconArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>
        
        {/* Stylish Header */}
        <div className="text-center py-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg mb-12"> 
          <h1 className="text-4xl font-extrabold">Choose Your Perfect Plan</h1>
          <p className="mt-2 text-lg">Select the plan that best suits your needs</p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:space-x-8 justify-center mt-8 mb-12">
          {plans.map((plan, index) => {
            const priceObj = getPlanPrice(plan);
            return (
              <PlanCard
                key={index}
                title={plan.title}
                price={priceObj.display}
                duration={plan.duration}
                features={plan.features}
                isHighlighted={plan.isHighlighted}
                isSelected={selectedPlan === index}
                onSelect={() => handleSelectPlan(index)}
              />
            );
          })}
        </div>
        
        {/* Payment Confirmation Modal */}
        {showConfirmation && selectedPlan !== null && (
          <PaymentConfirmation
            planTitle={plans[selectedPlan].title}
            planPrice={getPlanPrice(plans[selectedPlan]).display}
            planDuration={plans[selectedPlan].duration}
            planFeatures={plans[selectedPlan].features}
            onConfirm={handleConfirmPayment}
            onCancel={handleCancelConfirmation}
            isProcessing={isProcessing}
          />
        )}
      </div>
    </div>
  );
};

export default PricingPage;