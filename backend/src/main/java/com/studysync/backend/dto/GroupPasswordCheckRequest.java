package com.studysync.backend.dto;

public class GroupPasswordCheckRequest {
	private Long groupId;
    private String password;
    
	public GroupPasswordCheckRequest(Long groupId, String password) {
		this.groupId = groupId;
		this.password = password;
	}
	
	public Long getGroupId() {
		return groupId;
	}
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    
}
