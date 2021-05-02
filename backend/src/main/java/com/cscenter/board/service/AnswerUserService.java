package com.cscenter.board.service;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cscenter.board.Result;
import com.cscenter.board.entity.AnswerUser;
import com.cscenter.board.repository.AnswerUserRepository;

@Service
public class AnswerUserService {
	
	@Autowired
	private AnswerUserRepository answerUserRepository;

	/**
	 * 상담사 등록
	 * @param answerUser
	 * @return
	 */
    public Result createAnswerUser(AnswerUser answerUser) {
    	
		answerUserRepository.save(AnswerUser.builder()
				.answerId(answerUser.getAnswerId())
				.answerNm(answerUser.getAnswerNm())
				.answerPwd(answerUser.getAnswerPwd())
				.build());

		Result result = new Result();
		result.setCode("OK");
		result.setMessage("등록되었습니다.");
		
        return result;
    }

    public Result loginAnswerUser(AnswerUser answerUser, HttpServletRequest request) {
        
    	Result result = new Result();
        
    	// 로그인을 하기 위해 가입된 user정보를 조회하는 메소드
        Optional<AnswerUser> answerUserWrapper = answerUserRepository.findById(answerUser.getAnswerId());
        
        if (answerUserWrapper.isEmpty()) {
        	result.setCode("ERR");
        	result.setMessage("No user found for "+ answerUser.getAnswerId() + ".");
        	return result;
        }

        if (!answerUser.getAnswerPwd().equals(answerUserWrapper.get().getAnswerPwd())) {
        	result.setCode("ERR");
        	result.setMessage("incorrect password for "+ answerUser.getAnswerId() + ".");
        	return result;
        }
                
        result.setCode("OK");
        result.setMessage("로그인성공");
        
        result.setAnswerId(answerUserWrapper.get().getAnswerId());
        result.setAnswerNm(answerUserWrapper.get().getAnswerNm());
        
        return result;
    }
}
