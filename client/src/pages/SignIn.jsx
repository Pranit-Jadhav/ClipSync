import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

import { auth,provider } from "../firebase";

import { signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name,setName] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSignup = async (e)=>{
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post("/api/auth/signup",{
        name,email,password
      });
      dispatch(loginSuccess(res.data))
      console.log(res.data);
      navigate('/', { replace: true });
      
      
    } catch (error) {
      dispatch(loginFailure())
      console.log(error);
      
    }


  }



  const handlelogin = async (e)=>{
    e.preventDefault();
    dispatch(loginStart())
    


    try {
      const res = await axios.post("/api/auth/signin",{
        name,password
      });
      dispatch(loginSuccess(res.data))
      console.log(res.data);
      navigate('/', { replace: true });
      
      
    } catch (error) {
      dispatch(loginFailure())
      console.log(error);
      
    }
  }


  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios.post("api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate('/', { replace: true });
            // <Navigate to="/random" replace = {true} />
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };


  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to ClipSync</SubTitle>
        <Input placeholder="username" onChange={e => setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setpassword(e.target.value)} />
        <Button onClick={handlelogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        
        <Input placeholder="username" onChange={e => setName(e.target.value)}/>
        <Input placeholder="email" onChange={e => setemail(e.target.value)}/>
        <Input type="password" placeholder="password" onChange={e => setpassword(e.target.value)}/>
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;