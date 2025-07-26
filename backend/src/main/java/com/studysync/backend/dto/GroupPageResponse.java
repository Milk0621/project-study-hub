package com.studysync.backend.dto;

import java.util.List;

import com.studysync.backend.domain.groups.model.Groups;

public class GroupPageResponse {
	private List<Groups> groups;
    private int totalPages;
    private int currentPage;
    
    public GroupPageResponse() {}
	public GroupPageResponse(List<Groups> groups, int totalPages, int currentPage) {
		super();
		this.groups = groups;
		this.totalPages = totalPages;
		this.currentPage = currentPage;
	}
	
	public List<Groups> getGroups() {
		return groups;
	}
	public void setGroups(List<Groups> groups) {
		this.groups = groups;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
    
}
