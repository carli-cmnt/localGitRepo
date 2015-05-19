/**
 * 
 */
package com.minipark.parkserver.core.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * @author ZHANGJH
 * @since 2013-9-3
 */
public class BaseEntity implements Serializable{
	
	/**
	 * 主键
	 */
	private String id;
	
	/**
	 * 数据所属的ORGID
	 */
	private String orgRootId;
	
	/**
	 * 创建人ID
	 */
	private String createUserId;
	
	/**
	 * 创建人姓名
	 */
	private String createUserName;
	/**
	 * 创建时间
	 */
	private Date createDate;
	/**
	 * 修改人ID
	 */
	private String lastUpdateUserId;
	/**
	 * 修改人姓名
	 */
	private String lastUpdateUserName;
	/**
	 * 修改时间
	 */
	private Date lastUpdateDate;

	/**
	 * 主键
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id 主键
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return 创建者
	 */
	public String getCreateUserId() {
		return createUserId;
	}

	/**
	 * @param createUserId 创建者
	 */
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getLastUpdateUserId() {
		return lastUpdateUserId;
	}

	public void setLastUpdateUserId(String lastUpdateUserId) {
		this.lastUpdateUserId = lastUpdateUserId;
	}

	public String getLastUpdateUserName() {
		return lastUpdateUserName;
	}

	public void setLastUpdateUserName(String lastUpdateUserName) {
		this.lastUpdateUserName = lastUpdateUserName;
	}

	public Date getLastUpdateDate() {
		return lastUpdateDate;
	}

	public void setLastUpdateDate(Date lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}

	/**
	 * @return the orgRootId
	 */
	public String getOrgRootId() {
		return orgRootId;
	}

	/**
	 * @param orgRootId the orgRootId to set
	 */
	public void setOrgRootId(String orgRootId) {
		this.orgRootId = orgRootId;
	}
}
