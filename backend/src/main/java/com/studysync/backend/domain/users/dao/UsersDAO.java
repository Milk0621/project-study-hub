package com.studysync.backend.domain.users.dao;

import org.apache.ibatis.annotations.Param;

import com.studysync.backend.domain.users.model.Users;

public interface UsersDAO {
	// 회원가입
	int insertUser(Users users);
	
	// 로그인
	Users findByIdAndPassword(@Param("id") String id, @Param("pw") String pw);
	
	// 유저 아이디 조회
	Users findById(String id);
	
	// 유저 닉네임 변경
	void updateUserNickname(@Param("id") String id, @Param("nickname") String nickname);
}
