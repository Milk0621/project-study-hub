package com.studysync.backend.dto;

public class GroupPasswordCheckDTO {
	private int isPrivate;
    private String password;
    
	public GroupPasswordCheckDTO(int isPrivate, String password) {
		this.isPrivate = isPrivate;
		this.password = password;
	}

	public int getIsPrivate() {
		return isPrivate;
	}

	public void setIsPrivate(int isPrivate) {
		this.isPrivate = isPrivate;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
}
