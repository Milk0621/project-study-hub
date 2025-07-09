package com.studysync.backend.dao.mybatis;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.dao.UsersDAO;
import com.studysync.backend.model.Users;

@Repository
public class MybatisUsersDAO implements UsersDAO {
	
	private UsersDAO mapper;
	
	public MybatisUsersDAO(SqlSession sqlSession) {
		mapper = sqlSession.getMapper(UsersDAO.class);
	}

	@Override
	public int insertUser(Users users) {
		return mapper.insertUser(users);
	}

	@Override
	public Users findByIdAndPassword(String id, String pw) {
		return mapper.findByIdAndPassword(id, pw);
	}
	
	
}
