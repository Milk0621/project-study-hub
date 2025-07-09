package com.studysync.backend.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.studysync.backend.dao.UsersDAO;
import com.studysync.backend.model.Users;

public class UsersServiceImpl implements UsersService {
	
	private final UsersDAO usersDAO; // final으로 코드 안정성과 신뢰성 증가
	
	@Autowired
	public UsersServiceImpl(UsersDAO usersDAO) {
		this.usersDAO = usersDAO; // 생성자에서만 초기화 가능
	}
	
	@Override
	public int register(Users user) {
		return usersDAO.insertUser(user);
	}

	@Override
	public Users login(String id, String pw) {
		return usersDAO.findByIdAndPassword(id, pw);
	}

}
