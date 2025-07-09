package com.studysync.backend.domain.studytime.dao;

import java.time.LocalDate;

import org.apache.ibatis.annotations.Param;

import com.studysync.backend.domain.studytime.model.StudyTime;

public interface StudyTimeDAO {
	//공부시간 기록
	int insertStudyTime(StudyTime studyTime);
	
	//공부시간 날짜별 조회
	StudyTime getLatestStudyTimeByUserAndDate(@Param("userId") String userId, @Param("date") LocalDate date);
}
