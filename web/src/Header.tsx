import React from 'react';

// function Header() {
//   return (
//     <header>
//       <h1>Ecoleta</h1>
//     </header>
//   );
// }

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    return ( 
      <header>
        <h1>{props.title}</h1>
      </header>
    );
  }

export default Header;
