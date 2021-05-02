package com.cscenter.board;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.cscenter.board.entity.QuestionAnswer;
import com.cscenter.board.repository.QuestionAnswerRepository;

@DataJpaTest
class BoardRepositoryTest {
	
	@Autowired
	QuestionAnswerRepository questionAnswerRepository;
	
	@Test
	void saveQuestion() {
		questionAnswerRepository.save(QuestionAnswer.QuestionBuilder()
				.customerId("a00001")
				.title("제목1")
				.contents("질문있습니다1")
				.build());	
		
		questionAnswerRepository.save(QuestionAnswer.QuestionBuilder()
				.customerId("a00002")
				.title("제목2")
				.contents("질문있습니다2")
				.build());	

		questionAnswerRepository.save(QuestionAnswer.QuestionBuilder()
				.customerId("a00003")
				.title("제목3")
				.contents("질문있습니다3")
				.build());	
		
		List<QuestionAnswer> questionList = questionAnswerRepository.findAll();
		
		for (QuestionAnswer question : questionList) {
			System.out.println(question.getCustomerId());
			System.out.println(question.getTitle());
			System.out.println(question.getContents());
		}
	}

}
