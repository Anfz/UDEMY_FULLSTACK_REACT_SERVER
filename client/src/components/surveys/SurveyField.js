import React from 'react';

//automatically loks at props 
// and pulls out the input variable
export default ({input,label, meta : {error, touched}}) => {
  
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  );
};