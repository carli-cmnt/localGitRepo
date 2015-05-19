package com.minipark.parkserver.admin.utils.exception;

public class TreeUtilsException extends Exception {

	private static final long serialVersionUID = 1787789132268338188L;

	public TreeUtilsException() {
        super();
    }
    
    public TreeUtilsException(String msg) {
        super(msg);
    }
    
    public TreeUtilsException(String msg, Throwable cause) {
        super(msg, cause);
    }
    
    public TreeUtilsException(Throwable cause) {
        super(cause);
    }
}
