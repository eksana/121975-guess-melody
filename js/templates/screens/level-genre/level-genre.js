import Application from '../../../application.js';
import checkAnswer from '../../../data/check-answer.js';
import showScreen from '../../show-screen.js';
import controlGame from '../../control-game.js';
import LevelGenreView from './level-genre-view.js';

class LevelGenre {
  constructor(state) {
    this.state = state;
    this.question = Application.getLevelQuestion(this.state.level);
    this.view = new LevelGenreView(this.state.time, this.state.mistakes, this.question);
    this.answerTimerValue = 0;
    this.answerTimer = null;

    this.view.onSendAnswer = (answer) => {
      clearInterval(this.answerTimer);
      checkAnswer(this.state, this.question, answer, this.answerTimerValue);
      controlGame(this.state);
    };
  }

  init() {
    this.answerTimer = setInterval(() => this.answerTimerValue++, 1000);

    this.state.timer.onTick = (seconds) => {
      this.state.time = seconds;
      this.view.updateTime(seconds);
    };

    showScreen(this.view.element);

    this.state.level++;
  }
}

export default LevelGenre;
