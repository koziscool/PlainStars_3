

class Card extends React.Component {

  render() {
    return (
      <div>
        tetris
      </div>
    );
  };
}




class App extends React.Component {

  render() {
    return (
      <div>
        <Card />
      </div>
    );
  };
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


