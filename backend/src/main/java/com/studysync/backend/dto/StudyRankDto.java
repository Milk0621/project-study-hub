package com.studysync.backend.dto;

public class StudyRankDto {
	private String nickname;
    private int studyTime;
    
    public StudyRankDto() {}
    
	public StudyRankDto(String nickname, int studyTime) {
		this.nickname = nickname;
		this.studyTime = studyTime;
	}

	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public int getStudyTime() {
		return studyTime;
	}
	public void setStudyTime(int studyTime) {
		this.studyTime = studyTime;
	}
}
