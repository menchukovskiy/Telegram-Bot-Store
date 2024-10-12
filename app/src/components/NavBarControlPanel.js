import Nav from 'react-bootstrap/Nav';

const NavBarControlPanel = () => {

return (
    <Nav className="ml-auto" className="flex-column">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
)

}

export default NavBarControlPanel