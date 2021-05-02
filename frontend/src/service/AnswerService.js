import axios from 'axios';

const ANSWER_API_BASE_URL = "http://localhost:8080/api/answer"; 

class AnswerService {

    /**
     * 로그인
     * @param {*} answerUser 
     * @returns 
     */
    loginAnswerUser(answerUser) {
        return axios.post(ANSWER_API_BASE_URL + "/login", answerUser);
    }

    /**
     * 상담사 등록
     * @param {*} answerUser 
     * @returns 
     */
    createAnswerUser(answerUser) {
        return axios.post(ANSWER_API_BASE_URL + "/signup", answerUser);
    }

    /**
     * 미답변 문의 목록 조회
     * @returns 
     */
    getAllQuestionNotAnswer() {
        return axios.get(ANSWER_API_BASE_URL);
    }

    /**
     * 문의글 상담사 지정
     * @param {*} answers
     * @returns 
     */
    updateAnswerId(answers) {
        return axios.post(ANSWER_API_BASE_URL + "/choice", answers);
    }

    /**
     * 문의 상세(답변)
     * @param {*} idx 
     * @returns 
     */
    getOneQuestion(idx) {
        return axios.get(ANSWER_API_BASE_URL + "/" + idx);
    }

    /**
     * 문의글 답변 저장
     * @param {*} idx 
     * @param {*} answer 
     * @returns 
     */
     updateAnswer(answer) {
        return axios.post(ANSWER_API_BASE_URL, answer);
    }
}

export default new AnswerService();