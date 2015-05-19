package com.minipark.parkserver.core.system.entity;

import java.util.Date;

public class AuCity {

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrgRootId() {
		return orgRootId;
	}

	public void setOrgRootId(String orgRootId) {
		this.orgRootId = orgRootId;
	}

	public String getCreateUserId() {
		return createUserId;
	}

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

	private String cityCode;

    private String cityName;
    private String cityPinyin;

    private String cityType;

    private String superCityId;
    
    private String hasChild;

	private String isValid;

    private String isDel;

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode == null ? null : cityCode.trim();
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName == null ? null : cityName.trim();
    }

    public String getCityType() {
        return cityType;
    }

    public void setCityType(String cityType) {
        this.cityType = cityType == null ? null : cityType.trim();
    }

    public String getSuperCityId() {
        return superCityId;
    }

    public void setSuperCityId(String superCityId) {
        this.superCityId = superCityId == null ? null : superCityId.trim();
    }

    public String getHasChild() {
		return hasChild;
	}

	public void setHasChild(String hasChild) {
		this.hasChild = hasChild;
	}
	
    public String getIsValid() {
        return isValid;
    }

    public void setIsValid(String isValid) {
        this.isValid = isValid == null ? null : isValid.trim();
    }

    public String getIsDel() {
        return isDel;
    }

    public void setIsDel(String isDel) {
        this.isDel = isDel == null ? null : isDel.trim();
    }

	public String getCityPinyin() {
		return cityPinyin;
	}

	public void setCityPinyin(String cityPinyin) {
		this.cityPinyin = cityPinyin;
	}

}