import { useDispatch} from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useActionState } from "react";
import { AppDispatch } from "../store";
import { FormStateUser, handleFormSubmitUser } from "../api/user";
import SettingsLoading from "./splash/settingloading";
import { userActions } from "../store/user-slice";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountSettings() {
  const {logout}=useAuth();
  const{user,loading}=useSelector((state:RootState) => state.userState);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch<AppDispatch>();
  const [state,submitAction,loadingUpdate]=useActionState<FormStateUser, FormData>(
    (state: FormStateUser,formData: FormData)=>
      handleFormSubmitUser(state,formData,dispatch,axiosPrivate),
    { error: { code: '', message: '', details: '' } });
    //console.log(state);
  if (loading) return <SettingsLoading/>;
  if(user)return (
    <div className="w-full mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

      <form action={submitAction}  className="space-y-4">
        {/* Profile Picture Section */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
            id="preview-image"
          />
          <div>
            <label className="inline-block px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2 cursor-pointer">
              <span>Change Photo</span>
              <input
          type="file"
          name="image"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = document.getElementById('preview-image') as HTMLImageElement;
                if (img && e.target?.result) {
            img.src = e.target.result as string;
                }
              };
              reader.readAsDataURL(file);
            }
          }}
              />
            </label>
            <button
              type="submit"
              name="action"
              value="removePhoto"
              className="px-4 py-2 text-sm bg-transparent text-red-600 border border-red-600 rounded-lg hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              className="mt-1 block w-full px-4 py-2 text-sm border rounded-md dark:bg-neutral-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              className="mt-1 block w-full px-4 py-2 text-sm border rounded-md dark:bg-neutral-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Organization</label>
            <input
              type="text"
              name="organization"
              defaultValue={user.organization}
              className="mt-1 block w-full px-4 py-2 text-sm border rounded-md dark:bg-neutral-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
            <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              defaultValue={user.role}
              value={user.role}
              onChange={(e) => {
                const role = e.target.value;
                dispatch(userActions.updateUser({ role }));
              }}
              className="mt-1 block w-full px-4 py-2 text-sm border rounded-md dark:bg-neutral-800 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="developer">Developer</option>
              <option value="backend eniner">Backend Engineer</option>
              <option value="frontend eniner">Frontend Engineer</option>
              <option value="student">Student</option>
            </select>
            </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">Preferences</h2>
          {['emailNotifications', 'weeklyReports', 'marketing'].map((pref) => (
            <label key={pref} className="flex items-center">
              <input
                type="checkbox"
                name={`preferences.${pref}`}
                //defaultChecked={user.preferences[pref as keyof user['preferences']]}
                className="mr-2"
              />
              {pref.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ))}
        </div>
        {state?.message && !loading && (
        <div className="mt-3 text-sm text-green-600 bg-green-100 p-2 rounded dark:bg-green-800 dark:text-green-300">
          {state.message}
        </div>)}
        <button
          type="submit"
          disabled={loadingUpdate}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
            loadingUpdate 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-blue-700'
          }`}
        >
          {loadingUpdate ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
      <button 
          onClick={logout}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          logout
      </button>
    </div>
  );
}
