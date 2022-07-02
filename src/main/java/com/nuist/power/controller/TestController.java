package com.nuist.power.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author qianyutao
 * @create 2022-07-02-18:47
 */
@Controller
public class TestController {
    @GetMapping("/")
    public String hello(){
        return "page/index";
    }
}
