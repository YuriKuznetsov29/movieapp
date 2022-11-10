import { Link } from "react-router-dom";
import './sidebar.scss';

const Sidebar = () => {
    return (
        <>
            <aside className="sidebar">
                <nav>
                    <ul className="navigation">
                        <li>
                            <Link to={`/`}>
                                <i className="ph-house"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/find'}>
                                <i className="ph-magnifying-glass"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/login'}>
                               <i className="ph-user"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
    
}

export default Sidebar;