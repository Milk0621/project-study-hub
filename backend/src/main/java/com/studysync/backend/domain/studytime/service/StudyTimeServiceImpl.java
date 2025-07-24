package com.studysync.backend.domain.studytime.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studysync.backend.domain.studytime.dao.StudyTimeDAO;
import com.studysync.backend.domain.studytime.model.StudyTime;
import com.studysync.backend.dto.StudyRankDto;

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

	@Override
	public List<StudyRankDto> getStudyRanking(int groupId, LocalDate date) {
		return studyTimeDAO.getStudyRanking(groupId, date);
	}

	@Override
	public Map<String, Integer> getGroupTopStudyTimeByDate(int groupId) {
		List<Map<String, Object>> rawList = studyTimeDAO.getMaxStudyTimeByDateInGroup(groupId);
//		[{ "date": "2025-07-20", "max_seconds": 7200 },
//		  { "date": "2025-07-21", "max_seconds": 3600 }]
		Map<String, Integer> result = new HashMap<>();

        for (Map<String, Object> row : rawList) {
            String date = row.get("date").toString(); // "2025-07-21"
            int seconds = Integer.parseInt(row.get("max_seconds").toString());
            result.put(date, seconds);
        }

        return result;
	}

	@Override
	public Map<String, Integer> getMyStudyTimes(String userId) {
		List<Map<String, Object>> rawList = studyTimeDAO.getMyStudyTimes(userId);
		Map<String, Integer> result = new HashMap<>();
		
		for (Map<String, Object> row : rawList) {
            String date = row.get("date").toString(); // "2025-07-21"
            int seconds = Integer.parseInt(row.get("seconds").toString());
            result.put(date, seconds);
        }
		
		return result;
	}

}
