package com.cscenter.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.cscenter.board.entity.QuestionAnswer;

public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, Long> {

	/**
	 * 답변 없는 문의 목록
	 * @return
	 */
	public List<QuestionAnswer> findAllByAcontentsIsNull();
	
	/**
	 * 먼저 담당자 지정되어있는지 확인
	 * @param idx
	 * @return
	 */
	@Query(" select count(*) from QuestionAnswer where idx = :idx and answerId is not null ")
	public int selectAnswerIdCount(@Param("idx") Long idx);
	
	/**
	 * 담당자 지정
	 */
	@Transactional
	@Modifying
	@Query(" update QuestionAnswer "
			+ " set answerId = :answerId "
			+ "   , answerNm = :answerNm "
			+ " where idx = :idx ")
	public int updateAnswerId(@Param("idx") Long idx, @Param("answerId") String answerId, @Param("answerNm") String answerNm);
}
