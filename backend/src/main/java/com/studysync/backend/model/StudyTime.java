package com.studysync.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class StudyTime {
	private int id;
	private String userId;
	private int groupId;
	private LocalDate date;
	private int seconds;
	private LocalDateTime createdAt;
	
	public StudyTime() {}
	
	public StudyTime(int id, String userId, int groupId, LocalDate date, int seconds, LocalDateTime createdAt) {
		this.id = id;
		this.userId = userId;
		this.groupId = groupId;
		this.date = date;
		this.seconds = seconds;
		this.createdAt = createdAt;
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
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public int getSeconds() {
		return seconds;
	}
	public void setSeconds(int seconds) {
		this.seconds = seconds;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
}
