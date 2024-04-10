import { useEffect, useState, useReducer } from 'react';
import { getPerson } from './getPerson';

type State = {
  name: string | undefined;
  score: number;
  loading: boolean;
};

type Action =
  | {
      type: 'initialize';
      name: string;
    }
  | {
      type: 'increment';
    }
  | {
      type: 'decrement';
    }
  | {
      type: 'reset';
    };
export function PersonScore() {
  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });
  useEffect(() => {
    getPerson().then(({ name }) => dispatch({ type: 'initialize', name }));
  }, []);

  // const [name, setName] = useState<string | undefined>();
  // const [score, setScore] = useState(0);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   getPerson().then((person) => {
  //     setLoading(false);
  //     setName(person.name);
  //   });
  // }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h3>
        {name}, {score}
      </h3>
      <button onClick={() => dispatch({ type: 'increment' })}>Add</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>SubStract</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      {/* <button onClick={() => setScore(score + 1)}>Add</button>
      <button onClick={() => setScore(score - 1)}>SubStract</button>
      <button onClick={() => setScore(0)}>Reset</button> */}
    </div>
  );
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'initialize':
      return { name: action.name, score: 0, loading: false };
    case 'increment':
      return { ...state, score: state.score + 1 };
    case 'decrement':
      return { ...state, score: state.score - 1 };
    case 'reset':
      return { ...state, score: 0 };
    default:
      return state;
  }
}
