"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // 1. TAMBAHKAN: State untuk menyimpan pesan error
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(""); // Bersihkan error setiap kali mencoba login lagi

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      // 2. PERBAIKAN: Set error ke state, jangan di-return berupa div langsung
      setError("Email atau password salah");

      // Opsional: Hilangkan notifikasi otomatis setelah 4 detik
      setTimeout(() => setError(""), 4000);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="container mx-auto bg-linear-to-tr from-Primary via-Secondary to-Ketiga flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-lime-400 shadow-lime-400 shadow-sm p-8 my-20">
        <h1 className="mb-2 text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-lime-300 to-green-300 text-center">
          Admin Login
        </h1>

        <p className="mb-8 text-muted-foreground text-center">
          Login untuk mengelola konten website Anda.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="mb-2 block text-slate-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-lime-300 outline-none w-full rounded-lg border border-lime-400 hover:border-lime-400 hover:shadow-sm hover:shadow-lime-300 focus:border-lime-400 focus:shadow-sm focus:shadow-lime-300 active:border-lime-400 active:shadow-sm active:shadow-lime-300 p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-200">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-lime-300 outline-none w-full rounded-lg border border-lime-400 hover:border-lime-400 hover:shadow-sm hover:shadow-lime-300 focus:border-lime-400 focus:shadow-sm focus:shadow-lime-300 active:border-lime-400 active:shadow-sm active:shadow-lime-300 p-3 pr-12"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-xl select-none cursor-pointer focus:outline-none flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={20} color="oklch(89.7% 0.196 126.665)" />
                ) : (
                  <Eye size={20} color="oklch(89.7% 0.196 126.665)" />
                )}
              </button>
            </div>
          </div>

          {/* Pesan jika username atau password salah */}
          {error && (
            <div className="py-auto flex justify-center items-center bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm font-medium text-center animate-pulse">
              <AlertCircle className="h-4 w-4 inline-block mr-2" />
              {error}
            </div>
          )}
          {/* akhir allert */}

          {/* Tombol login */}
          <button
            disabled={loading}
            className="w-full rounded-lg bg-linear-to-r from-Primary via-Secondary to-Ketiga px-6 py-3 text-slate-200 font-semibold hover:from-Ketiga hover:via-Secondary hover:to-Primary cursor-pointer hover:shadow-sm hover:shadow-lime-300 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          {/* Akhir tombol login */}
        </form>
        {/* akhir form */}
      </div>
    </main>
  );
}

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";

// import { supabase } from "@/lib/supabase/client";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   async function handleLogin(e) {
//     e.preventDefault();

//     setLoading(true);

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       // alert(error.message);
//       return (
//         <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow">
//           password salah
//         </div>
//       );
//     }

//     router.push("/dashboard");
//     router.refresh();
//   }

//   return (
//     <main className="container mx-auto bg-linear-to-tr from-Primary via-Secondary to-Ketiga flex min-h-screen items-center justify-center px-4">
//       <div className="w-full max-w-md rounded-2xl border border-lime-400 shadow-lime-400 shadow-sm  p-8 my-20">
//         <h1 className="mb-2 text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-lime-300 to-green-300 text-center">
//           Admin Login
//         </h1>

//         <p className="mb-8 text-muted-foreground text-center">
//           Login untuk mengelola konten website Anda.
//         </p>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="mb-2 block text-slate-200">Email</label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="text-lime-300 outline-none w-full rounded-lg border border-lime-400 hover:border-lime-400 hover:shadow-sm hover:shadow-lime-300 focus:border-lime-400 focus:shadow-sm focus:shadow-lime-300 active:border-lime-400 active:shadow-sm active:shadow-lime-300 p-3"
//               required
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-slate-200">Password</label>

//             {/* 1. KODE BARU: Pembungkus relatif agar tombol mata bisa ditaruh di dalam input */}
//             <div className="relative flex items-center">
//               <input
//                 // 2. KODE DIUBAH: Mengubah type="password" menjadi dinamis
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 // 3. KODE DIUBAH: Menambahkan kelas 'pr-12' di ujung agar teks tidak menabrak ikon mata
//                 className="text-lime-300 outline-none w-full rounded-lg border border-lime-400 hover:border-lime-400 hover:shadow-sm hover:shadow-lime-300 focus:border-lime-400 focus:shadow-sm focus:shadow-lime-300 active:border-lime-400 active:shadow-sm active:shadow-lime-300 p-3 pr-12"
//                 required
//               />

//               {/* 4. KODE BARU: Tombol interaktif untuk memicu fungsi show/hide */}
//               <button
//                 type="button" // Wajib type="button" agar tidak men-submit form login
//                 onClick={() => setShowPassword(!showPassword)} // Mengubah true jadi false, atau sebaliknya
//                 className="absolute right-4 text-xl select-none cursor-pointer focus:outline-none"
//               >
//                 {showPassword ? (
//                   <EyeOff size={20} color="oklch(89.7% 0.196 126.665)" />
//                 ) : (
//                   <Eye size={20} color="oklch(89.7% 0.196 126.665)" />
//                 )}{" "}
//                 {/* Emoji berubah sesuai state */}
//               </button>
//             </div>
//           </div>

//           <button
//             disabled={loading}
//             className=" w-full rounded-lg bg-linear-to-r from-Primary via-Secondary to-Ketiga px-6 py-3 text-slate-200 font-semibold hover:from-Ketiga hover:via-Secondary hover:to-Primary cursor-pointer hover:shadow-sm hover:shadow-lime-300"
//           >
//             {loading ? "Signing in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }
