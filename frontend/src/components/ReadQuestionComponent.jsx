import React, { Component } from 'react';
import QuestionService from '../service/QuestionService';

class ReadQuestionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idx: this.props.match.params.idx,
            question: {}
        }
    }

    componentDidMount() {
        QuestionService.getOneQuestion(this.state.idx).then( res => {
            this.setState({question: res.data});
            //console.log("get result => "+ JSON.stringify(res.data));
        });
    }

    goToList() {
        this.props.history.push('/question');
    }

    getAnswerInfo() {
        //console.log("this.state.question.acontents => " + this.state.question.acontents);
        if (this.state.question.acontents === null) {
            return
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
                        <button onClick={this.goToList.bind(this)}>글 목록으로 이동</button>
                    </div>
                </div>

            </div>
        );
    }
}


export default ReadQuestionComponent;