import React from 'react'
import ReactDOM from 'react-dom'

console.log('Hello from tsx!')

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