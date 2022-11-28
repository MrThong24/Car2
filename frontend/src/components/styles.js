import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1301;
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { Overlay, Spinner };
