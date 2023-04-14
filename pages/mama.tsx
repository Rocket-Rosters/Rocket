import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 40px;
  letter-spacing: 4px;
  padding-left: 4px;
`;

const Planet = styled.div`
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background-color: #000403;
  position: absolute;
  bottom: -567px;
  left: 50%;
  margin-left: -350px;
  box-shadow: inset 8px 2px 10px #ede;
  z-index: 2;
`;

const ExampleComponent = () => {
  return (
    <Container>
      <div id="d1">
        <div id="d2">
          <div id="d3"></div>
        </div>
      </div>
      <div id="content">
        <Title>THE ASTRONAUT</Title>
      </div>
      <Planet id="planet"></Planet>
    </Container>
  );
};

export default ExampleComponent;
