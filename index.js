

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

  let button;
  switch( props.answerIsCorrect ){
    case true:
      button = 
        <button className = "btn btn-success" onClick={props.acceptAnswer} >
          <i className="fa fa-check"></i>
        </button>
      break;
    case false:
      button =
        <button className = "btn btn-danger">
          <i className="fa fa-times"></i>
        </button>
      break;
    default:
      button = 
        <button className = "btn"
                    disabled={props.selectedNumbers.length === 0}
                    onClick={props.checkAnswer}>
          =
        </button>
      break;
  }

  return (
        <div className="col-2 text-center">
          {button}
          <br/>
          <button className = "btn btn-warning btn-sm" 
                        disabled={props.remainingRedraws === 0}
                        onClick={props.redraw}>
            <i className="fa fa-sync">
              {props.remainingRedraws}
            </i>
          </button>
        </div>
  );
};

const Answer = (props) => {
  return (
    <div className="col-5">
      { props.selectedNumbers.map( ( number, i)=>
        <span key={i} onClick={ () => props.unselectNumber(number) }>{number}</span> ) }
    </div>
  );
};

const Numbers = (props) => {
  
  const numberClassName = (number) => {
    if( props.usedNumbers.indexOf(number) >= 0 ) return 'used';
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

  static randomNumber = () => 1 + Math.floor( Math.random() * 9 );

  state = { 
    selectedNumbers: [  ], 
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    remainingRedraws: 5,
  };

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0 ) return;
    this.setState( prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat( clickedNumber ),
    }));
  };

  unselectNumber = (clickedNumber) => {
    this.setState( prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter( number => number !== clickedNumber ),
    }));
  };

  checkAnswer = () => {
    this.setState( prevState => ({
      answerIsCorrect: prevState.numberOfStars === 
          prevState.selectedNumbers.reduce( ( total, elt ) => total + elt, 0 ),
    }));
  };  

  acceptAnswer = () => {
    this.setState( prevState => ({
      usedNumbers: prevState.usedNumbers.concat( prevState.selectedNumbers ),
      answerIsCorrect: null,
      selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
    }));
  };  

  redraw = () => {
    if( this.state.remainingRedraws === 0) return;
    this.setState( prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
      remainingRedraws: prevState.remainingRedraws - 1,
    }));
  };  

  render() {
    const { selectedNumbers, usedNumbers, remainingRedraws,
      numberOfStars, answerIsCorrect } = this.state;

    return (
      <div className="container">
          <h3>Play Nine</h3>
          <hr />
          <div className="row">
            <Stars numberOfStars={numberOfStars} />
            <Button selectedNumbers= {selectedNumbers} 
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        remainingRedraws={remainingRedraws}
                        answerIsCorrect={answerIsCorrect}/>
            <Answer selectedNumbers= {selectedNumbers} 
                        unselectNumber={this.unselectNumber}/>
          </div>
          <br />
          <Numbers selectedNumbers= {selectedNumbers} 
                        selectNumber={this.selectNumber} 
                        usedNumbers={usedNumbers} />
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

