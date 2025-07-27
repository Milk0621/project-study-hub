package com.studysync.backend.domain.groups.dao.scrap.mybatis;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.domain.groups.dao.scrap.GroupScrapDAO;

@Repository
public class MybatisGroupScrapDAO implements GroupScrapDAO{
	
	private GroupScrapDAO mapper;

    public MybatisGroupScrapDAO(SqlSession sqlSession) {
    	mapper = sqlSession.getMapper(GroupScrapDAO.class);
    }

    @Override
    public void deleteScrap(String userId, Long groupId) {
        mapper.deleteScrap(userId, groupId);
    }

	@Override
	public void addScrap(String userId, Long groupId) {
		mapper.addScrap(userId, groupId);
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
