package com.studysync.backend.domain.studytime.dao;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.studysync.backend.domain.studytime.model.StudyTime;
import com.studysync.backend.dto.StudyRankDto;

public interface StudyTimeDAO {
	//공부시간 기록
	int upsertStudyTime(StudyTime studyTime);
	
	//공부시간 날짜별 조회
	StudyTime getLatestStudyTimeByUserAndDate(@Param("userId") String userId, @Param("date") LocalDate date);

	List<StudyRankDto> getStudyRanking(int groupId, LocalDate date);
}
