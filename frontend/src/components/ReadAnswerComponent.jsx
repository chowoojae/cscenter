import React, { Component } from 'react';
import AnswerService from '../service/AnswerService';

class ReadAnswerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idx: this.props.match.params.idx,
            answerId: window.sessionStorage.getItem("answerId"),
            answerNm: window.sessionStorage.getItem("answerNm"),
            acontents: '',
            question: {}
        }

        this.changeAcontentsHandler = this.changeAcontentsHandler.bind(this);
    }

    componentDidMount() {
        AnswerService.getOneQuestion(this.state.idx).then( res => {
            if (res.data.question === "") {
                alert("not found data.");
                this.props.history.push('/answer');
            }
            this.setState({question: res.data});
            //console.log("get result => "+ JSON.stringify(res.data));
        });
    }

    componentDidUpdate() {
        // 세션체크
        if (window.sessionStorage.getItem("answerId") === "" || window.sessionStorage.getItem("answerId") === null) {
            alert("상담사 로그인 정보가 없어서, 로그인 화면으로 이동합니다.")
            this.props.history.push(`/login`);
        }        
        // 상담사지정 체크
        if (this.state.answerId !== this.state.question.answerId) {
            alert("담당자 지정이 안되었거나 정보가 일치하지 않아 이전 화면으로 이동합니다.")
            this.props.history.push(`/answer`);
        }
    }

    componentWillUnmount() {
        // 위에 처리 후 필수로 생성되어 있어야 아래 에러발생 안함
        //perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method. at ListAnswerComponent
    }

    changeAcontentsHandler = (event) => {
        this.setState({acontents: event.target.value});
    }

    updateAnswer = (event) => {
        event.preventDefault();

        if (this.state.aacontents === "") {
            return alert("답변 내용을 입력하세요.")
        } 

        let answer = {
            idx: this.state.idx,
            answerId: this.state.answerId,
            answerNm: this.state.answerNm,
            acontents: this.state.acontents
        };
        //console.log("question => "+ JSON.stringify(answer));
        AnswerService.updateAnswer(answer).then(res => {
            let result = res.data;
            if (result.code === 'OK') {
                alert(result.message);
                this.props.history.push('/answer');
            } else {
                //console.log("updateAnswer Error => " + result.message);
                alert("updateAnswer Error => " + result.message);
            }                          
        });
    }

    goToList = (event) => {
        event.preventDefault();

        this.props.history.push('/answer');
    }

    getAnswerInfo() {
        //console.log("this.state.question.acontents => " + this.state.question.acontents);
        if (this.state.question.acontents === null) {
            return (
                <div>
                    <p>------------------------------------------------------</p>
                    <div>
                        <label>상담사 ID </label> : <br></br>
                        <h3> {this.state.answerId} </h3>
                    </div>                    
                    <div>
                        <label>상담사 이름 </label> : <br></br>
                        <h3> {this.state.answerNm} </h3>
                    </div>                    
                    <div>
                        <label>답변 내용 </label> 
                        <textarea placeholder="acontents" name="acontents"
                        value={this.state.acontents} onChange={this.changeAcontentsHandler}/>
                    </div>
                    <div>
                        <label>답변일 : [] </label>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <p>------------------------------------------------------</p>
                <div>
                    <label>상담사 ID </label> : <br></br>
                    <h3> {this.state.question.answerId} </h3>
                </div>                    
                <div>
                    <label>상담사 이름 </label> : <br></br>
                    <h3> {this.state.question.answerNm} </h3>
                </div>                
                <div>
                    <label>답변 내용 </label> : <br></br>
                    <h2> {this.state.question.acontents} </h2>
                </div>
                <div>
                    <label>답변일 : [ {this.state.question.answerDt} ] </label>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div>
                    <h3 className ="text-center"> 문의글 상세보기 </h3>
                    <form>
                    <div>
                        <div>
                            <label> 고객 ID </label> : <h2> {this.state.question.customerId} </h2>
                        </div>
                        <div>
                            <label> 제목 </label> : <h2> {this.state.question.title} </h2>
                        </div>                        
                        <div>
                            <label> 문의 내용 </label> : <br></br>
                            <h2> {this.state.question.contents} </h2>
                        </div>
                        <div>
                            <label>등록일 : [ {this.state.question.questionDt} ] </label>
                        </div>    
                        {this.getAnswerInfo()}               
                        <br></br> 
                        <button onClick={this.updateAnswer}>답변등록</button>
                        <button onClick={this.goToList} style={{marginLeft:"300px"}}>글 목록으로 이동</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default ReadAnswerComponent;