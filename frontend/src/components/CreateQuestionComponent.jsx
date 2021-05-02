import React, { Component } from 'react';
import QuestionService from '../service/QuestionService';

class CreateQuestionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerId: '',
            title: '',
            contents: ''
        }

        this.changeCustomerIdHandler = this.changeCustomerIdHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
    }

    changeCustomerIdHandler = (event) => {
        this.setState({customerId: event.target.value});
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeContentsHandler = (event) => {
        this.setState({contents: event.target.value});
    }

    createQuestion = (event) => {
        event.preventDefault();

        if (this.state.title === "") {
            return alert("제목을 입력하세요.")
        } else if (this.state.contents === "") {
            return alert("문의 내용을 입력하세요.")
        }

        let question = {
            customerId: this.state.customerId,
            title: this.state.title,
            contents: this.state.contents
        };
        //console.log("question => "+ JSON.stringify(question));
        QuestionService.createQuestion(question).then(res => {
            this.props.history.push('/question');
        });
    }

    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/question');
    }

    render() {
        return (
            <div>
                <div>
                    <h3 className="text-center">새 문의를 작성해주세요.</h3>
                    <div>
                        <form>
                        <div>
                            <label> 고객 ID  </label>
                            <input placeholder="고객 ID를 입력하세요." name="customerId"
                            value={this.state.customerId} onChange={this.changeCustomerIdHandler}/>
                        </div>
                        <div>
                            <label> 제 목 </label>
                            <input placeholder="제목을 입력하세요." name="title"
                            value={this.state.title} onChange={this.changeTitleHandler}/>
                        </div>
                        <div>
                            <label> 문의 내용  </label>
                            <textarea placeholder="문의 내용을 입력하세요." name="contents"
                            value={this.state.contents} onChange={this.changeContentsHandler}/>
                        </div>

                        <button onClick={this.createQuestion}>저장</button>
                        <button onClick={this.cancel} style={{marginLeft:"10px"}}>취소</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateQuestionComponent;