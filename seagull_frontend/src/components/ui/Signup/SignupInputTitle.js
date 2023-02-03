import React from 'react'
import styled from 'styled-components'

const SignupInputTitle = ({title}) => {
  return (
    <InputTitle>{title}</InputTitle>
  )
}

const InputTitle = styled.div`
width:100px;
  font-size: 15px;
  font-weight: bold;
  margin:15px 0 10px 0;
`;

export default SignupInputTitle