import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import HabitList from './habitList';
import Footer from './footer';
import BlankCard from './blankCard';

const UserRoutineHabitMain = props => {
  const [routineHabit, setRoutineHabit] = React.useState([]);
  const [blank, setBlank] = React.useState(false);

  React.useEffect(
    () => {
      fetch(`/api/routine/${props.routineId}/user/${props.userId}`)
        .then(res => res.json())
        .then(res => setRoutineHabit(res));
      fetch(`/api/routine/user/${props.userId}`)
        .then(res => res.json())
        .then(res => {
          for (const item of res) {
            if (props.routineId === item.routineId) {
              props.setRoutine({
                routineId: item.routineId,
                routineName: item.routineName
              });
            }
          }
        });
    }, []
  );

  const createBlank = () => {
    return blank && <BlankCard setBlank={setBlank}
      user={props.userId} routine={routineHabit} setRoutine={setRoutineHabit} />;
  };

  return (
    <div className="bg-light h-100 vh-100">
      <Header />
      <Sidebar />
      <HabitList userHabits={routineHabit} />
      {createBlank()}
      <Footer routineId={props.routineId} setBlank={setBlank} setView={props.setView}/>
    </div>
  );
};

export default UserRoutineHabitMain;