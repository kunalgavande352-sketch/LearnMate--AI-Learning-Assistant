import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BrainCircuit,Mail,Lock,ArrowRight, User } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../../services/authService";


const RegisterPage = () => {

  const [username,setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const [focusedField,setFocusedField] = useState(null);

  const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      setError('Password must be at least 6 character long.')
      return 
    }
    setError('');
    setLoading(true);
    try {
      await authService.register(username,email,password);
      toast.success('Registration in successfully! Please Login');
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Failed to registe. Please try again.');
      toast.error(error.message || 'Failed to register.');
    }finally{
      setLoading(false);
    };
  }  



     let handlegoogleAuth = () => {
    window.location.href='http://localhost:8000/api/auth/google'
  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6">

    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

    <div className="relative w-full max-w-md">
      
      <div className="bg-white/90 backdrop-blur-md border border-slate-200/70 rounded-3xl shadow-2xl shadow-slate-400/40 p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30 mb-6">
            <BrainCircuit className="w-7 h-7 text-white" strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-semibold text-slate-800 tracking-tight mb-2">
            Create an account
          </h1>

          <p className="text-slate-500 text-sm">
            Start your AI-powered learning experience
          </p>
        </div>

        {/* From */}
         <div className="space-y-5">
           {/* Username Field */}
           <div className="space-y-2">
             <label htmlFor="" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
               Username
             </label>
             <div className="relative group">
                 <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none  transition-colors duration-200 ${
                      focusedField === 'username' ? 'text-emerald-500' : 'text-slate-400'

                    }`}>
                      <User className='h-5 w-5' strokeWidth={2}></User>
                    </div>
                    <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 "
                    placeholder="yourusername"
                    />
             </div>
           </div>

           {/* Email field */}
           <div className="space-y-2">
              <label htmlFor="" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Email
              </label>
              <div className="relative group">
                 <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none  transition-colors duration-200 ${
                      focusedField === 'email' 
                        ? 'text-emerald-500'
                        : 'text-slate-400'
                    }`}>

                      <Mail className='h-5 w-5' strokeWidth={2}></Mail>
                    </div>
                    <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                    placeholder="you@example.com"
                    />
              </div>
           </div>

           {/* Password Field */}
           <div className="space-y-2">
             <label htmlFor="" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
               Password
             </label>
             <div className="relative group">
                 <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                      focusedField === 'password' 
                        ? 'text-emerald-500'
                        : 'text-slate-400'
                    }`}>
                      <Lock className='h-5 w-5' strokeWidth={2}></Lock>
                    </div>
                    <input 
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10  "
                    placeholder="*********"
                    />
             </div>
           </div>

           {/* Error message */}
           {error &&(
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
               <p className="text-xs text-red-600 font-medium text-center">
                {error}
               </p>
            </div>
           )}
            

            {/* Submit Button */}
            <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative w-full h-12 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98]  text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-emerald-500/25 overflow-hidden "
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                   Creating account
                  </>
                ):(
                  <>
                  Create account
                  <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 "
                  strokeWidth={2.5}
                  />
                  </>
                )}
              </span>

              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
            </button>
            <div className="">
  <button onClick={handlegoogleAuth}
    className="flex items-center justify-center gap-3 w-full bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition duration-200"
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
</div>
         </div>
         
         {/* Footer */}
         <div className="mt-8 pt-5 border-t border-slate-200/60">
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
     </div>
      
      {/* Bottom Text */}
      <p className="text-center text-sm text-slate-600 mt-7">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  </div>

  )
}

export default RegisterPage
