/*
* Main page after user logged in
*/

import React, { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import HabitList from './habitList';
import Footer from './footer';
import BlankCard from './blankCard';

const UserHabits = props => {

  function isSideBarOpen() {
    if (props.isOpen) {
      return <Sidebar sideRender={'inHabits'} closeSideBar={props.openSideBar} />;
    }
  }

  const [habits, setHabits] = useState([]);
  const [blank, setBlank] = React.useState(false);

  function getUserHabits(userId) {
    fetch(`/api/habit/${userId}`)
      .then(result => result.json())
      .then(userHabits => {
        setHabits(userHabits);
      });
  }

  function deleteUserHabit(habitId) {
    fetch('/api/habit/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ habitId: habitId })
    })
      .then(response => {
        const habitsCopy = [...habits];
        const index = habitsCopy.findIndex(element => element.habitId === habitId);
        habitsCopy.splice(index, 1);
        setHabits(habitsCopy);

      });
  }

  useEffect(() => {
    getUserHabits(2);

  }, []);

  const createBlank = () => {
    return blank && <BlankCard setBlank={setBlank} />;
  };

  return (
    <div className ="bg-light h-100">
      <Header title={'User Habits'} headerView={'main'} openSideBar={props.openSideBar}/>
      {isSideBarOpen()}
      <HabitList userHabits={habits} deleteHabit={deleteUserHabit} />
      {createBlank()}
      <Footer setBlank={setBlank} />
    </div>
  );
};

export default UserHabits;
