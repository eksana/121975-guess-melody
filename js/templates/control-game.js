import {GameSettings, QuestionTypes, getQuestions, currentPlayer} from '../data/game.js';
import getPlayerScore from '../data/get-player-score.js';
import Application from '../application.js';

const questions = getQuestions();

console.log(questions);

// В зависимости от типа вопроса показываем один из двух типов игровых экранов
const showLevel = (state, question) => {
  if (question.type === QuestionTypes.ARTIST) {
    Application.showLevelArtist(state);
    return;
  }

  if (question.type === QuestionTypes.GENRE) {
    Application.showLevelGenre(state);
  }
};

const fillFinalState = (state) => {
  const numberQuickAnswers = currentPlayer.answers
      .filter((answer) => answer.time < GameSettings.MAX_QUICK_ANSWER_TIME)
      .length;

  const finalState = {
    timer: state.timer,
    mistakes: state.mistakes,
    currentPlayer: {
      remainingTime: state.time,
      remainingNotes: GameSettings.MAX_COUNT_NOTES - state.mistakes,
      numberQuickAnswers
    }
  };

  finalState.currentPlayer.spentTime = GameSettings.MAX_GAME_TIME - finalState.currentPlayer.remainingTime;
  finalState.currentPlayer.score = getPlayerScore(currentPlayer.answers, finalState.currentPlayer.remainingNotes);

  return finalState;
};

const controlGame = (state) => {

  // Если кончилось время или игрок совершил максимально возможное количество ошибок
  if (state.time === 0 || state.mistakes > GameSettings.MAX_COUNT_MISTAKES) {
    Application.showFailResult(state);
    return;
  }

  // Если игрок в процессе игры
  if (state.level < GameSettings.MAX_COUNT_LEVELS) {
    showLevel(state, questions[state.level]);
    return;
  }

  // Если игрок прошел все уровни
  if (state.level === GameSettings.MAX_COUNT_LEVELS) {
    const finalState = fillFinalState(state);

    Application.showWinResult(finalState);
  }
};

export default controlGame;
