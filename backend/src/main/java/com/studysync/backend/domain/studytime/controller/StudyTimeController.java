package com.studysync.backend.domain.studytime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.domain.studytime.model.StudyTime;
import com.studysync.backend.domain.studytime.service.StudyTimeService;

@RestController
@RequestMapping("/api/study-times")
public class StudyTimeController {
	
	private final StudyTimeService studyTimeService;
	
	@Autowired
	public StudyTimeController(StudyTimeService studyTimeService) {
		this.studyTimeService = studyTimeService;
	}
	
	//공부시간 기록
	@PostMapping("")
	public ResponseEntity<String> recordStudyTime(@RequestBody StudyTime studyTime){
		//@RequestBody : 프론트에서 보낸 JSON 데이터를 StudyTime에 바인딩되게 해줌
		int result = studyTimeService.recordStudyTime(studyTime);
		return result > 0
				? ResponseEntity.ok("공부시간 기록 성공")
				: ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("공부시간 기록 실패");
	}
	
	//공부시간 조회
	@PostMapping("/latest")
	public ResponseEntity<?> loadLastStudyEntry(@RequestBody StudyTime studyTime){
		StudyTime result = studyTimeService.loadLastStudyEntry(studyTime.getUserId(), studyTime.getDate());
		if(result != null) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 날짜의 기록이 없습니다.");	
		}
	}
	
}
