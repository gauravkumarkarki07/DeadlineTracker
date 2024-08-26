import { Outlet } from "react-router-dom";
import WelcomeMsg from "../components/WelcomeMsg";

export default function Index() {
    return (
        <section className="flex min-h-screen items-center">
            <section className="flex h-[500px] mx-8 border rounded-2xl overflow-clip">
                <section className="w-1/2">
                    <WelcomeMsg />
                </section>
                <section className="w-1/2">
                    <Outlet />
                </section>
            </section>
        </section>
    )
}
