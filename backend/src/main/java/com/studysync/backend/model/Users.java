package com.studysync.backend.model;

import java.time.LocalDateTime;

public class Users {
	private String id;
	private String pw;
	private String nickname;
	private String email;
	private LocalDateTime createdAt;
	
	public Users() {}
	
	public Users(String id, String pw, String nickname, String email, LocalDateTime createdAt) {
		this.id = id;
		this.pw = pw;
		this.nickname = nickname;
		this.email = email;
		this.createdAt = createdAt;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
}
