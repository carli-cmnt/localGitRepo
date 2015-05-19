package com.minipark.parkserver.admin.system.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/test")
public class TestController
{
    private final Logger logger        = Logger.getLogger(getClass().getName());

    @RequestMapping(value = "/")
    public ModelAndView index() {
    	return new ModelAndView("test");
    }

}
