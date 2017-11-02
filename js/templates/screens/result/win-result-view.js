import {WordsVariants} from '../../../data/game.js';
import convertSecondsToMinutes from '../../../utils/convert-seconds-to-minutes.js';
import declineWord from '../../../utils/decline-word.js';
import AbstractResultView from './abstract-result-view.js';

class WinResultView extends AbstractResultView {
  constructor(state) {
    super();
    this.state = state;
    this.currentPlayer = this.state.currentPlayer;
  }

  getInfoTemplate() {
    const spentTime = convertSecondsToMinutes(this.currentPlayer.spentTime);
    const minutes = `${spentTime.minutes} ${declineWord(Math.trunc(this.currentPlayer.spentTime / 60), WordsVariants.MINUTES)}`;
    const seconds = `${spentTime.seconds} ${declineWord(this.currentPlayer.spentTime % 60, WordsVariants.SECONDS)}`;
    const score = `${this.currentPlayer.score} ${declineWord(this.currentPlayer.score, WordsVariants.SCORE)}`;
    const quickAnswers = `${this.currentPlayer.numberQuickAnswers} ${declineWord(this.currentPlayer.numberQuickAnswers, WordsVariants.FAST)}`;
    const mistakes = `${this.state.mistakes} ${declineWord(this.state.mistakes, WordsVariants.MISTAKES)}`;
    const result = this.currentPlayer.result;

    return `<h2 class="title">Вы настоящий меломан!</h2>
            <div class="main-stat">
              За ${minutes} и ${seconds}
              <br>
              вы набрали ${score} (${quickAnswers})
              <br>
              совершив ${mistakes}
            </div>
            <span class="main-comparison">${result}</span>`;
  }
}

export default WinResultView;
