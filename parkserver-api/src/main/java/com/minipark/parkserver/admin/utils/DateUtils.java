package com.minipark.parkserver.admin.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateUtils {

    public static Date parseFromStr(String src, String patten) {
        if(patten == null){
            patten = "yyyy-MM-dd";
        }
        SimpleDateFormat sdf = new SimpleDateFormat(patten);
        try {
            return sdf.parse(src);
            
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    
	public static String getStandardDate(String completeDate,String patten) {
		String nowtime = "";
		if(patten == null){
            patten = "yyyy-MM-dd";
        }
		try {
			SimpleDateFormat ch = new SimpleDateFormat(patten);
			nowtime = ch.format(ch.parse(completeDate));
		} catch (Exception ex) {
		}

		return nowtime;
	}
    
    public static String getCurrentDate(String patten) {
        if(patten == null){
            patten = "yyyy-MM-dd";
        }
        SimpleDateFormat sdf = new SimpleDateFormat(patten);
        return sdf.format(new Date());
    }
    
    public static Date addDate(Date date, int num) {
        return new Date(date.getTime() + num * (long) 24 * 3600 * 1000);
    }

    public static Date minusDate(Date date, int num) {
        return new Date(date.getTime() - num * (long) 24 * 3600 * 1000);
    }

    public static void main(String[] args) {

    }

}
