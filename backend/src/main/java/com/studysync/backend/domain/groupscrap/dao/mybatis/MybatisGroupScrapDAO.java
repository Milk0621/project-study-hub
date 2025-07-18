package com.studysync.backend.domain.groupscrap.dao.mybatis;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.groupscrap.dao.GroupScrapDAO;

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
}
