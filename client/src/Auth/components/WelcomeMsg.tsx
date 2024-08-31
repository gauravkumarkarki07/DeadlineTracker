function WelcomeMsg() {
    return (
        <section className="bg-gradient-to-r from-primary to-accentPrimary h-full px-20 py-4 flex flex-col justify-between items-center text-white">
            <article className="text-base flex flex-col gap-6 justify-center">
                <h1 className="text-5xl flex flex-col gap-2">
                    <span className="text-6xl">
                        *
                    </span>
                    <span className="font-semibold">
                        Hello
                    </span>
                    <span className="font-semibold">
                        Task<span className="text-accentPrimary">It!</span>
                    </span>
                </h1>
                <p>
                    This apps helps you to track your deadline. This app was developed by an international 
                    student who got tired of tracking his assignments due date manually.
                    Although, you can track any of your projects using this app.
                </p>
            </article>
            <span className="text-xs opacity-80">
                &copy; 2024 TaskIt. All rights reserved.
                </span>
        </section>
    )
}

export default WelcomeMsg