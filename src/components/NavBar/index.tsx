import { Nav } from 'react-bootstrap';
import NavItem, { NavItemProps } from './NavItem';

interface NavBarProps {
  activeTab: NavItemProps['activeTab'];
  data: Omit<NavItemProps, 'navItemClickHandler' | 'activeTab'>[];
  navItemClickHandler: NavItemProps['navItemClickHandler'];
}

function NavBar({ activeTab, data, navItemClickHandler }: NavBarProps) {
  return (
    <Nav className="nav-bar mt-4 d-flex justify-content-center" variant="pills">
      {data.map(({ name, content }, index) => (
        <NavItem
          key={`${index}-${name}`}
          activeTab={activeTab}
          name={name}
          content={content}
          navItemClickHandler={navItemClickHandler}
        />
      ))}
    </Nav>
  );
}

export default NavBar;
