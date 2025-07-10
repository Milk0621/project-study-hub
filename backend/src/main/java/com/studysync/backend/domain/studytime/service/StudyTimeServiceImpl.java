package com.studysync.backend.domain.studytime.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studysync.backend.domain.studytime.dao.StudyTimeDAO;
import com.studysync.backend.domain.studytime.model.StudyTime;

@Service
public class StudyTimeServiceImpl implements StudyTimeService{

	private final StudyTimeDAO studyTimeDAO;
	
	@Autowired
	public StudyTimeServiceImpl(StudyTimeDAO studyTimeDAO) {
		this.studyTimeDAO = studyTimeDAO;
	}

	@Override
	public int recordStudyTime(StudyTime studyTime) {
		return studyTimeDAO.upsertStudyTime(studyTime);
	}

	@Override
	public StudyTime loadLastStudyEntry(String userId, LocalDate date) {
		return studyTimeDAO.getLatestStudyTimeByUserAndDate(userId, date);
	}

}
