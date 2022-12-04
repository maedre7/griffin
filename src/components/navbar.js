import {Container, Navbar} from 'react-bootstrap';
import Tag from 'antd/lib/tag';
import {useNavigate} from "react-router-dom";

const NavbarView = () => {

    const _navigate = useNavigate();

    const navigate = (pathname) => {
        _navigate(pathname);
    }

    const isSelected = (mode) => {
        return window.location.pathname === mode;
    }

    return(
        <Container id="navbar" fluid>
            <Container>
                <Navbar id="navbar_container" className="navbar-dark" expand="lg">
                    <Navbar.Brand href="#home" id="logo_container">
                        <img id="navbar-logo" src="/icons/logo.png" alt="" />
                        <span id="navbar-name">Griffin</span>
                    </Navbar.Brand>
                    <div id="navbar-mode-container">
                        <Tag className="navbar-tag" color="cyan" onClick={() => navigate('/')}>Analytics</Tag>
                        <Tag className="navbar-tag" color="magenta" onClick={() => navigate('/dashboard')}>Dashboard</Tag>
                    </div>
                    <p></p>
                </Navbar>
            </Container>
        </Container>
    );
}

export default NavbarView;