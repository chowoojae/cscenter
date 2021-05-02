import React, { Component } from 'react';
import QuestionService from '../service/QuestionService';

class ListQuestionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            questions: []
        }
    }

    componentDidMount() {
        QuestionService.getQuestions().then((res) => {
            this.setState({ questions: res.data});
        });
    }

    createQuestion = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-question`);
    }

    loginAnswerUser = (event) => {
        event.preventDefault();
        this.props.history.push(`/login`);
    }

    readQuestion(idx) {
        this.props.history.push(`/read-question/${idx}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">문의 리스트</h2>
				<div>
                    <button onClick={this.createQuestion}>문의작성</button>
                    <button onClick={this.loginAnswerUser} style={{marginLeft:"300px"}}>상담사로그인</button>
                </div>                
                <div>
                    <table>
                        <thead className="headerTable">
                            <tr>
                                <th>등록번호</th>
                                <th>고객 ID</th>
                                <th>제 목</th>
                                <th>등록일</th>
                                <th>답변일</th>
                            </tr>
                        </thead>
                        <tbody className="bodyTable">
                            {
                                this.state.questions.map(
                                    question => 
                                    <tr onClick = {() => this.readQuestion(question.idx)}>
                                        <td> {question.idx} </td>
                                        <td> {question.customerId} </td>
                                        <td> {question.title} </td>
                                        <td> {question.questionDt} </td>
                                        <td> {question.answerDt} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListQuestionComponent;