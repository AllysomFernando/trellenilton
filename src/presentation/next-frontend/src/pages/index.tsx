import React from 'react';
import BoardForm from '../components/Board/BoardForm';
import { BoardList } from '@/components/Board/BoardList';

const Home = () => {
  return (
    <div>
      <h1>My Boards</h1>
      <BoardForm  onSubmit={(e) => console.log("submited", e)}/>
      <BoardList />
    </div>
  );
};

export default Home