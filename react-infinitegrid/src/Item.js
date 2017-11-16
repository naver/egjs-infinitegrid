import React from 'react';

export default (props) => {
  return (
    <div className="item">
      <div className="thumbnail"><img alt="thumbnail" src={`image/${props.image}.jpg`}/></div>
      <div className="info">
        <a href="//m.naver.com">{props.text}</a>
      </div>
    </div>
  )
};

