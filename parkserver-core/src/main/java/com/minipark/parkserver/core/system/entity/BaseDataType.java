
package com.minipark.parkserver.core.system.entity;

import com.minipark.parkserver.core.entity.BaseEntity;


public class BaseDataType extends BaseEntity {

	private static final long serialVersionUID = -7285078257914510015L;

	private String code;
	
	private String oldCode;
	
	private String name;
	
	private String isValid;
	
	private String isDel;

	/**
	 * @return the oldCode
	 */
	public String getOldCode() {
		return oldCode;
	}

	/**
	 * @param oldCode the oldCode to set
	 */
	public void setOldCode(String oldCode) {
		this.oldCode = oldCode;
	}

	/**
	 * @return the isValid
	 */
	public String getIsValid() {
		return isValid;
	}

	/**
	 * @param isValid the isValid to set
	 */
	public void setIsValid(String isValid) {
		this.isValid = isValid;
	}

	/**
	 * @return the isDel
	 */
	public String getIsDel() {
		return isDel;
	}

	/**
	 * @param isDel the isDel to set
	 */
	public void setIsDel(String isDel) {
		this.isDel = isDel;
	}

	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @param code the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
}
