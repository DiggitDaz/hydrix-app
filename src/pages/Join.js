import styled from "styled-components/native";
import RegisterForm from '../../components/Join/Registerform';

const Container3 = styled.View`
  width: 100% !important;
  max-width: 100%;
  overflow: hidden; 
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  `;

const Join = () => {
    return (
        <Container3>
            <RegisterForm />
        </Container3>
    );
};

export default Join;