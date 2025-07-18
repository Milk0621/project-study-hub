package com.studysync.backend.domain.groupscrap.model;

import java.time.LocalDateTime;

public class GroupScrap {
	private int id;
	private String userId;
	private int groupId;
	private LocalDateTime scrapDate;
	
	public GroupScrap() {}
	
	public GroupScrap(int id, String userId, int groupId, LocalDateTime scrapDate) {
		super();
		this.id = id;
		this.userId = userId;
		this.groupId = groupId;
		this.scrapDate = scrapDate;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	public LocalDateTime getScrapDate() {
		return scrapDate;
	}
	public void setScrapDate(LocalDateTime scrapDate) {
		this.scrapDate = scrapDate;
	}
}
