package com.studysync.backend.domain.groups.dao.member.mybatis;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.groups.dao.member.GroupMembersDAO;
import com.studysync.backend.domain.groups.model.GroupMembers;

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

	@Override
	public GroupMembers selectGroupMemOne(int groupId, String userId) {
		return mapper.selectGroupMemOne(groupId, userId);
	}
	
}
