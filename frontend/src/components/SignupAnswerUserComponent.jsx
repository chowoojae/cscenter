import React, { Component } from 'react';
import AnswerService from '../service/AnswerService';

class SignupAnswerUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answerId: '',
            answerNm: '',
            answerPwd: ''
        }

        this.changeAnswerIdHandler = this.changeAnswerIdHandler.bind(this);
        this.changeAnswerNmHandler = this.changeAnswerNmHandler.bind(this);
        this.changeAnswerPwdHandler = this.changeAnswerPwdHandler.bind(this);
    }

    changeAnswerIdHandler = (event) => {
        this.setState({answerId: event.target.value});
    }

    changeAnswerNmHandler = (event) => {
        this.setState({answerNm: event.target.value});
    }

    changeAnswerPwdHandler = (event) => {
        this.setState({answerPwd: event.target.value});
    }

    createAnswerUser = (event) => {
        event.preventDefault();
        if (this.state.answerId === "") {
            return alert("상담사 ID는 필수입력입니다.")
        } else if (this.state.answerNm === "") {
            return alert("상담사 이름은 필수입력입니다.")
        } else if (this.state.answerPwd === "") {    
            return alert("상담사 PWD는 필수입력입니다.")
        }
        let answerUser = {
            answerId: this.state.answerId,
            answerNm: this.state.answerNm,
            answerPwd: this.state.answerPwd
        };
        //console.log("answerUser => "+ JSON.stringify(answerUser));
        AnswerService.createAnswerUser(answerUser).then(res => {
            let result = res.data;
            if (result.code === 'OK') {
                alert(result.message);
                //this.props.history.push('/login');
            } else {
                //console.log("loginAnswerUser Error => " + result.message);
                alert("loginAnswerUser Error => " + result.message);
            }            
        });
    }

    goToLogin = (event) => {
        event.preventDefault();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <div>
                    <h3 className="text-center">상담사 등록</h3>
                    <div>
                        <form>
                        <div>
                            <label> 상담사 ID  </label>
                            <input placeholder="ID를 입력하세요." name="answerId" className="form-control" 
                            value={this.state.answerId} onChange={this.changeAnswerIdHandler}/>
                        </div>
                        <div>
                            <label> 상담사 이름  </label>
                            <input placeholder="이름을 입력하세요." name="answerNm" className="form-control" 
                            value={this.state.answerNm} onChange={this.changeAnswerNmHandler}/>
                        </div>                        
                        <div>
                            <label> 상담사 PWD  </label>
                            <input placeholder="비밀번호를 입력하세요." name="answerPwd" className="form-control" 
                            value={this.state.answerPwd} onChange={this.changeAnswerPwdHandler}/>
                        </div>
                        <div>
                            <button onClick={this.createAnswerUser}>저장</button>
                            <button onClick={this.goToLogin} style={{marginLeft:"10px"}}>로그인</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupAnswerUserComponent;