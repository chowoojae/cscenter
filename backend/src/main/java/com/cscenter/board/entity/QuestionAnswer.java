package com.cscenter.board.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.util.Assert;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity(name="QuestionAnswer")
public class QuestionAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(updatable=false)
    private String customerId;

    @Column(updatable=false)
    private String title;
    
    @Column(updatable=false)
    private String contents;

    @Column(updatable=false)
    @CreationTimestamp
    private Timestamp questionDt;

    @Column(insertable=false)
    private String answerId;
    
    @Column(insertable=false)
    private String answerNm;
    
    @Column(insertable=false)
    private String acontents;
    
    @Column(insertable=false)
    @UpdateTimestamp()
    private Timestamp answerDt;
    
    @Transient
    private boolean checkboxChecked = false;
    
    @Builder(builderClassName = "QuestionBuilder", builderMethodName = "QuestionBuilder")
    public QuestionAnswer(String customerId, String title, String contents) {
    	Assert.hasText(customerId, "customerId must not be empty");
    	Assert.hasText(title, "title must not be empty");
    	Assert.hasText(contents, "contents must not be empty");
	
    	this.customerId = customerId;
    	this.title = title;
    	this.contents = contents;
    }
    
    @Builder(builderClassName = "AnswerBuilder", builderMethodName = "AnswerBuilder")
    public QuestionAnswer(Long idx, String answerId, String answerNm, String acontents) {
        Assert.hasText(String.valueOf(idx), "idx must not be empty");
    	Assert.hasText(answerId, "answerId must not be empty");
    	Assert.hasText(answerNm, "answerNm must not be empty");
    	Assert.hasText(acontents, "acontents must not be empty");
    	
    	this.idx = idx;
    	this.answerId = answerId;
    	this.answerNm = answerNm;
    	this.acontents = acontents;
    }
}
