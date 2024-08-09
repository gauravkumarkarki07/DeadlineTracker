import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Link } from "react-router-dom";

export default function login() {
  return (
    <form className="px-4 py-4 flex flex-col gap-6">
        <section>
            <Label>Username</Label>
            <Input

            />
        </section>
        <section>
            <Label>Password</Label>
            <Input

            />
        </section>
        <Button>Login</Button>
        <section className="flex gap-2">
            <span>Create an account ?</span>
            <Link to={'/signup'} className="text-blue-500 hover:underline cursor-pointer">Sign Up</Link>
        </section>
    </form>
  )
}
