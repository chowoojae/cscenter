package com.cscenter.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cscenter.board.Result;
import com.cscenter.board.entity.QuestionAnswer;
import com.cscenter.board.repository.QuestionAnswerRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AnswerService {

	@Autowired
	private QuestionAnswerRepository answerRepository;
	
	/**
	 * 미답변 문의 목록 조회
	 * @return
	 */
	public List<QuestionAnswer> getAllQuestionNotAnswer() {
		return answerRepository.findAllByAcontentsIsNull();
	}

	/**
	 * 담당자 지정
	 * @param idx
	 * @return
	 */
	public Result updateAnswerId(String answers) {
		
		Result result = new Result();
		
		try {
			Map<String, Object> answersMap = new ObjectMapper().readValue(answers, new TypeReference<Map<String, Object>>() { });

			System.out.println(answersMap.get("answerList"));
			System.out.println(answersMap.get("answerId"));
			System.out.println(answersMap.get("answerNm"));

			List<Map<String, Object>> answerList = (ArrayList<Map<String, Object>>) answersMap.get("answerList");
			
			Long idx;
			String answerId = answersMap.get("answerId").toString();
			String answerNm = answersMap.get("answerNm").toString();
			int upCnt = 0;
			
			for (Map<String, Object> answer : answerList) {
				
				idx = Long.valueOf(answer.get("idx").toString());
				
				int dupcnt = answerRepository.selectAnswerIdCount(idx);
				
				if (dupcnt > 0) {
					result.setCode("FAIL");
					result.setMessage("다른 담당자가 지정된 문의가 있습니다.");
					break;
				} else {
					int cnt = answerRepository.updateAnswerId(idx, answerId, answerNm);
					if (cnt > 0) {
						upCnt++;
					} else {
						result.setCode("FAIL");
						result.setMessage("저장할 데이터가 없습니다.");
						break;
					}			
				}
			}
			
			if (upCnt > 0) {
				result.setCode("OK");
				result.setMessage("담당자 지정이 완료되었습니다.");				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result.setCode("FAIL");
			result.setMessage("잘못된 파라미터 정보입니다.");
		}
		
		return result;
	}
	
	/**
	 * 답변 등록
	 * 
	 * @param board
	 * @return
	 */
	public Result updateAnswer(QuestionAnswer answer) {

		Result result = new Result();
		
		try {
			Optional<QuestionAnswer> question = answerRepository.findById(answer.getIdx());

			if (question.isPresent()) {
				answerRepository.save(QuestionAnswer.AnswerBuilder()
						.idx(answer.getIdx())
						.answerId(answer.getAnswerId())
						.answerNm(answer.getAnswerNm())
						.acontents(answer.getAcontents())
						.build());
				
				result.setCode("OK");
				result.setMessage("저장되었습니다.");
			} else {
				result.setCode("FAIL");
				result.setMessage("저장할 데이터가 없습니다.");
			}

		} catch (Exception e) {
			
			result.setCode("FAIL");
			result.setMessage(e.getMessage());
		}
		
		return result;
	}

}
