import {Container, Navbar} from 'react-bootstrap';
import Tag from 'antd/lib/tag';

const NavbarView = () => {

    return(
        <Container id="navbar" fluid>
            <Container>
                <Navbar id="navbar_container" className="navbar-dark" expand="lg">
                    <Navbar.Brand href="#home" id="logo_container">
                        <img id="logo" src="/logo512.png" alt="" />
                        <span id="name">Project</span>
                    </Navbar.Brand>
                    <div id="navbar-mode-container">
                        <Tag color="cyan">Analytics</Tag>
                        <Tag color="magenta">Dashboard</Tag>
                        <Tag color="gold">Bridge</Tag>
                    </div>
                    <p></p>
                </Navbar>
            </Container>
        </Container>
    );
}

export default NavbarView;