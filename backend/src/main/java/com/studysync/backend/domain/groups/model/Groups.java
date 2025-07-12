package com.studysync.backend.domain.groups.model;

import java.time.LocalDateTime;

public class Groups {
	private int id;
	private String groupName;
	private String content;
	private String tag;
	private String createUser;
	private LocalDateTime createDate;
	private int isPrivate;
	private String password;
	private int hit;

	public Groups() {}
	
	public Groups(int id, String groupName, String content, String tag, String createUser, LocalDateTime createDate,
			int isPrivate, String password, int hit) {
		super();
		this.id = id;
		this.groupName = groupName;
		this.content = content;
		this.tag = tag;
		this.createUser = createUser;
		this.createDate = createDate;
		this.isPrivate = isPrivate;
		this.password = password;
		this.hit = hit;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
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

	public int getHit() {
		return hit;
	}

	public void setHit(int hit) {
		this.hit = hit;
	}
	
}
