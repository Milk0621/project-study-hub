package com.studysync.backend.model;

import java.time.LocalDateTime;

public class Users {
	private String id;
	private String pw;
	private String nickname;
	private String email;
	private LocalDateTime createDate;
	
	public Users() {}
	
	public Users(String id, String pw, String nickname, String email, LocalDateTime createDate) {
		this.id = id;
		this.pw = pw;
		this.nickname = nickname;
		this.email = email;
		this.createDate = createDate;
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
	public LocalDateTime getCreateDate() {
		return createDate;
	}
	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}
	
}
