package com.nuist.power;

import com.nuist.power.bean.UserType;
import com.nuist.power.mapper.UserPayInfoMapper;
import com.nuist.power.mapper.UserTypeMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class PowerWebApplicationTests {

    @Autowired
    UserPayInfoMapper userPayInfoMapper;

    @Autowired
    UserTypeMapper userTypeMapper;

    /**
     * 任务一: 计算用户的平均金额，和平均缴费次数
     */
    @Test
    void testMissionOne(){
        //平均缴费金额
        Double avgSal = userPayInfoMapper.getAvgSal();
        //平均缴费次数
        Double avgPayCount = userPayInfoMapper.getAvgPayCount();
        System.out.println("平均缴费金额、平均缴费次数");
        System.out.println(avgSal + "," + avgPayCount);

    }

    /**
     * 任务二：对每个居民客户的用电缴费情况按照上述四种居民客户类型进行归类，结果保存
     */
    @Test
    void testMissionTwo(){
        //计算平均缴费金额
        Double avgSal = userPayInfoMapper.getAvgSal();
        //计算平均缴费次数
        Double avgPayCount = userPayInfoMapper.getAvgPayCount();
        //进行分类操作
        List<UserType> allUserType = userTypeMapper.getAllUserType(avgSal, avgPayCount);
        allUserType.forEach(System.out::println);

    }
}
