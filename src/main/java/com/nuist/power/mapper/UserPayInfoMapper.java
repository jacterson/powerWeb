package com.nuist.power.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.nuist.power.bean.UserPayInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author qianyutao
 * @create 2022-06-06-10:00
 */
@Mapper
public interface UserPayInfoMapper extends BaseMapper<UserPayInfo> {



    /**
     * 获取所有用户
     */
    public List<UserPayInfo> findAllUser();

    /**
     * 计算所有用户的缴费金额
     */
    public Double getAllUserTotalPayMoney();

    /**
     * 计算所有用户的平均金额
     */
    public Double getAvgSal();

    /**
     * 计算该用户的总缴费金额
     */
    public Double getUserTotalPayMoney(@Param("userId")String userId);

    /**
     * 计算所有用户的平均缴费次数
     */
    public Double getAvgPayCount();

    /**
     * 计算该用户的缴费次数
     */
    public Integer getSingleUserPayCount(@Param("userId") String userId);

    /**
     * 计算该用户的平均缴费金额
     */
    public Double getSingleUserAvgPayMoney(@Param("userId") String userId);

//    public List getAllUserType(@Param("avgSal") Double avgSal, @Param("avgCount") Double avgCount);

    /**
     * 根据用户id来分组查询出用户的记录
     */
    public List<UserPayInfo> getUserPayListGroupByUserId();

    /**
     * 计算出所有的用户id
     */
    public List<String> getAllUserIds();

    /**
     * 根据用户id来查询用户的最高缴费金额
     */
    public Double getUserMaxPayMoney(@Param("userId") String userId);

    /**
     * 根据用户id来查询用户的最低缴费金额
     */
    public Double getUserMinPayMoney(@Param("userId") String userId);
}
