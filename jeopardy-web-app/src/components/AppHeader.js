import React from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem
} from "carbon-components-react/lib/components/UIShell";

const AppHeader = () => (
  <Header aria-label="Jeopardy Game">
    <HeaderName id="header-name" href="/" prefix="">
      Jeopardy
    </HeaderName>
    <HeaderNavigation aria-label="Jeopardy Game">
      <HeaderMenuItem id="home-menu-item" href="/">
        Home
      </HeaderMenuItem>
      <HeaderMenuItem id="admin-menu-item" href="/admin">
        Admin
      </HeaderMenuItem>
      <HeaderMenuItem id="admin-menu-item" href="/dashboard">
        Dashboard
      </HeaderMenuItem>
    </HeaderNavigation>
  </Header>
);

export default AppHeader;