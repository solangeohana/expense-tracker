import React from 'react';

const Button = (props) => {
    
    return (
       <button onClick={props.onClick} className={`f6 grow no-underline br-pill ph3 pv2 mb2 dib white ${props.color}`} type="submit">{props.name}</button>
    );
  };
  
  export default Button;