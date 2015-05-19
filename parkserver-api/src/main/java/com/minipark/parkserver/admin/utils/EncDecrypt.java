package com.minipark.parkserver.admin.utils;

import java.nio.charset.Charset;

public class EncDecrypt {
	private static final String key0 = "BBBECOIDHDDMNCXZPyuyuuy";  
	   private static final Charset charset = Charset.forName("UTF-8");  
	    private static byte[] keyBytes = key0.getBytes(charset);  
	      
	    public static String encode(String enc){  
	        byte[] b = enc.getBytes(charset);  
	   	       for(int i=0,size=b.length;i<size;i++){  
	   	            for(byte keyBytes0:keyBytes){  
	   	                b[i] = (byte) (b[i]^keyBytes0);  
	   	            }  
	   	            } 
	   	      String key= new String(b);
	   	      char[]keys=key.toCharArray();
	   	      for(int i=0;i<keys.length;i++){
	   	    	  if(keys[i]=='}'){
	   	    		 keys[i]='~'; 
	   	    	  }
	   	    	  if(keys[i]=='&'){
	   	    		  keys[i]='-';
	   	    	  }
	   	    	 if(keys[i]=='?'){
	   	    		  keys[i]='.';
	   	    	  }
	   	    	if(keys[i]=='\''){
	   	    		  keys[i]='|';
	   	    	  }
	   	    	if(keys[i]=='"'){
	   	    		  keys[i]='@';
	   	    	  }
	   	    	if(keys[i]=='`'){
	   	    		  keys[i]=',';
	   	    	  }
	   	      }
	        return new String(keys);  
	   	    }  
	   	      
	   	    public static String decode(String dec){
	   	     char[]keys=dec.toCharArray();
	   	      for(int i=0;i<keys.length;i++){
	   	    	  if(keys[i]=='~'){
	   	    		 keys[i]='}'; 
	   	    	  }
	   	    	  if(keys[i]=='-'){
	   	    		  keys[i]='&';
	   	    	  }
	   	    	 if(keys[i]=='.'){
	   	    		  keys[i]='?';
	   	    	  }
	   	    	if(keys[i]=='|'){
	   	    		  keys[i]='\'';
	   	    	  }
	   	    	if(keys[i]=='@'){
	   	    		  keys[i]='"';
	   	    	  }
	   	    	if(keys[i]==','){
	   	    		  keys[i]='`';
	   	    	  }
	   	      }
	   	    	String key=new String(keys);
	   	        byte[] e = key.getBytes(charset);  
	   	        byte[] dee = e;  
	   	        for(int i=0,size=e.length;i<size;i++){  
	   	            for(byte keyBytes0:keyBytes){  
	   	                e[i] = (byte) (dee[i]^keyBytes0);  
	            }  
	   	        }  
	   	        return new String(e);  
	   	    } 
}
