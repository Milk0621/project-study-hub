package com.studysync.backend.domain.groups.model;

import java.time.LocalDateTime;

public class GroupMembers {
	private int groupId;
	private String userId;
	private LocalDateTime joinedAt;
	
	public GroupMembers() {}
	
	public GroupMembers(int groupId, String userId) {
		this.groupId = groupId;
		this.userId = userId;
	}
	
	public GroupMembers(int groupId, String userId, LocalDateTime joinedAt) {
		this.groupId = groupId;
		this.userId = userId;
		this.joinedAt = joinedAt;
	}

	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public LocalDateTime getJoinedAt() {
		return joinedAt;
	}
	public void setJoinedAt(LocalDateTime joinedAt) {
		this.joinedAt = joinedAt;
	}
	
	
}
