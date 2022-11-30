import React, { useState } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

export default function Card(props) {

  const Card = styled.div`
    background: #ffffff;
    color: #000000;
    flex: 0 0 50%;
    border-radius: 10px;
    padding: 2rem;
    position: relative;

    h2 {
        color: rgb(122,54,177);
        margin: 0 0 1rem;
    }

    .time,
    .location,
    .values {
        font-size: 1.6rem;
        margin-bottom: 0.5rem;
    }

    .values {
        font-weight: 600;
    }

    .close {
        text-indent: -9999px;
        background: url('/close.png') transparent no-repeat;
        background-size: contain;
        border: none;
        position: absolute;
        top: 2rem;
        right: 2rem;
        height: 1.8rem; 
        width: 1.8rem; 
        cursor: pointer;
    }
  `;

  const handleClose = (index) => {
    console.log(index);
    const updatedCities = props.selectedCities.splice(index - 1, 1);
    props.setSelectedCities([...updatedCities]);
  }

  return (
    <Card>
      <div className="time">Updated <Moment fromNow ago>{props.time}</Moment> ago</div>
      <h2>{props.city}</h2>
      <div className="location">in {props.location}</div>
      <div className="values">asdsd</div>
      <button className="close" onClick={e => handleClose(props.index)}>Close</button>
    </Card>
  );
}