/**
*开发单位：中疗科技 
*版权：中疗科技
*@author：clevycorn@cmnt.com
*@since： JDK1.6
*@version：1.0
*@date：2014-9-21 下午4:08:15
*/ 

package com.minipark.parkserver.core.system.entity;

import com.minipark.parkserver.core.entity.BaseEntity;

/**
 * @ClassName: DdBaseDataItem
 * @Description: 数据字典项目
 * @author clevycorn@cmnt.com
 * @date 2014-9-21 下午4:08:15
 *
 */
public class BaseDataItem extends BaseEntity {

	private static final long serialVersionUID = 6181966753575580975L;

	private String code;
	
	private String name;
	
	private String typeCode;
	
	private String typeId;
	
	private Integer seqNo;
	
	private String description;
	
	private String isValid;
	
	private String isDel;

	/**
	 * @return the typeCode
	 */
	public String getTypeCode() {
		return typeCode;
	}

	/**
	 * @param typeCode the typeCode to set
	 */
	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	/**
	 * @return the typeId
	 */
	public String getTypeId() {
		return typeId;
	}

	/**
	 * @param typeId the typeId to set
	 */
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	/**
	 * @return the seqNo
	 */
	public Integer getSeqNo() {
		return seqNo;
	}

	/**
	 * @param seqNo the seqNo to set
	 */
	public void setSeqNo(Integer seqNo) {
		this.seqNo = seqNo;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
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
