import React from 'react';
import styled from 'styled-components';

export default function Card(props) {

  const Card = styled.div`
    background: #ffffff;
    flex: 0 0 33%;
  `;

  return (
    <Card>
      <h2>{props.city}</h2>
    </Card>
  );
}