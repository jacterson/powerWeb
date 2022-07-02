package com.nuist.power.bean;

import lombok.Data;

import java.sql.Date;

/**
 * @author qianyutao
 * @create 2022-06-06-9:56
 */
@Data
public class UserPayInfo {
    private String userId;
    private Date payDate;
    private Double payMoney;
}
