


class Button extends React.Component {

  state = { counter: 0, };

  handleClick = () => {
    this.setState( prevState => ({
      counter: prevState.counter + 1,
    }))
  };

 render() {
    return (
      <button onClick={ this.handleClick }>{ this.state.counter }</button>
    );
  };
};

const Result = (props) => {
  console.log('tetris');
  return (
    <div>...</div>
  );
};

class App extends React.Component {
 render() {
    return (
      <div>
        <Button />
        <Result />
      </div>
    );
  };
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


