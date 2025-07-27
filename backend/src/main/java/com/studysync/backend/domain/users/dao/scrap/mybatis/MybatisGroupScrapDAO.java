package com.studysync.backend.domain.users.dao.scrap.mybatis;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.users.model.Groups;
import com.studysync.backend.domain.users.dao.scrap.GroupScrapDAO;

@Repository
public class MybatisGroupScrapDAO implements GroupScrapDAO{
	
	private GroupScrapDAO mapper;

    public MybatisGroupScrapDAO(SqlSession sqlSession) {
    	mapper = sqlSession.getMapper(GroupScrapDAO.class);
    }

	@Override
	public List<Long> selectScrapIds(String userId) {
		return mapper.selectScrapIds(userId);
	}

	@Override
	public List<Groups> selectScrapList(String userId) {
		return mapper.selectScrapList(userId);
	}	
}
