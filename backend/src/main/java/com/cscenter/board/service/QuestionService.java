package com.cscenter.board.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cscenter.board.Result;
import com.cscenter.board.entity.QuestionAnswer;
import com.cscenter.board.repository.QuestionAnswerRepository;

@Service
public class QuestionService {
	
	@Autowired
	private QuestionAnswerRepository questionRepository;
	
	/**
	 * 문의 목록 조회
	 * @return
	 */
	public List<QuestionAnswer> getAllQuestion() {
		return questionRepository.findAll();
	}

	/**
	 * 문의 등록
	 * 
	 * @param board
	 * @return
	 */
	public Result createQuestion(QuestionAnswer question) {

		Result result = new Result();
		
		try {
			questionRepository.save(QuestionAnswer.QuestionBuilder()
					.customerId(question.getCustomerId())
					.title(question.getTitle())
					.contents(question.getContents())
					.build());

			result.setCode("OK");
			result.setMessage("등록되었습니다.");

		} catch (Exception e) {
			
			result.setCode("FAIL");
			result.setMessage(e.getMessage());
		}
		
		return result;
	}

	/**
	 * 문의 상세 조회
	 * @param idx
	 * @return 
	 * @return
	 */
	public Optional<QuestionAnswer> getOneQuestion(Long idx) {
		return questionRepository.findById(idx);
	}

}
