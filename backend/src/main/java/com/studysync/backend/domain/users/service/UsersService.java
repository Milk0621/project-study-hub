package com.studysync.backend.domain.users.service;

import com.studysync.backend.domain.users.model.Users;

public interface UsersService {
	int register(Users user);
	Users login(String id, String pw);
	Users findById(String id);
	void changeNickname(String id, String nickname);
}
