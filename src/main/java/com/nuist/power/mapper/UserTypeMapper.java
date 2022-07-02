package com.nuist.power.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.nuist.power.bean.UserType;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author qianyutao
 * @create 2022-06-06-14:12
 */
@Mapper
public interface UserTypeMapper extends BaseMapper<UserType> {

    /**
     * @param avgMoney 所有用户平均缴费金额
     * @param userEveryCount 所有用户平均缴费次数
     * @return 由计算结果生成List列表
     */
    public List<UserType> getAllUserType(@Param("avgMoney") Double avgMoney,@Param("userEveryCount") Double userEveryCount);


    @MapKey("status")
    public Map<String,Integer> getUserStatusGroupCount();

    /**
     * 获取用户的类别
     */
   public String getUserType(@Param("userId") String userId);

    /**
     * 获取用户的排名，按照平均缴费金额排名
     */
    public int getUserRankByAvgPayMoney(@Param("userId") String userId);

    /**
     * 获取用户的排名，按照缴费总金额排名
     */
    public int getUserRankByTotalPayMoney(@Param("userId") String userId);
}
