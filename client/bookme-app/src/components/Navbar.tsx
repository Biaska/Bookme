

const Navbar: React.FC = () => {
    return(
        <>
            <div className="nav">
                <a href="/"><img id="logo" src="/bookme-word-logo.png" alt="Bookme" /></a>
                <ul className="nav-list">
                    <li className="nav-item"><a href="/login">Vendor Service Portal</a></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar