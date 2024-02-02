

const Login: React.FC = () => {

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={() => {}}>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" />
                <label htmlFor="Password">Password: </label>
                <input type="password" id="password" />
                <button type="submit">Submit</button>
            </form>
            <p>or <a href="/signup">signup</a></p>
        </>
    )
}
export default Login