import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import {RootLayout} from './components/layouts/RootLayout'
import DashboardLoading from './components/splash/dashboardloading'
//import SettingsLoading from './components/splash/settingloading'
//import BillingLoading from './components/splash/billingloading'
//import ProjectLoading from './components/splash/projectloading'
//import APIDocumentationLoading from './components/splash/apiloading'
import {useSelector } from 'react-redux'
import AuthPage from './pages/authpage'
import Dashboard from './pages/dashboard'
import ProjectPage from './pages/projectpage'
import GeneratePage from './pages/generatepage'
import SettingsPage from './pages/settingpage'
import ApiDocumentation from './pages/apipage'
import BillingPage from './pages/billingpage'
import PricingPage from './pages/pricingpage'
import ProjectDetailsPage from './pages/projectdetailspage'
import NotFoundPage from './pages/notfound'
import useAuth from './hooks/useAuth'
import StripeCheckoutPage from './pages/stripcheckout'
import PaymentSuccessPage from './pages/pamentsucess'
import PaymentCancelPage from './pages/pamentcancel'
import TemplatePage from './pages/templatepage'
import TemplateDetailsPage from './pages/templatedetailspage'

export default function App() {
  const {status}=useAuth()
  const isAuthenticated = useSelector((state: { authState: { isAuthenticated: boolean } }) => state.authState.isAuthenticated)
  //console.log(isAuthenticated)
  // ProtectedRoute Component
  if (status === 'loading') {
    return <DashboardLoading/>;
  }
  const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean, children: React.ReactNode }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  const router= createBrowserRouter([
    {
      path: '/',
      element:<ProtectedRoute isAuthenticated={isAuthenticated}><RootLayout/></ProtectedRoute>,
      children:[
        {
          index: true,
          element: <Dashboard/>
        },
        {
          path: 'projects',
          element: <ProjectPage/>
        },
        {
          path: 'templates',
          element: <TemplatePage/>
        },
        {
          path: 'profile',
          element: <p>profile</p>
        },
        {
          path: 'settings',
          element: <SettingsPage/>
        },
        {
          path: 'api',
          element: <ApiDocumentation/>
        },
        {
          path: 'billing',
          element: <BillingPage/>
        },
        {
          path: 'generate/:id',
          element:<GeneratePage/>
        },
        {
          path:'project/:id',
          element:<ProjectDetailsPage/>
        },
        {
          path: '/billing/checkout',
          element: <StripeCheckoutPage/>,
        },
        {
          path: '/billing/success',
          element: <PaymentSuccessPage />,
        },
        {
          path: '/billing/cancel',
          element: <PaymentCancelPage />,
        },
        {
          path:'/templatedetails/:id',
          element:<TemplateDetailsPage/>
        }
      ]
    },
    {
      path:'pricing',
      element:<PricingPage/>
    },
    {
      path: 'login',
      element: <AuthPage/>
    },
    {
      path: '*', // Catch-all route
      element: <NotFoundPage /> // Display the 404 component
    }
  ])
  return (
    <><RouterProvider router={router}/></>
  )
}
