import React from 'react';
import BoardForm from '../components/Board/BoardForm';
import { BoardList } from '@/components/Board/BoardList';

export const Home = () => {
  return (
    <div>
      <h1>My Boards</h1>
      <BoardForm />
      <BoardList />
    </div>
  );
};
