import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";
import { BrainCircuit,Mail,Lock,ArrowRight } from "lucide-react";
import toast from "react-hot-toast";


const LoginPage = () => {
  
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const [focusedField,setFocusedField] = useState(null);

  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const {token,user} = await authService.login(email,password);
      login(user,token);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to login. Please check your credentials.');
      toast.error(error.message || 'Failed to login.');
    }finally{
      setLoading(false);
    };
  }  

return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6">

    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

    <div className="relative w-full max-w-md">
      
      <div className="bg-white/90  backdrop-blur-md border border-slate-200/70 rounded-3xl shadow-2xl shadow-slate-400/40 p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30 mb-6">
            <BrainCircuit className="w-7 h-7 text-white" strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-semibold text-slate-800 tracking-tight mb-2">
            Welcome back
          </h1>

          <p className="text-slate-500 text-sm">
            Sign in to continue your journey
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-slate-600 tracking-wide">
              Email
            </label>

            <div className="relative group">
              <div
                className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                  focusedField === "email"
                    ? "text-emerald-500"
                    : "text-slate-400"
                }`}
              >
                <Mail className="w-5 h-5" strokeWidth={2} />
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full h-12 pl-12 pr-4 border border-slate-200 rounded-xl bg-slate-50/70 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-slate-600 tracking-wide">
              Password
            </label>

            <div className="relative group">
              <div
                className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                  focusedField === "password"
                    ? "text-emerald-500"
                    : "text-slate-400"
                }`}
              >
                <Lock className="h-5 w-5" strokeWidth={2} />
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full h-12 pl-12 pr-4 border border-slate-200 rounded-xl bg-slate-50/70 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="********"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-xs text-red-600 font-medium text-center">
                {error}
              </p>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-700/30 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    strokeWidth={2.5}
                  />
                </>
              )}
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
       
        {/* <div className="m-2">
             <button
                  className="flex items-center justify-center gap-3 w-full bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900 transition duration-200"
              >
                <img
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG-98D_MFEk3YR_uwvjvF93_sWjkBPiPs7mw&s"
                     alt="Google"
                      className="w-6 h-6 rounded-full"
                  />
             <span className="font-medium">
                 Continue with Google
              </span>
            </button>
            </div> */}

           <div className="mt-4">
               <button
                  className="w-full h-12 flex items-center justify-center gap-3 bg-black text-white border border-slate-700 rounded-xl font-medium text-sm shadow-lg hover:bg-slate-900  hover:border-slate-600 active:scale-[0.98] transition-all duration-200 "
               >
                 <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG-98D_MFEk3YR_uwvjvF93_sWjkBPiPs7mw&s"
                    alt="Google"
                    className="w-8 h-8 rounded-full bg-white"
                />

               <span>Continue with Google</span>
              </button>
           </div>
      </div>

      {/* Footer */}
      <div className=" mt-8 pt-5 border-t border-slate-200/60">
        
        
          <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
        
      </div>

      {/* Bottom Text */}
      <p className="text-center text-sm text-slate-600 mt-7">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  </div>
);
}

export default LoginPage
