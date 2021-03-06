import React from 'react'
import ReactDOM from 'react-dom'

import DB from './database'

interface Props {};

interface Problem {
  id: Number
  description: String
  createdAt: Number
  impact: Number
  need: String
};

interface ProblemListState {
  problems: Array<Object>;
};

function createDummyProblem(id: Number) {
  return ProblemItem({
    id,
    description: 'Test of description',
    createdAt: (new Date()).getTime(),
    impact: 2,
    need: 'Test of a need to be fulfilled'
  });
}

function ProblemItem(props: Problem) {
  return (
    <li key={props.id}>
      {props.description}
    </li>
  );
};

class ProblemList extends React.Component<Props, ProblemListState> {
  state: ProblemListState = {
    problems: [createDummyProblem(1), createDummyProblem(2)]
  }

  constructor(props: Object) {
    super(props);
    DB.getDB().then((db) => {
      DB.getCurrentUser().then((user) => {
        db.collection(`/users/${user.uid}/problems/`).get().then((querySnapshot) => {
          const problemList = querySnapshot.docs.map((d) => {
            return ProblemItem({...d.data(), ...{id: d.id}});
          });
          this.setState({
            problems: problemList
          })
        });
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <p>Hello Darkness 2</p>
          <ol>{this.state.problems}</ol>
        </div>
        <div>
          Insert new problem
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProblemList />,
  document.getElementById('root'),
)