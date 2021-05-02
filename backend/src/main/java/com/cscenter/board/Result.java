package com.cscenter.board;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Result {

	String code;
	String message;
	
	String answerId;
	String answerNm;
}
