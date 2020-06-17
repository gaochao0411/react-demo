const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
function Phone(){
    const numArray = new Array("139","138","137","136","135","134","159",
    "158","157","150","151","152","188","187","182","183","184",
    "178","130","131","132","156","155","186","185","176",
    "133","153","189","180","181","177");   
    const index = Random.integer(0,numArray.length-1);
    const str = numArray[index]+Random.natural(10000000,100000000);
    return str;
}
//基金表格数据
const fundTableData = function() {
    const arr =[];
    for(let i=0;i<Random.integer(1,5);i++){
        const obj = {
            id:Random.string('number',9),//产品id
            fundChName:Random.csentence(2,4),
            fundEnName:Random.sentence(2,4),
            fundCode:Random.string('number',9),
            fundType:'私募',//类型
            currency:'美元',//货币
            fundManager:Random.cname(),//,//基金经理
            fundEmail:Random.email(),//基金邮箱
            fundMobile:Phone(),//基金电话
            trusteeAgency:Random.sentence(2,4),//托管机构
            fundCommunicationDate:Random.date(),//预定沟通日期
            fundProcessingCycle:Random.natural(1,30),//基金方处理周期T+
            effectiveFlag:'0',
        };
        arr.push(obj);
    }
    return { 
        status: 0,
        msg: "成功",
        body: {
            data:arr,
            current:Random.natural(1,5),
            pageSize:10,
            total:Random.natural(5,20),
        }
    }
}
const successData = {
    status: 0,
    msg: "成功",
    data: {},
 }


//基金产品配置
Mock.mock('http://localhost:3000/mock/login', 'post', successData);
Mock.mock('http://localhost:3000/mock/query', 'post', fundTableData);
