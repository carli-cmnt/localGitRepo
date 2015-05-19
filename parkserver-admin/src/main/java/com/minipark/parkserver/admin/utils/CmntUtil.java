package com.minipark.parkserver.admin.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

public class CmntUtil {
	public static String urlDecodeDouble(String strUrlParam){
		try {
			strUrlParam = URLDecoder.decode(URLDecoder.decode(strUrlParam,"UTF-8"),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "{" + strUrlParam + "}";
	}
	
	public static String urlDecodeSingle(String strUrlParam){
		try {
			strUrlParam = URLDecoder.decode(URLDecoder.decode(strUrlParam,"UTF-8"),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "{" + strUrlParam + "}";
	}
}
