

const allNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

const Stars = (props) => {

  let stars = [];
  for( var i = 0; i < props.numberOfStars ; i++ ) {
    stars.push( <i key={i} className="fa fa-star"></i>);
  }
    
  return (
    <div className="col-5">
      { stars }
    </div>
  );
};

const Button = (props) => {
  return (
    <div className="col-2 btn">
      <button>=</button>
    </div>
  );
};

const Answer = (props) => {
  return (
    <div className="col-5">
      { props.selectedNumbers.map( ( number, i)=>
        <span key={i}>{number}</span> ) }
    </div>
  );
};

const Numbers = (props) => {
  
  const numberClassName = (number) => {
    if( props.selectedNumbers.indexOf(number) >= 0 ) return 'selected';
  }
  return (
    <div className="card text-center">
      <div>
        { allNumbers.map( (number, i)=>
          <span key={i} 
                  className={numberClassName(number)}
                  onClick={() => props.selectNumber(number) }>
            {number}
          </span>
        )}
      </div>
    </div>
  );
};


class Game extends React.Component {

  state = { 
    selectedNumbers: [  ], 
    numberOfStars: 1 + Math.floor( Math.random() * 9 ),
  };

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0 ) return;
    this.setState( prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat( clickedNumber ),
    }));
  };


  render() {
    return (
      <div className="container">
          <h3>Play Nine</h3>
          <hr />
          <div className="row">
            <Stars numberOfStars={this.state.numberOfStars} />
            <Button />
            <Answer selectedNumbers= {this.state.selectedNumbers} />
          </div>
          <br />
          <Numbers selectedNumbers= {this.state.selectedNumbers} 
                        selectNumber={this.selectNumber} />
      </div>
    );
  };
};


class App extends React.Component {
  render() {
    return (
      <div>
          <Game />
      </div>
    );
  };
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

