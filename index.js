
const allNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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

const DoneFrame = (props) => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>
        Play Again?
      </button>
    </div>
  );
};


class Game extends React.Component {

  static randomNumber = () => 1 + Math.floor( Math.random() * 9 );
  static initialState = () => ({ 
    selectedNumbers: [  ], 
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    remainingRedraws: 5,
    doneStatus: null,
  });

  state = Game.initialState();

  resetGame = () => this.setState( Game.initialState() );

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
    }), this.updateDoneStatus );
  };  

  redraw = () => {
    if( this.state.remainingRedraws === 0) return;
    this.setState( prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
      remainingRedraws: prevState.remainingRedraws - 1,
    }), this.updateDoneStatus );
  };  


  possibleSolutions = ( {numberOfStars, usedNumbers} ) => {
    const possibleNumbers = allNumbers.filter( number =>
      usedNumbers.indexOf(number) === -1 );
    return possibleCombinationSum( possibleNumbers, numberOfStars );
  }

  updateDoneStatus = () => {
    this.setState( prevState => {
      if( prevState.usedNumbers.length ===  9 ) {
        return { doneStatus: 'You win, well done!'}
      }
      if( prevState.remainingRedraws === 0  && !this.possibleSolutions( prevState ) ) {
        return { doneStatus: 'You lose, sorry' }
      }
    });
  };  


  render() {
    const { selectedNumbers, usedNumbers, remainingRedraws, doneStatus,
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
          { doneStatus ?
            <DoneFrame doneStatus={doneStatus} 
                                  resetGame={this.resetGame} /> :
            <Numbers selectedNumbers= {selectedNumbers} 
                          selectNumber={this.selectNumber} 
                          usedNumbers={usedNumbers} />
          }
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

