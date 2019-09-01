// ==UserScript==
// @name         SZUCourseRogue
// @namespace    https://github.com/zzilch/SZUCourseRogue
// @version      0.5
// @description  A script for SZU course selecting.
// @author       zzilch
// @match        http://210.39.12.30/xsxkapp/sys/xsxkapp/*default/*
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function () {
    'use strict';
    // infos
    var studentInfo = JSON.parse(sessionStorage['studentInfo'])
    console.log(`
    使用说明：（暂不支持带实验课的课程）
    showDataList():显示当前待抢课程列表
    setDeltaTime(time):设置抢课间隔(ms)
    includeData(tcId):查询课程是否再列表中
    addData(tcId[,tcType]):设置待抢课程，tcId为教学班ID，tcType为课程类型，默认自动获取
    removeData(tcId):删除课程
    clearData():清空课程列表
    syncData():将课程列表保存到本地
    getTeachingClassCapacity(tcId):查询课程剩余位置
    startRogue():开始抢课
    stopRogue():停止抢课
    `);

    // data
    var dataList = GM_getValue('dataList', [])
    var deltaTime = GM_getValue('deltaTime', 1000);
    var stop = true;

    function showDataList(){
        for(let i=0;i<dataList.length;i++)
            console.log('tcId: '+dataList[i][0]+', tcType: '+dataList[i][1]);
    }
    unsafeWindow.showDataList = showDataList

    function setDeltaTime(time) {
        deltaTime = Math.max(time, 0);
        GM_setValue('deltaTime', deltaTime);
    }
    unsafeWindow.setDeltaTime = setDeltaTime;

    function includeData(tcId) {
        return dataList.find(x => x[0] === tcId);
    }
    unsafeWindow.includeData = includeData;

    function clearData() {
        GM_deleteValue('dataList');
        dataList = [];
    }
    unsafeWindow.clearData = clearData;

    function addData(tcId, tcType) {
        if (includeData(tcId)) return;
        if (tcType == null) tcType = sessionStorage.getItem("teachingClassType");
        dataList.push([tcId,tcType]);
        GM_setValue('dataList', dataList);
    }
    unsafeWindow.addData = addData;

    function removeData(tcId) {
        if (!includeData(tcId)) return;
        dataList = dataList.filter(x => x[0] !== tcId);
        GM_setValue('dataList', dataList);
    }
    unsafeWindow.removeData = removeData;

    function syncData() {
        GM_setValue('dataList', dataList);
    }
    unsafeWindow.syncData = syncData;

    // hooks

    // handlers
    async function getTeachingClassCapacity(tcId) {
        let currentBatch = JSON.parse(sessionStorage.getItem('currentBatch'));
        let batchCode = currentBatch.code;
        let resp = await queryTeachingClassCapacity(tcId, batchCode);
        let code = resp.code;
        if (code != null && code == '1') {
            let capacity = resp.data;
            if ( capacity.mainClassCapacity !== '0') {
                return parseInt(capacity.mainClassCapacity) - parseInt(capacity.mainElectiveNumber);
            } else {
                return parseInt(capacity.nonMainClassCapacity) - parseInt(capacity.nonMainElectiveNumber);
            }
        } else {
            return -1;
        }
    }
    unsafeWindow.getTeachingClassCapacity = getTeachingClassCapacity;

    function rogueRepeatedly(data) {
        async function rogueOnce(data) {
            if (stop) {
                clearInterval(interval);
                return;
            }
            let capacity = await getTeachingClassCapacity(data[0]);
            if (capacity > 0) {
                let addParam = buildAddVolunteerParam(data[0]);
                addParam.addParam = addParam.addParam.replace(/("teachingClassType":")(.*)("}})/,'$1'+data[1]+'$3');
                let resp = await addVolunteer(addParam);
                let code = resp.code;
                if (code != null && code == '1') {
                    clearInterval(interval);
                    console.log(data[0] + ': success');
                } else {
                    console.log(data[0] + ': fail, ' + resp.msg);
                }
            } else {
                console.log(data[0] + ': fail, capacity=' + capacity.toString());
            }
        }
        var interval = setInterval(rogueOnce, deltaTime, data);
    }

    function startRogue() {
        if (stop == false) return;
        stop = false;
        for (let i = 0; i < dataList.length; i++) {
            rogueRepeatedly(dataList[i]);
        }
    }
    unsafeWindow.startRogue = startRogue;

    function stopRogue() {
        stop = true;
    }
    unsafeWindow.stopRogue = stopRogue;
})();