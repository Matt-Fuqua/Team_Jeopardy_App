import React from "react";
import Login20 from "@carbon/icons-react/lib/login/20";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
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
      <HeaderMenuItem id="about-menu-item" href="/about">
        About
      </HeaderMenuItem>
      <HeaderMenuItem id="admin-menu-item" href="/admin">
        Admin
      </HeaderMenuItem>
      <HeaderMenuItem id="debug-menu-item" href="/debug">
        Debug
      </HeaderMenuItem>
    </HeaderNavigation>
    <HeaderGlobalBar>
      <HeaderGlobalAction
        id="login-button"
        aria-label="Login"
        onClick={() => {}}
      >
        <Login20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </Header>
);

export default AppHeader;