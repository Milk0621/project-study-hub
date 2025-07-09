package com.studysync.backend.domain.studytime.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;

import com.studysync.backend.domain.studytime.dao.StudyTimeDAO;
import com.studysync.backend.domain.studytime.model.StudyTime;

public class StudyTimeServiceImpl implements StudyTimeService{

	private final StudyTimeDAO studyTimeDAO;
	
	@Autowired
	public StudyTimeServiceImpl(StudyTimeDAO studyTimeDAO) {
		this.studyTimeDAO = studyTimeDAO;
	}

	@Override
	public int recordStudyTime(StudyTime studyTime) {
		return studyTimeDAO.insertStudyTime(studyTime);
	}

	@Override
	public StudyTime loadLastStudyEntry(String userId, LocalDate date) {
		return studyTimeDAO.getLatestStudyTimeByUserAndDate(userId, date);
	}

}
