import React from 'react';
import Routine from './routine';
import ChooseRoutine from './chooseRoutine';

const RoutineList = props => {
  const [editList, setEditList] = React.useState('');
  let createList;
  if (props.view === 'userRoutineMain') {
    createList = createListRoutine();
  } else {
    createList = createListChooseRoutine();
  }

  function createListRoutine() {
    if (!props.routine) {
      return null;
    } else if (props.routine.length > 0) {
      const createList = props.routine.map(item => <Routine key={item.routineId}
        routineItem={item} editList={editList} setEditList={setEditList}
        routineId={item.routineId} userId={props.userId} setView={props.setView}
        setRoutine={props.setRoutine} routine={props.routine} />);
      return createList;
    } else {
      return <h2 className="p-3 text-secondary">add a routine</h2>;
    }
  }

  function createListChooseRoutine() {
    if (!props.routine) {
      return null;
    } else if (props.routine.length > 0) {
      const createList = props.routine.map(item => <ChooseRoutine addingInfo={props.addingInfo} key={item.routineId}
        routineItem={item} name={item.routineName} id={item.routineId}
        currentRoutine = {props.currentRoutine} changeView={props.changeView} findCurrentRoutine={props.findCurrentRoutine}/>);
      return createList;
    } else {
      return <h2 className="p-3 text-secondary">you have no routines</h2>;
    }
  }

  return (
    <div>{createList}</div>
  );
};

export default RoutineList;
