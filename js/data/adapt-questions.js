import {QuestionTypes} from './game.js';

const getAnswerList = (loadedQuestion) => {
  if (loadedQuestion.type === QuestionTypes.ARTIST) {
    return loadedQuestion.answers.map((answer) => {
      return {
        artist: answer.title,
        image: answer.image.url
      };
    });
  }

  return loadedQuestion.answers.map((answer) => answer.src);
};

const getArtistCorrectAnswer = (answers) => {
  return answers.reduce((correctAnswer, answer) => {
    if (answer.isCorrect) {
      return correctAnswer + answer.title;
    }

    return correctAnswer;
  }, ``);
};

const getGenreCorrectAnswer = (answers, genre) => {
  return answers.reduce((correctAnswer, answer) => {
    if (answer.genre === genre) {
      return correctAnswer.concat(answer.src);
    }

    return correctAnswer;
  }, []);
};

const createArtistQuestion = (loadedQuestion) => {
  return {
    type: loadedQuestion.type,
    title: loadedQuestion.question,
    songSrc: loadedQuestion.src,
    answerList: getAnswerList(loadedQuestion),
    correctAnswer: getArtistCorrectAnswer(loadedQuestion.answers),
    preloadedSong: null
  };
};

const createGenreQuestion = (loadedQuestion) => {
  return {
    type: loadedQuestion.type,
    title: loadedQuestion.question,
    answerList: getAnswerList(loadedQuestion),
    correctAnswer: getGenreCorrectAnswer(loadedQuestion.answers, loadedQuestion.genre),
    preloadedSongs: []
  };
};

const adaptQuestions = (loadedData) => {
  const adaptedQuestions = [];

  loadedData.forEach((loadedQuestion) => {
    if (loadedQuestion.type === QuestionTypes.ARTIST) {
      adaptedQuestions.push(createArtistQuestion(loadedQuestion));
      return;
    }

    adaptedQuestions.push(createGenreQuestion(loadedQuestion));
  });

  return adaptedQuestions;
};

export default adaptQuestions;
