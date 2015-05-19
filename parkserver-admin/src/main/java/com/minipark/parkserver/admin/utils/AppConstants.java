/**
 * 
 */
package com.minipark.parkserver.admin.utils;

import java.util.ResourceBundle;

public class AppConstants {

	/**
	 * 常量
	 */
	public static ResourceBundle APP = ResourceBundle.getBundle("app");

	// 上传文件存放路径
	public static String  UPLOAD_FILE_PATH  =  APP.getString("UPLOAD_FILE_PATH");

	// 认证--允许所有登录的用户均可访问的路径
	public static String  SECURITY_PERMITALL  =  APP.getString("SECURITY_PERMITALL");
}
