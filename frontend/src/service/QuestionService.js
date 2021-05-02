import axios from 'axios';

const QUESTION_API_BASE_URL = "http://localhost:8080/api/question"; 

class QuestionService {

    /**
     * 문의 목록
     * @returns 
     */
    getQuestions() {
        return axios.get(QUESTION_API_BASE_URL);
    }

    /**
     * 문의 등록
     * @param {*} question 
     * @returns 
     */
    createQuestion(question) {
        return axios.post(QUESTION_API_BASE_URL, question);
    }

    /**
     * 문의 상세(답변)
     * @param {*} idx 
     * @returns 
     */
    getOneQuestion(idx) {
        return axios.get(QUESTION_API_BASE_URL + "/" + idx);
    }
}

export default new QuestionService();