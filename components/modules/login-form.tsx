import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"
import login from "@/services/auth"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { splitUserLogin } from "@/lib/split_user_login"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    try {
      setLoading(true)
      const res = await login(username, password)
      if(!res.data) return
      const [data, token] = splitUserLogin(res.data)
      setLoading(false)
      setCookie('token', token)
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/dashboard')
    } catch(e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <Image src={'/gvp-logo.png'} width={180} height={80} alt="logo-login" />
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form> */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="Your Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleLogin} className="w-full" disabled={loading}>
                  { loading ? "Loading..." : "Login" }
                </Button>
              </div>
            </div>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>
  )
}
