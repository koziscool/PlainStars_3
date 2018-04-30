


class Button extends React.Component {
  handleClick = () => {
    this.props.onClickFunction( this.props.increment );
  };

 render() {
    return (
      <button onClick={ this.handleClick }>
        +{ this.props.increment }
      </button>
    );
  };
};

const Result = (props) => {
  return (
    <div>{props.counter}</div>
  );
};

class App extends React.Component {

  state = { counter: 0, };

  incrementCounter = (increment) => {
    this.setState( prevState => ({
      counter: prevState.counter + increment,
    }))
  }

  render() {
    return (
      <div>
        <Button increment={1} onClickFunction={ this.incrementCounter } />
        <Button increment={5} onClickFunction={ this.incrementCounter } />
        <Button increment={10} onClickFunction={ this.incrementCounter } />
        <Button increment={100} onClickFunction={ this.incrementCounter } />
        <Result counter={ this.state.counter }/>
      </div>
    );
  };
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


