package com.studysync.backend.domain.groupmembers.dao.mybatis;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.groupmembers.dao.GroupMembersDAO;
import com.studysync.backend.domain.groupmembers.model.GroupMembers;

@Repository
public class MybatisGroupMembersDAO implements GroupMembersDAO{
	
	private GroupMembersDAO mapper;
	
	public MybatisGroupMembersDAO(SqlSession sqlSession) {
		mapper = sqlSession.getMapper(GroupMembersDAO.class);
	}

	@Override
	public int insertGroupMem(GroupMembers groupMembers) {
		return mapper.insertGroupMem(groupMembers);
	}
	
}
