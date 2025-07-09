package com.studysync.backend.domain.studytime.service;

import java.time.LocalDate;

import com.studysync.backend.domain.studytime.model.StudyTime;

public interface StudyTimeService {
	int recordStudyTime(StudyTime studyTime);
	StudyTime loadLastStudyEntry(String userId, LocalDate date);
}
