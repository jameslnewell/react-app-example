import React from 'react';
import styled from 'styled-components';
import Heading from '../Heading';
import src from './hello-world.jpg';

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Home = () => (
  <div>
    <Heading>Home</Heading>
    <Image src={src} alt="hello-world"/>
  </div>
);

export default Home;
