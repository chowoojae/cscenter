package com.cscenter.board.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cscenter.board.Result;
import com.cscenter.board.entity.AnswerUser;
import com.cscenter.board.entity.QuestionAnswer;
import com.cscenter.board.service.AnswerService;
import com.cscenter.board.service.AnswerUserService;
import com.cscenter.board.service.QuestionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BoardController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private AnswerUserService answerUserService;
	
	@Autowired
	private AnswerService answerService;
	
	/**
	 * 처음
	 * @return
	 */
	@GetMapping("/first")
	public String first() {
		return "현재 시간은 " + new Date() + "입니다.";
	}
	
	/**
	 * 고객 - 문의 목록 조회
	 * @return
	 */
	@GetMapping("/question")
	public List<QuestionAnswer> getAllQuestion() {
		return questionService.getAllQuestion();
	}

	/**
	 * 고객 - 문의 등록
	 * @param question
	 * @return
	 */
	@PostMapping("/question")
	public Result createQuestion(@RequestBody QuestionAnswer question) {
		return questionService.createQuestion(question);
	}

	/**
	 * 고객, 상담사 - 문의 상세 보기
	 * @param idx
	 * @return
	 */
	@GetMapping(value={"/question/{idx}", "/answer/{idx}"})
	public QuestionAnswer getQuestionByIdx(@PathVariable("idx") Long idx, HttpServletRequest request) {
		return questionService.getOneQuestion(idx).get();
	}
	
	/**
	 * 상담사 - ID 등록
	 * @param answerUser
	 * @return
	 */
	@PostMapping("/answer/signup")
	public Result createAnswerUser(@RequestBody AnswerUser answerUser) {
		return answerUserService.createAnswerUser(answerUser);
	}

	/**
	 * 상담사 - 로그인
	 * @param answerUser
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/answer/login")
	public Result loginAnswerUser(@RequestBody AnswerUser answerUser, HttpServletRequest requst) throws Exception {
		return answerUserService.loginAnswerUser(answerUser, requst);
	}
	
	/**
	 * 상담사 - 미답변 문의 목록
	 */
	@GetMapping("/answer")
	public List<QuestionAnswer> getAllQuestionNotAnswer() {
		return answerService.getAllQuestionNotAnswer();
	}
	
	/**
	 * 상담사 - 문의 담당자 지정
	 * @param idx
	 * @return
	 */
	@PostMapping("/answer/choice")
	public Result updateAnswerId(@RequestBody String answers) {
		return answerService.updateAnswerId(answers);
	}
	
	/**
	 * 상담사 - 문의 답변 등록
	 * @param idx
	 * @return
	 */
	@PostMapping("/answer")
	public Result updateAnswer(@RequestBody QuestionAnswer answer) {
		return answerService.updateAnswer(answer);
	}
}

