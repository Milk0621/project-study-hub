package com.studysync.backend.domain.studytime.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class StudyTime {
	private int id;
	private String userId;
	private LocalDate date;
	private int seconds;
	private LocalDateTime createdAt;
	
	public StudyTime() {}
	
	public StudyTime(int id, String userId, LocalDate date, int seconds, LocalDateTime createdAt) {
		this.id = id;
		this.userId = userId;
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
