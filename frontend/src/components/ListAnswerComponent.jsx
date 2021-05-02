import React, { Component } from 'react';
import AnswerService from '../service/AnswerService';

class ListAnswerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            answerId: window.sessionStorage.getItem("answerId"),
            answerNm: window.sessionStorage.getItem("answerNm"),
            questions: []
        }
        this.getAllQuestionNotAnswer = this.getAllQuestionNotAnswer.bind(this)
    }

    interval = null;

    getAllQuestionNotAnswer() {
        console.log("interval1");
        AnswerService.getAllQuestionNotAnswer().then((res) => {
            this.setState({ questions: res.data});
        });
    }

    componentDidMount() {
        // 10초마다 갱신    
        this.interval = setInterval(this.getAllQuestionNotAnswer, 10000);
        this.getAllQuestionNotAnswer();
    }

    componentDidUpdate() {
        // 세션체크
        if (window.sessionStorage.getItem("answerId") === "" || window.sessionStorage.getItem("answerId") === null) {
            alert("상담사 로그인 정보가 없어서, 로그인 화면으로 이동합니다.")
            this.props.history.push(`/login`);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleAllChecked = (event) => {
        let questions = this.state.questions
        questions.forEach(question => {
            question.checkboxChecked = event.target.checked
        })
        this.setState({questions: questions})
    }

    handleCheckChildElement = (event) => {
        let questions = this.state.questions
        questions.forEach(question => {
            if (question.idx.toString() === event.target.value) {
                question.checkboxChecked = event.target.checked
            }
        })
        this.setState({questions: questions})
    }

    choiceAnswerId = (event) => {
        event.preventDefault();
        let answers = {
            answerList: this.state.questions.filter(question => question.checkboxChecked === true),
            answerId: this.state.answerId,
            answerNm: this.state.answerNm,            
        };
        //console.log("answers => "+ JSON.stringify(answers));
        AnswerService.updateAnswerId(answers).then(res => {
            let result = res.data;
            if (result.code === 'OK') {
                alert(result.message);
                //this.props.history.push('/login');
            } else {
                //console.log("updateAnswerId Error => " + result.message);
                alert("updateAnswerId Error => " + result.message);
            }            
            this.getAllQuestionNotAnswer()
        });
    }

    readQuestion(idx) {
        this.props.history.push(`/read-answer/${idx}`);
    }

    logout = (event) => {
        event.preventDefault();
        // 세션 초기화
        window.sessionStorage.clear();
        //window.sessionStorage.setItem("answerId", "");
        //window.sessionStorage.setItem("answerNm", "");
        this.props.history.push(`/login`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">미답변 고객 문의 리스트</h2>
				<div>
                    <button onClick={this.choiceAnswerId}>담당자지정</button>
                    <label style={{marginLeft:"200px"}}>상담사 정보 - ID : {this.state.answerId} / 이름 : {this.state.answerNm} </label>
                    <button onClick={this.logout}>로그아웃</button>
                </div>                
                <div>
                    <table>
                        <thead className="headerTable">
                            <tr>
                                <th><input type="checkbox" onClick={this.handleAllChecked} value="checkedall" /> 선택</th>    
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
                                    <tr key={question.idx}>
                                        <td> <input type="checkbox" 
                                                    checked={question.checkboxChecked} 
                                                    onChange={this.handleCheckChildElement}
                                                    value={question.idx} />  </td>
                                        <td> {question.checkboxChecked} {question.idx} </td>
                                        <td onClick = {() => this.readQuestion(question.idx)}> {question.customerId} </td>
                                        <td onClick = {() => this.readQuestion(question.idx)}> {question.title} </td>
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

export default ListAnswerComponent;