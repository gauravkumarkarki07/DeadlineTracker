import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Login as LoginForm, useLogin } from '@/Auth/hooks/useAuthQuery'
import { Link, useNavigate } from "react-router-dom"

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const navigate = useNavigate();

    const { mutateAsync: handleLogin } = useLogin();
    const Login = async (data: LoginForm) => {
        const response = await handleLogin(data);
        if (response) {
            navigate('/deadline-tracker')
        }
    }
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <form className="flex flex-col gap-8 justify-center mx-20 my-10 px-2 py-2 items-center" onSubmit={handleSubmit(Login)}>
            <article className="flex flex-col gap-2 w-full text-sm">
                <h1 className="text-3xl">Welcome Back!</h1>
                <section className="flex flex-col text-gray-400">
                    <section className="flex gap-2">
                        <span>Dont have an account ?</span>
                        <span className="text-secondary hover:text-accentPrimary underline cursor-pointer">
                            <Link to={'/auth/signup'}>
                                Create a free account now
                            </Link>
                        </span>
                    </section>
                    <span>
                        It's free, Takes less than a minute.
                    </span>
                </section>
            </article>
            <section className="flex flex-col gap-2 w-full">
                <Label>Username Or Email</Label>
                <Input
                    placeholder="Enter your username or email"
                    {...register('usernameOrEmail', { required: 'Username Or Email is required' })}
                />
                {errors.usernameOrEmail && <span className="text-xs text-red-500">{errors.usernameOrEmail.message}</span>}
            </section>
            <section className="flex flex-col gap-2 w-full">
                <Label>Password</Label>
                <section className="flex gap-2 w-full">
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
                            <Eye strokeWidth={1} />
                            : <EyeOff strokeWidth={1} />
                        }
                    </Button>
                </section>
                {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </section>
            <Button className="w-full">Login</Button>
            <section className="flex gap-2 text-gray-400 text-sm">
                <span>Forget Password ?</span>
                <span className="text-secondary hover:text-accentPrimary underline cursor-pointer">
                    <Link to={'/auth/signup'}>
                        Click here
                    </Link>
                </span>
            </section>
        </form>
    )
}

export default Login