import React from 'react';
import styled from 'styled-components';
import {Margin} from 'styled-components-spacing';

const Bar = styled.div`
  height: 1em;
  background-color: #ccc;
`;

const Shell = () => (
  <div>

    <Margin vertical={3}>
      <Bar/>
    </Margin>

    <Margin vertical={3}>
      <Bar/>
    </Margin>

    <Margin vertical={3}>
      <Bar/>
    </Margin>

  </div>
);

export default Shell; 
