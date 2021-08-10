const Header = ({logoutHandler}) => {
    return (
        <div className="navbar">
            <nav>
                <ul className="navbar__items">
                    <li className="navbar__item" onClick={logoutHandler}>Logout</li>
                    <li className="navbar__item"></li>
                    <li className="navbar__item"></li>
                    <li className="navbar__item"></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header; 