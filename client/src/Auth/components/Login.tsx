import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { Link } from "react-router-dom"

function Login() {
    return (
            <form className="flex flex-col gap-8 justify-center px-4 py-4">
                <h1 className="text-3xl">Login</h1>
                <section className="flex flex-col gap-4">
                    <Label>Username Or Email</Label>
                    <Input />
                </section>
                <section className="flex flex-col gap-4">
                    <Label>Password</Label>
                    <Input />
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