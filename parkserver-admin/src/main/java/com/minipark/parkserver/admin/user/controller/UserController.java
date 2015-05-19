package com.minipark.parkserver.admin.user.controller;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.minipark.parkserver.admin.user.service.UserService;
import com.minipark.parkserver.core.user.entity.LoginUser;

@RequestMapping("/user")
@Controller
public class UserController
{
    @Autowired
    private UserService serService;

    @RequestMapping("/list")
    @ResponseBody
    public String list() throws IllegalAccessException, InvocationTargetException, IntrospectionException
    {
    	LoginUser user = new LoginUser();
    	List<LoginUser> list = serService.selectWithPage(user, 0, 1);
        return list.toString();
    }

}
