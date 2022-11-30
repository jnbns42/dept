import React, { useState } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

export default function Card(props) {

  const Card = styled.div`
    background: #ffffff;
    color: #000000;
    flex: 0 0 calc(50% - 1.5rem);
    border-radius: 10px;
    padding: 3rem;
    position: relative;
    box-sizing: border-box;
    @media screen and (max-width: 768px) {
        flex: 0 0 100%;
    }

    h2 {
        color: rgb(122,54,177);
        margin: 0 0 1rem;
        font-size: 2.5rem;
        font-weight: 700;
    }
      
    @media screen and (min-width: 768px) {
        h2 {
            font-size: 3rem;
        }
    }
      
    .time {
        font-size: 1.6rem;
        font-weight: 600;
        text-transform: uppercase;
    }

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
      <div className="values"> Values: 
        { props.parameters.map((reading, index) => (
            <span> {reading.displayName}: {reading.lastValue}{props.parameters.length !== index+1 ? ',' : ''}</span>
        ))

        }
      </div>
      <button className="close" onClick={e => handleClose(props.index)}>Close</button>
    </Card>
  );
}