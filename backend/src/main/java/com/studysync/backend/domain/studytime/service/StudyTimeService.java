package com.studysync.backend.domain.studytime.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.studysync.backend.domain.studytime.model.StudyTime;
import com.studysync.backend.dto.StudyRankDto;

public interface StudyTimeService {
	int recordStudyTime(StudyTime studyTime);
	StudyTime loadLastStudyEntry(String userId, LocalDate date);
	List<StudyRankDto> getStudyRanking(int groupId, LocalDate date);
	Map<String, Integer> getGroupTopStudyTimeByDate(int groupId);
	Map<String, Integer> getMyStudyTimes(String userId);
}
