import React from "react";
import { useDispatch } from "react-redux";

import { TOGGLE_THEME } from "../../redux/actions/appearance";

import { Container, Title, ThemeToggle } from "./styles";

export const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Title>
        <span id="logo-first-letters">Vinted enricher</span>
        <ThemeToggle>
          <span onClick={() => dispatch({ type: TOGGLE_THEME })} style={{ cursor: "pointer" }}>
            💡
          </span>
        </ThemeToggle>
      </Title>
    </Container>
  );
};
