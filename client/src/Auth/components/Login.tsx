import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Login as LoginForm, useLogin } from "../hooks/useAuthQuery"
import { useState } from "react"
import { Eye,EyeOff } from "lucide-react"

function Login() {
    const navigate=useNavigate();
    const{mutateAsync}=useLogin();
    const{register,handleSubmit,formState:{errors}}=useForm<LoginForm>();

    const Login=async(data:LoginForm)=>{
       const response= await mutateAsync(data);
        if(response){
            return navigate('/deadline-tracker');
        }
    }    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
            <form className="flex flex-col gap-8 justify-center px-4 py-4" onSubmit={handleSubmit(Login)}>
                <h1 className="text-3xl">Login</h1>
                <section className="flex flex-col gap-2">
                    <Label>Username Or Email</Label>
                    <Input 
                        placeholder="Enter your username or email"
                        {...register('usernameOrEmail',{required:'Username Or Email is required'})}
                    />
                    {errors.usernameOrEmail && <span className="text-xs text-red-500">{errors.usernameOrEmail.message}</span>}
                </section>
                <section className="flex flex-col gap-2">
                    <Label>Password</Label>
                    <section className="flex gap-2">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long'
                            },
                            pattern: {
                                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}/,
                                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                            }
                        })}
                    />
                    <Button
                        type="button"
                        variant={'outline'}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ?
                            <EyeOff strokeWidth={1} />
                            : <Eye strokeWidth={1} />
                        }
                    </Button>
                </section>
                    {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                </section>
                <Button>Login</Button>
                <section className="flex gap-2 justify-center">
                    <span>Dont have an account ?</span>
                    <span className="text-secondary hover:underline cursor-pointer">
                        <Link to={'/auth/signup'}>
                            SignUp
                        </Link>
                    </span>
                </section>
            </form>
    )
}

export default Login