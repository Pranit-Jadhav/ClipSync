import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchComments();
  }, [videoId]);

  const [newCom,setnewCom] = useState("");



  // const handlenewComment = async ()=>{


  // }

  const handlesubmit = async (e)=>{
      //  e.preventDefault();
       try {
        // console.log(newCom);
        const res = await axios.post("/api/comments",{
          desc:newCom,videoId:videoId,
        });
        console.log(res.data);
        // navigate('/', { replace: true });
        
       } catch (error) {
        console.log(error);
        
       }

  }

  


  return (
    <Container>
      <NewComment >
        <Avatar src={currentUser.img} />
        <form onSubmit={handlesubmit}>
          <Input placeholder="Add a comment..." onChange={(e)=>setnewCom(e.target.value)}/>
          <Button type="submit" >Comment</Button>
        </form>
      
        
      </NewComment>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
