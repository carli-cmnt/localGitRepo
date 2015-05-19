package com.minipark.parkserver.admin.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {

    public static <T> String parseListToString(List<T> list) {
    	try {
    		ObjectMapper objectMapper = new ObjectMapper();
    		return objectMapper.writeValueAsString(list);
    	} catch (Exception e) {
    		return null;
    	}
    }

    public static Map parseMapFromString(String jsonStr) {
    	if (jsonStr == null || jsonStr.isEmpty()) {
    		return null;
    	}
    	try {
    		ObjectMapper objectMapper = new ObjectMapper();
    		Map map = objectMapper.readValue(jsonStr, Map.class);
    		return map;
    	} catch (Exception e) {
    		return null;
    	}
    }

    public static List parseListFromString(String jsonStr) {
    	if (jsonStr == null || jsonStr.isEmpty()) {
    		return null;
    	}
    	try {
    		ObjectMapper objectMapper = new ObjectMapper();
    		List list = objectMapper.readValue(jsonStr, List.class);
        	System.out.println(list.get(0).getClass().getName());
    		return list;
    	} catch (Exception e) {
    		return null;
    	}
    }

    public static void main(String[] args) {
    	JsonUtils tt = new JsonUtils();
    	List aa = new ArrayList();
    	Map map = new HashMap();
    	map.put("abc", "ttt");
    	aa.add(map);map = new HashMap();
    	map.put("asf", "12");
    	aa.add(map);
    	System.out.println(tt.parseListToString(aa));
    	System.out.println(tt.parseListFromString("[{\"abc\":\"ttt\"},{\"asf\":\"12\"}]"));
    	
    }
}
