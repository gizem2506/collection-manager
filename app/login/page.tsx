"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Button from "@/components/common/Button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("Lütfen geçerli bir e-posta adresi girin.")
      return
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.")
      return
    }

    const result = await signIn("credentials", {
      redirect: false,
      username: email,
      password: password
    })

    if (result?.ok) {
      router.push("/collections")
    } else {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-[792px]  md:h-[667px] bg-white border border-gray-300 rounded-lg shadow flex flex-col items-center justify-center px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-wider text-gray-800">SecilStore</h1>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1 font-bold">
              E-Posta
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-[#9F9EA0] px-4 py-2 rounded-md outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1 font-bold">
              Şifre
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full border border-[#9F9EA0] px-4 py-2 pr-10 rounded-md outline-none text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
              >
                {showPassword ? (
                  <RemoveRedEyeOutlinedIcon className="text-xs text-gray-400 " />
                ) : (
                  <VisibilityOffOutlinedIcon className="text-xs text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Beni Hatırla
            </label>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition">
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  )
}
