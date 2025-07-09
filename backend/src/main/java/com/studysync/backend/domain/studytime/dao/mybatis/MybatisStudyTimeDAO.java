package com.studysync.backend.domain.studytime.dao.mybatis;

import java.time.LocalDate;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.studytime.dao.StudyTimeDAO;
import com.studysync.backend.domain.studytime.model.StudyTime;

@Repository
public class MybatisStudyTimeDAO implements StudyTimeDAO{
	
	private StudyTimeDAO mapper;
	
	public MybatisStudyTimeDAO(SqlSession sqlSession) {
		mapper = sqlSession.getMapper(StudyTimeDAO.class);
	}

	@Override
	public int insertStudyTime(StudyTime studyTime) {
		return mapper.insertStudyTime(studyTime);
	}

	@Override
	public StudyTime getLatestStudyTimeByUserAndDate(String userId, LocalDate date) {
		return mapper.getLatestStudyTimeByUserAndDate(userId, date);
	}

}
