import { Nav } from 'react-bootstrap';

export interface NavItemProps {
  activeTab: string;
  name: 'all' | 'active' | 'completed';
  content: string;
  navItemClickHandler: (tab: 'all' | 'active' | 'completed') => void;
}

function NavItem({
  activeTab,
  name,
  content,
  navItemClickHandler: handleNavItemClick,
}: NavItemProps) {
  const isActive = activeTab === name;

  return (
    <Nav.Item className={`nav-bar__item ${isActive && 'shadow-sm pe-none'}`}>
      <Nav.Link
        href="#"
        active={isActive}
        onClick={() => handleNavItemClick(name)}
        data-testid={name}
      >
        {content}
      </Nav.Link>
    </Nav.Item>
  );
}

export default NavItem;
