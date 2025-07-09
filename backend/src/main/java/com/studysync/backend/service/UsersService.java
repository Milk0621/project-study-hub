package com.studysync.backend.service;

import com.studysync.backend.model.Users;

public interface UsersService {
	int register(Users user);
	Users login(String id, String pw);
}
