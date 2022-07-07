package com.nuist.power.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.nuist.power.bean.UserPayInfo;
import com.nuist.power.mapper.UserPayInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author qianyutao
 * @create 2022-06-10-10:24
 */
@Service
public class UserPayInfoServiceImpl extends ServiceImpl<UserPayInfoMapper, UserPayInfo> implements UserPayInfoService {


    @Autowired
    UserPayInfoMapper userPayInfoMapper;


    /**
     * 将查询出来的结果，按照用户id进行分类，
     * 返回的结果为Map<用户id,List列表里面对应该用户的所有查询结果></>
     *
     * @param userPayRecord
     * @return
     */
    @Override
    public Map<String, List<UserPayInfo>> getAllUserPayInfoToMap(List<UserPayInfo> userPayRecord) {
        //初始化第一个id的值,按照id进行分组操作
        String userIdInit = userPayRecord.get(0).getUserId();
        //新建一个存放结果的Map集合
        Map<String, List<UserPayInfo>> resultMap = new LinkedHashMap<>();
        //加入初始化的第一个元素
        List<UserPayInfo> initList = new ArrayList<UserPayInfo>();
        //控制else语句执行的变量
        boolean isFlag = false;

        //将所有的数据进行分组操作，记录放入到Map中去
        for (UserPayInfo userPayInfo : userPayRecord) {
            //如果userid相等的话，加入到列表中
            if (userPayInfo.getUserId().equals(userIdInit)) {
                initList.add(userPayInfo);
            } else {
                isFlag = true;
                //如果出现了新的用户id之后，要重新设置一下map的key值了

                if (isFlag) {
                    //先把原来的数据存储到map中去，然后重新设置一下userIdInit的值，并且初始话initList,
                    // 并且将这个else的控制标志置为false
                    resultMap.put(userIdInit, initList);
                    userIdInit = userPayInfo.getUserId();
                    initList = new ArrayList<UserPayInfo>();
                    initList.add(userPayInfo);
                    isFlag = false;
                }

            }
        }
        resultMap.put(userIdInit, initList);

        //全部完成之后，返回结果
        return resultMap;
    }


    /**
     * 将所有用户原始就算出来的数据，转换成userid,[12个月的数值]
     */
    public Map<String, List<Double>> convertUserMapDataToPredictData(Map<String, List<UserPayInfo>> userInitData) {

        //新建一个存储数据的map
        LinkedHashMap<String, List<Double>> resultMap = new LinkedHashMap<>();
        //格式化日期字符串的对象
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");

        //遍历map的值，取出id的值，和按日期顺序取出值
        Set<Map.Entry<String, List<UserPayInfo>>> entrySet = userInitData.entrySet();
        for (Map.Entry<String, List<UserPayInfo>> entry : entrySet) {

            String userid = entry.getKey();
            //开辟一个存储缴费金额的double数组
            List<Double> userPayNumList = new ArrayList<Double>();
            //一个个取出value的值

            int initDateNum = 201802;
            int dateAdd = 1;
            boolean isFlag = true;

            List<UserPayInfo> userInfos = entry.getValue();
            for (UserPayInfo userInfo : userInfos) {

                initDateNum += dateAdd;
                //日期超额之后进行转换操作
                if (initDateNum >= 201813 && isFlag) {
                    initDateNum = 201901;
                    isFlag = false;
                }
                //每次将日期转换
                Date payDate = userInfo.getPayDate();
                String formatDate = sdf.format(payDate);
                int formatDateNum = Integer.parseInt(formatDate);

                if (formatDateNum == initDateNum) {
                    userPayNumList.add(userInfo.getPayMoney());
                } else {
                    while (formatDateNum != initDateNum) {
                        userPayNumList.add(new Double(0));
                        initDateNum += dateAdd;
                        //日期超额之后进行转换操作
                        if (initDateNum >= 201813 && isFlag) {
                            initDateNum = 201901;
                            isFlag = false;
                        }
                        //判断日期是否相等
                        if (formatDateNum == initDateNum) {
                            userPayNumList.add(userInfo.getPayMoney());
                            break;
                        }

                    }

                }

            }
            //如果这个不满足13个月数值的话
            //补充数据至13个月
            int size = userPayNumList.size();
            if (size < 13) {
                //增加0的个数是14-size
                int count = 13 - size;
                for (int i = 0; i < count; i++) {
                    userPayNumList.add(new Double(0));
                }
            }
            //把最后一个元素取出
            userPayNumList.remove(userPayNumList.size() - 1);


            //加到到结果中去
            resultMap.put(userid, userPayNumList);
//            System.out.println("执行----完成一次");
        }
        return resultMap;
    }

    /**
     * 将预测之后的double数组,进行求平均值的操作
     */
    @Override
    public double getPredictAvgNum(double[] betterforecast) {

//        double max = betterforecast[0];
//        for (int i = 0; i < betterforecast.length; i++) {
//            if (!Double.isNaN(betterforecast[i]) && betterforecast[i] != 0.0) {
//                return betterforecast[i];
//            }
//        }
//        return 0;
//    }

        double sum = 0;
        int count = 0;
        for (int i = 0; i < betterforecast.length; i++) {
            if (!Double.isNaN(betterforecast[i]) && betterforecast[i] != 0) {
                sum += betterforecast[i];
                count++;
            }

        }
//        System.out.println("个数: " + count);
        sum = sum / count;
        return sum;
    }

    /**
     * 预测未来一年的金额
     */
    public double getFutureYearMoney(double[] betterforecast){
        //总金额
        double sum = 0;
        //个数
        int count = 0;
        for (int i = 0; i < betterforecast.length; i++) {
            if(!Double.isNaN(betterforecast[i])){
                sum += betterforecast[i];
                count ++;
            }
        }
        //返回一年的预测值
        return sum /count * 12;
    }

}
