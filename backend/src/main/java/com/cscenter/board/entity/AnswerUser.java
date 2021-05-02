package com.cscenter.board.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.util.Assert;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity(name="AnswerUser")
public class AnswerUser {

    @Id
    private String answerId;

    @Column
    private String answerNm;
    
    @Column
    private String answerPwd;
    
    @CreationTimestamp
    private Timestamp createDt;
    
    @Builder
    public AnswerUser(String answerId, String answerNm, String answerPwd) {
      Assert.hasText(answerId, "answerId must not be empty");
      Assert.hasText(answerNm, "answerNm must not be empty");
      Assert.hasText(answerPwd, "content must not be empty");

      this.answerId = answerId;
      this.answerNm = answerNm;
      this.answerPwd = answerPwd;
    }
}
