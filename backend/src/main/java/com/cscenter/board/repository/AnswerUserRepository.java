package com.cscenter.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cscenter.board.entity.AnswerUser;

public interface AnswerUserRepository extends JpaRepository<AnswerUser, String> {

}
