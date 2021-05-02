import React, { Component } from 'react';
import AnswerService from '../service/AnswerService';

class LoginAnswerUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answerId: '',
            answerPwd: ''
        }

        this.changeAnswerIdHandler = this.changeAnswerIdHandler.bind(this);
        this.changeAnswerPwdHandler = this.changeAnswerPwdHandler.bind(this);
    }

    changeAnswerIdHandler = (event) => {
        this.setState({answerId: event.target.value});
    }

    changeAnswerPwdHandler = (event) => {
        this.setState({answerPwd: event.target.value});
    }

    loginAnswerUser = (event) => {
        event.preventDefault();
        let answerUser = {
            answerId: this.state.answerId,
            answerPwd: this.state.answerPwd
        };
        //console.log("answerUser => "+ JSON.stringify(answerUser));

        AnswerService.loginAnswerUser(answerUser).then(res => {
            let result = res.data;
            if (result.code === 'OK') {
                // 세션관리
                window.sessionStorage.setItem('answerId', result.answerId);
                window.sessionStorage.setItem('answerNm', result.answerNm);
                // 목록으로 이동
                this.props.history.push('/answer');
            } else {
                //console.log("loginAnswerUser Error => " + result.message);
                alert("loginAnswerUser Error => " + result.message);
            }
        });
    }

    signupAnswerUser = (event) => {
        event.preventDefault();
        this.props.history.push('/signup');
    }

    goToList = (event) => {
        event.preventDefault();
        this.props.history.push('/question');
    }

    render() {
        return (
            <div>
                <div>
                    <h3 className="text-center">상담사 로그인</h3>
                    <div>
                        <form>
                        <div>
                            <label> 상담사 ID  </label>
                            <input placeholder="ID를 입력하세요." name="answerId" className="form-control" 
                            value={this.state.answerId} onChange={this.changeAnswerIdHandler}/>
                        </div>
                        <div>
                            <label> 상담사 PWD  </label>
                            <input placeholder="비밀번호를 입력하세요." name="answerPwd" className="form-control" 
                            value={this.state.answerPwd} onChange={this.changeAnswerPwdHandler}/>
                        </div>
                        <div>
                            <button onClick={this.loginAnswerUser}>로그인</button>
                            <button onClick={this.signupAnswerUser} style={{marginLeft:"10px"}}>상담사등록</button>
                            <button onClick={this.goToList} style={{marginLeft:"10px"}}>문의목록으로</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginAnswerUserComponent;