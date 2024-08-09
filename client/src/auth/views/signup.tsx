import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Link } from "react-router-dom";

export default function signup() {
  return (
    <form className="px-4 py-4 flex flex-col gap-6">
        <section>
            <Label>First Name</Label>
            <Input

            />
        </section>
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
        <Button>Sign Up</Button>
        <section className="flex gap-2">
            <span>Already Have an account ?</span>
            <Link to={'/login'} className="text-blue-500 hover:underline cursor-pointer">Login</Link>
        </section>
    </form>
  )
}
