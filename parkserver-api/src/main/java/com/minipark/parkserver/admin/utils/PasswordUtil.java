package com.minipark.parkserver.admin.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
public class PasswordUtil {
	private final static String[] hexDigits = { "0", "1", "2", "3", "4", "5",
		"6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };
	private static String byteArrayToHexString(byte[] byteArray){
		StringBuffer sb = new StringBuffer();
		for(byte byt:byteArray){
			sb.append(byteToHexString(byt));
		}
		return sb.toString();
	}

	private static String byteToHexString(byte byt) {
		int n = byt;
		if (n < 0)
			n = 256 + n;
		return hexDigits[n/16] + hexDigits[n%16];
	}

	private static String encode(String code,String message){
		MessageDigest md;
		String encode = null;
		try {
			md = MessageDigest.getInstance(code);
			encode = byteArrayToHexString(md.digest(message
					.getBytes()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return encode;
	}

	public static String md5Encode(String message){
		return encode("MD5",message);
	}

	public static String shaEncode(String message){
		return encode("SHA",message);
	}

	public static String sha256Encode(String message){
		return encode("SHA-256",message);
	}

	public static String sha512Encode(String message){
		return encode("SHA-512",message);
	}

	@SuppressWarnings("unused")
	private String validate(String code,String tag){
		if(code.equals(tag))
			return "";
		return "";
	}
}
