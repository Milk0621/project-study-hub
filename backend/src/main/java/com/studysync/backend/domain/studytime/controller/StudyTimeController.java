package com.studysync.backend.domain.studytime.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.domain.studytime.model.StudyTime;
import com.studysync.backend.domain.studytime.service.StudyTimeService;
import com.studysync.backend.dto.StudyRankDto;

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
	@GetMapping("/latest")
	public ResponseEntity<?> loadLastStudyEntry(@RequestParam String userId, @RequestParam LocalDate date){
		StudyTime result = studyTimeService.loadLastStudyEntry(userId, date);
		if(result != null) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 날짜의 기록이 없습니다.");	
		}
	}
	
	@GetMapping("/study-rank")
	public ResponseEntity<?> getStudyRank(@RequestParam int groupId, @RequestParam LocalDate date){
		List<StudyRankDto> rankList = studyTimeService.getStudyRanking(groupId, date);
		return ResponseEntity.ok(rankList);
	}
	
	@GetMapping("/group/{groupId}/max")
    public ResponseEntity<Map<String, Integer>> getGroupMaxStudyTimes(@PathVariable int groupId) {
        Map<String, Integer> data = studyTimeService.getGroupTopStudyTimeByDate(groupId);
        return ResponseEntity.ok(data);
    }

}
