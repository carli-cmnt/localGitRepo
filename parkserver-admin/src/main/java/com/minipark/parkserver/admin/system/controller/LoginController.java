package com.minipark.parkserver.admin.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.minipark.parkserver.admin.user.service.UserService;

@RequestMapping("/")
@Controller
public class LoginController
{
    @Autowired
    UserService serService = null;

    @RequestMapping("/web_login")
    public ModelAndView webLogin() {
    	ModelAndView view = new ModelAndView("login");
        return view;
    }

    @RequestMapping("/login")
    @ResponseBody
    public String login(String error) {
        if (error != null && !error.isEmpty()) {
        	return "Login Error!!";
        }
        return "Need Login";
    }

    @RequestMapping("/denied")
    @ResponseBody
    public String denied() {
        return "Access denied!";
    }

    @RequestMapping("/timeout")
    @ResponseBody
    public String timeout()
    {
        
        return "timeout";
    }

    @RequestMapping("/welcome")
    @ResponseBody
    public ModelAndView welcome()
    {
		return new ModelAndView("system/index/welcome");
    }

    @RequestMapping("/logout")
    @ResponseBody
    public String logout()
    {
        
        return "logout!";
    }
    
}
