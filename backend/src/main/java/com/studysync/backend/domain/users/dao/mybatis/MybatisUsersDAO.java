package com.studysync.backend.domain.users.dao.mybatis;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.users.dao.UsersDAO;
import com.studysync.backend.domain.users.model.Users;

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

	@Override
	public Users findById(String id) {
		return mapper.findById(id);
	}

	@Override
	public void updateUserNickname(String id, String nickname) {
		mapper.updateUserNickname(id, nickname);
	}
	
	
}
