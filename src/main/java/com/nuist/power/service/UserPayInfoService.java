package com.nuist.power.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.nuist.power.bean.UserPayInfo;


import java.util.List;
import java.util.Map;

/**
 * @author qianyutao
 * @create 2022-06-10-10:25
 */
public interface UserPayInfoService extends IService<UserPayInfo> {

    /**
     * 根据用户id将所有结果进行分组，每个用户为一组，然后每一组里面包括用户一年的所有信息
     * 使用Map来进行存储，map中key存储的是userid,value存储的是list列表，表示每个用户的所有月份的值
     */
    public Map<String,List<UserPayInfo>> getAllUserPayInfoToMap(List<UserPayInfo> userPayRecord);

    /**
     * 将所有用户原始就算出来的数据，转换成userid,[12个月的数值]
     */
    public Map<String,List<Double>> convertUserMapDataToPredictData(Map<String, List<UserPayInfo>> userInitData);

    /**
     * 将预测之后的double数组,进行求平均值的操作
     */

    public double getPredictAvgNum(double[] betterforecast);

}
