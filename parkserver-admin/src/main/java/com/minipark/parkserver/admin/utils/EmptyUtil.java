package com.minipark.parkserver.admin.utils;

import java.util.Collection;

public class EmptyUtil {

	public static boolean isEmpty(String str) {
		return str == null || str.length() == 0;
	}

	public static boolean isEmpty(Collection collection) {
		return collection == null || collection.size() == 0;
	}

	public static boolean isEmpty(Object[] array) {
		return array == null || array.length == 0;
	}

	public static boolean isEmpty(Object obj) {
		if (obj == null){
			return true;
		}
		else{
			return isEmpty(obj.toString());
		}
	}
}
