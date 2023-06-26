import Feed from "@components/Feed"

const Home = () => {
    return (
        <section className="w-full flex items-center flex-col">
            <h1 className="head_text text-center">Create Get and Share
                <br className="max-xs:hidden" />
                <span className="orange_gradient text-center">AI-Generated Prompts</span>
            </h1>
            <p className="desc text-center">NPrompt is opensource openai prompt generating tool. This can be helpful for all the developers and other chatgpt daily users and so on.</p>

            {/* feed */}
            <Feed/>
        </section>
    )
}

export default Home