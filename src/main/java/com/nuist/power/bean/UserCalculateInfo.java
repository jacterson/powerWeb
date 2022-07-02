package com.nuist.power.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

/**
 * @author qianyutao
 * @create 2022-06-18-9:53
 * 对应数据库中的user_calculate_info表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCalculateInfo {
    //用户id
    private String userId;
    //用户缴费次数
    private Integer userPayCount;
    //用户平均缴费金额
    private Double userAvgPayMoney;
    //计算日期
    private String calculateDay;
    //用户类别
    private String userType;
}
