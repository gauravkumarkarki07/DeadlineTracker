import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { CreateAccount, useCreateAccount } from "../hooks/useAuthQuery"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"

function SignUp() {
    const navigate = useNavigate();
    const { mutateAsync } = useCreateAccount();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateAccount>();

    const signUp = async (data: CreateAccount) => {
        const response=await mutateAsync(data);
        if(response){
            return navigate('/auth/login')
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }


    return (
        <form className="flex flex-col gap-6 justify-center px-4 py-4" onSubmit={handleSubmit(signUp)}>
            <h1 className="text-3xl">Sign Up</h1>
            <section className="flex gap-4">
                <section className="flex flex-col gap-2 w-full">
                    <Label>First Name</Label>
                    <Input
                        placeholder="Your first name"
                        {...register('firstName', { required: true })} />
                    {errors.firstName && <span className="text-xs text-red-500">First Name is required</span>}
                </section>
                <section className="flex flex-col gap-2 w-full">
                    <Label>Last Name</Label>
                    <Input
                        placeholder="Your last name"
                        {...register('lastName', { required: true })} />
                    {errors.lastName && <span className="text-xs text-red-500">Last Name is required</span>}
                </section>
            </section>
            <section className="flex gap-4">

                <section className="flex flex-col gap-2 w-full">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="example@exmaple.com"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </section>
                <section className="flex flex-col gap-2 w-full">
                    <Label>Username</Label>
                    <Input
                        placeholder="Your username"
                        {...register('username', { required: true })} />
                    {errors.username && <span className="text-xs text-red-500">Username is required</span>}
                </section>
            </section>

            <section className="flex flex-col gap-2">
                <Label>Password</Label>
                <section className="flex gap-2">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password123"
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
            <Button>Sign Up</Button>
            <section className="flex gap-2 justify-center">
                <span>Have an account ?</span>
                <span className="text-secondary hover:underline cursor-pointer">
                    <Link to={'/auth/login'}>
                        Login
                    </Link>
                </span>
            </section>
        </form>
    )
}

export default SignUp