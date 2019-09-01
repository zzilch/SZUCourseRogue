// ==UserScript==
// @name         SZUCourseRogue
// @namespace    https://github.com/zzilch/SZUCourseRogue
// @version      1.0
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
    // doms
    $('#cv-log-img').remove();
    $('#cvPageHeadTab').append('<li><a id="aRogueCourse">抢课列表</a></li>')

    // res
    const cool = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEJUlEQVQ4T4WUe0xbdRTHv6Uveil9QFu6AnLZ2NgGAxQYC69txogIYZpgZC4aI87HnIvRRB1GhZiZxSVOY0b4YzoJ4h8LWQWMTMHJI0CYrHQEwUWxsJa2dGBvH7cP4LbmXgaDMfD8d+/3nM/v5Lx42NxIAEfk0SKtgM8rEYv4ZqvDZwDQDaBnszDeAwRSpRDr01NVCccqUomUJDlxKC8eUxY3pmY8+KZl3NI1YBHYHPT7ABrvj18H1MrEJzRqSW3rxQo1mSDbInngnU/77M1ttzpm5wMvrXVcBW7XSevy98ScbrpQLgQ/YkvYGpF6srr9SkfvdPXKvxXgobJc7c8/XigRfdYyiUHjHKyzHoTCwCITgaJsHXLSpMjcreLipq0e9Bvm0DVgBRMKh27b6GvB4NKY3+/t5oCJGuLO6BfFKkVuClR5jThQUImoKBkIqRSxKg0M1/vgdDoQ8Fo4oEyZAEKqRlpGDvy0H7N2M2jajf6+dhcLfOrjo6n62lezgHg13qjtw7gtBRpNAmLVcRAIBJi1zXCgwb5mEBIxMnMqIZEQUMVpYZ+xYHFxATOWSfx+/dolXtYORb/+vUfyyTQdoFGge2gGJ89akZZ+APGJSXBRFLweF0yTBlQeDmPOuYDuUTmycw9CHBkJm8XMPfbXRD89cnO4nJeWJLONfVmshVYJxMpBuYNIL9ej+PDz0D1EchlMmSbg/XcExtanOT3riB6Plr4CoSASlHOeA/7S8TVDubyP8bJ3KqnhcwVyqBVchqyxWZ6oGwYdFAKMG7n7VLh4pggKmZjTjeN3UP3hCNweP5aYEBgmiMQ4ITNgsK0BxsiAbTEI+/hYskgRIV0EX+fbcnxWfPkxAXzU1B08U3/jCV5Gssxx83yxGiI+sDMRYY8QIY+QA/0fMESJEPYJwBMxeKu+c/qrptEX7zVFQwCkFoiKXM2KXTd25jYzuVSErL1qTo4vuDRrddC7l8emape+tmrXMoyF3rVzDSP4rtGKsuNVG5gTPcPw+G+h63IFt+cFz7b0Wx2+wnuDfb5IpYgSYm1z2OK/fnwQJREZG4CTsGPvM0KcPpWNspfbzD/13H6B7efq6pXvj+tsr8kVcJHbYgC2SQBKj7WhnNbiteQdsNMM2qcCMLqd+C1yDENtlWi5+rf/1Ce9P/gDzHOs/7rjULhH+UHjm5n85f0igDglIBKipmYArZ3/IF+pwZiXQjQpweWGx/HrgNl3sq7XZJ/zFQKg1gHZD/Z8bdcRnze//bCYZJvEmiJqubYiIYxTHmQly0C5AjjbcIP6vtP0p9nhL12BbQDeLRRJaomu9CR5YmWeRsSCD6bHwmhywUUv4cqQnblqmAu4PQvv2t3B+vuL+6CLveJDxkYLjqYmyPZZnYH98SqJadrm/cMyH/yWXZbNRuk/daaod2IUiOwAAAAASUVORK5CYII='
    const uncool = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADtklEQVQ4T4WUf2xTVRTHv7dvTctG+x6PlWWIblWZFFPdhsMxYVFgQibMp5CBMli3BYMSXfaXGLIxE7MEAqwigmZp2Q90ycKEzZjp4o9NXNRGXGHS6MjaAprZzdHXyip1q8/c1/Wlg1HuX+/de87nnO895x6Cuy8Lz2qek4AVPKcloX+mtcG/wypGpXIGJ//9GEDLXK5kjk3BwGvf2/2SOXVL8UPa7OWGWSbe34M40vRzuL1reNQfCD8DwBtvMAuYkT7/9IpH0zY2HVm3kNNrEiQPiMEwBi+Pf1P2+hdn/pwInYgZK0ADr7XtecFcUb8/nyAuDHVMBPeLtwILuZRMYrSKFBpzFV7ekNXRdvRZNZKjW28fv4KuXg84joUoTuDo/jw8/WRUPg1Stc8B/80kACqMjfnCOjatyOFwnJe970+bPz7Ysj11QdY8OUTLJ9dw8VomrFZrFCCKEEo2wN5gQuYSPWoaLiGnwAKLxSKfO51ObN0iBEfcV1kKtNRW5Z06sGclSKpKNli740v0Dbjk757aJhgLzPjB9yukvz5C+VYTcjd/BufQiHzebnkHq155Ho3tVunYcfuLZPmDC/q7D20qzMzSg+hmgGVfo++7X2SHs9WNMG1cJQP9bjuqK7Oxdue36DvvVIA529bjg55mtLU2d5KMdN3EyJldPHRQgO82DyOAfNTX199Fsgs5BWWKZK/XC6FkPXyjo5dJ7jKD6LCVsvFASqH31P/jGHIeN2HQOYS66lwI6xYpRancdwGBySRwnB4ejxv2g6tR+tq5qwqQaAHwUcmIEICRohfuGsftzR3rOVpt2ujZjyyS7Zfk233EeJ/ef6VjJ0erS9JVkEIMIi4WRBMBYw4kbG459hALKZQExizCUHDSKxelta6oMHupAeABQpIghaOZkpSIkumc5AiBNMnIRxfdPhRZOjtp2wi1VXlnD1SuBBiApM3IjiO8dWgAH56OVj22um2bsTpvsfJfe/j7cMP7P22XG5tW+sKpbTyn0wApAGHvhCbSTu/y4cIWrz8QNs56eq11RWpZKkcQe4L3vEQAmyo+vd7T530DwDllDNBJU15s2lFHpdOVPJPpXAMuLsqumt6prl637WZo6lU5mfgMKPSpxxaXHqspVMvy6WkyAUkGoJ5NFv23sPvNr270DlzviMHuAM7AhYx0na28eBlfssYIufqxxQDO4XF093vQ9vlvouePYAWVGZ9UIkHC0gfYvdMR6Qk1o6JzClOR/6bnaZhLLre/8XZQDPo/w+1Z0Z0zM0IAAAAASUVORK5CYII='

    // infos
    var studentInfo = JSON.parse(sessionStorage['studentInfo'])
    console.log(`
    使用说明：（暂不支持同一课程抢多个实验课）
    标记课程：点击小表情，懵逼为未标记，酷表情为已标记
    查看列表：点击抢课进入抢课页面
    抢实验课：标记普通课程，然后进入选择实验课界面点击Add按钮
    `);

    // data
    var dataList = GM_getValue('dataList', [])
    var deltaTime = GM_getValue('deltaTime', 1000);
    var stop = true;

    function setDeltaTime(time) {
        deltaTime = Math.max(time, 0);
        GM_setValue('deltaTime', deltaTime);
    }

    function stringifyData(data) {
        return data.courseName + '[' + data.courseIndex + ']' + data.teacherName;
    }

    function clearData() {
        GM_deleteValue('dataList');
        dataList = [];
    }

    function addData(data) {
        dataList.push(data);
        GM_setValue('dataList', dataList);
    }

    function removeData(data) {
        dataList = dataList.filter(x => x.teachingClassID !== data.teachingClassID);
        GM_setValue('dataList', dataList);
    }

    function syncData() {
        GM_setValue('dataList', dataList);
    }

    function includeData(data) {
        return dataList.find(x => x.teachingClassID === data.teachingClassID);
    }

    // hooks
    var tempData = null;
    unsafeWindow.rogueImgHandler = function (e) {
        e.stopPropagation();
        let $this = $(e.currentTarget);
        let data = JSON.parse($this.attr('data'));
        if (includeData(data)) {
            removeData(data);
            $this.attr('src', uncool);
        } else {
            data.teachingClassType = sessionStorage.getItem("teachingClassType");
            addData(data);
            if (data.hasTest != null && data.hasTest == '1') {
                tempData = data;
            }
            $this.attr('src', cool);
        }
    }
    unsafeWindow.testCourseHandler = function (e) {
        e.stopPropagation();
        let $this = $(e.currentTarget);
        let data = $this.prev().attr('value');
        if (tempData != null) {
            tempData.testTeachingClassID = data;
            tempData = null;
            $this.attr('disabled', true);
            syncData()
        } else {
            console.log("先标记教学班再选择实验课");
        }
    }

    $('#tpl-test-course-table-row').text(`
        <tr>
            <td><input type="radio" name="testCourse_radio_@index" value="@teachingClassId">
            <button class="cv-btn rogue-testcourse" onclick="testCourseHandler(event)">Add</button></td>
            <td><span>@courseIndex</span></td>
            <td><span>@teacher</span></td>
            <td><span>@teachingPlace</span></td>
            <td><span>@numberOfFirstVolunteer</span></td>
            <td><span>@remainingCapacity</span></td>
        </tr>
    `);

    function buildRogueImgHtml(data) {
        return '<img class="rogue-img" data=\'@data\' src="@url" style="width:20px;height:20px" onclick="rogueImgHandler(event)"/>'
            .replace('@data', JSON.stringify(data))
            .replace('@url', includeData(data) ? cool : uncool);
    }

    var _getHtml = CVCourseCard.getHtml;
    CVCourseCard.getHtml = function (_data) {
        let html = _getHtml(_data);
        let anchor = html.indexOf('</div></div><div class="cv-operate');
        let data = Object.assign({}, courseDataList.find(x => x.courseNumber == _data.courseNumber), _data);
        return html.slice(0, anchor) + buildRogueImgHtml(data) + html.slice(anchor);
    }

    var _init = CVList.init
    CVList.init = function ($dom, _data) {
        _init($dom, _data);
        var type = _data.type;
        if (type === 'public' || type === 'mooc') {
            let selectTags = $dom.find('.cv-choice');
            for (let i = 0; i < selectTags.length; i++) {
                $(selectTags[i]).after(buildRogueImgHtml(_data.data[i]));
            }
        } else if (type === 'school') {
            let linkTags = $dom.find('.cv-row > .cv-school-operate-col');
            for (let i = 0; i < linkTags.length; i++) {
                $(linkTags[i]).append(buildRogueImgHtml(_data.data[i]));
            }
        }
    }

    var _reload = CVList.reload
    CVList.reload = function ($dom, _data) {
        _reload($dom, _data);
        var type = _data.type;
        if (type === 'public' || type === 'mooc') {
            let selectTag = $dom.find('.cv-choice');
            for (let i = 0; i < selectTag.length; i++) {
                $(selectTag[i]).after(buildRogueImgHtml(_data.data[i]));
            }
        } else if (type === 'school') {
            let linkTags = $dom.find('.cv-row > .cv-school-operate-col');
            for (let i = 0; i < linkTags.length; i++) {
                $(linkTags[i]).append(buildRogueImgHtml(_data.data[i]));
            }
        }
    }

    // handlers

    async function getTeachingClassCapacity(data) {
        let currentBatch = JSON.parse(sessionStorage.getItem('currentBatch'));
        let batchCode = currentBatch.code;
        let resp = await queryTeachingClassCapacity(data.teachingClassID, batchCode);
        let code = resp.code;
        if (code != null && code == '1') {
            let capacity = resp.data;
            let isMainSelectObject = data.isMainSelectObject;
            if (isMainSelectObject != null && isMainSelectObject == '1') {
                data.classCapacity = capacity.mainClassCapacity;
                data.numberOfFirstVolunteer = capacity.mainElectiveNumber;
                return parseInt(capacity.mainClassCapacity) - parseInt(capacity.mainElectiveNumber);
            } else {
                data.classCapacity = capacity.nonMainClassCapacity;
                data.numberOfFirstVolunteer = capacity.nonMainElectiveNumber;
                return parseInt(capacity.nonMainClassCapacity) - parseInt(capacity.nonMainElectiveNumber);
            }
        } else {
            return -1;
        }
    }

    function rogueRepeatedly(data) {
        async function rogueOnce(data) {
            if (stop) {
                clearInterval(interval);
                return;
            }
            let capacity = await getTeachingClassCapacity(data);
            if (capacity > 0) {
                let addParam = data.hasTest != null && data.hasTest == '1' ?
                    buildAddVolunteerParam(data.teachingClassID, data.testTeachingClassID) :
                    buildAddVolunteerParam(data.teachingClassID);
                addParam.addParam = addParam.addParam.replace(/(teachingClassType":")([^"]*)/, '$1' + data.teachingClassType);
                let resp = await addVolunteer(addParam);
                let code = resp.code;
                if (code != null && code == '1') {
                    clearInterval(interval);
                    data.isChoose = '1';
                    console.log(stringifyData(data) + ': success');
                } else {
                    console.log(stringifyData(data) + ': fail, ' + resp.msg);
                }
            } else {
                console.log(stringifyData(data) + ': fail, capacity=' + capacity.toString());
            }
        }
        var interval = setInterval(rogueOnce, deltaTime, data);
    }

    function startRogue() {
        if (stop == false) return;
        setDeltaTime(parseInt($('#rogue-delta')[0].value));
        stop = false;
        $('#rogue-start').attr('disabled', true);
        for (let i = 0; i < dataList.length; i++) {
            let data = dataList[i];
            if (data.isChoose != null && data.isChoose == '1') {
                console.log(stringifyData(data) + ': selected');
                return;
            } else {
                rogueRepeatedly(data);
            }
        }
    }

    function showDataList() {
        // sync with local data
        syncData();

        let $li = $('#aRogueCourse').closest('li');
        let $ul = $('#cvPageHeadTab');
        let $target = $('#cvPublicCourse');
        $ul.children('li.cv-active').removeClass('cv-active');
        $('.main').children('article').addClass('cv-block-hide');
        $target.removeClass('cv-block-hide');

        let teachingClassType = 'XGXK';
        sessionStorage.setItem("teachingClassType", teachingClassType);
        publicTotalPage = 1;
        let listMock = {
            type: 'public',
            data: dataList
        };
        courseDataList = dataList;
        CVList.init($('#cvCanSelectPublicCourse'), listMock);
        $li.addClass('cv-active');
        let $h3 = $('#publicTitle');
        $h3.text("抢课列表");
        $h3.append('<input id="rogue-delta" class="cv-btn" style="background: #fff;color: #2048B1;" value="' + deltaTime + '"></input>');
        $h3.append('<button id="rogue-start" class="cv-btn cv-btn-choose">启动</button>')
        $h3.append('<button id="rogue-stop" class="cv-btn cv-btn-cancel">停止</button>')
        $h3.append('<button id="rogue-fresh" class="cv-btn cv-btn-choose">刷新</button>')
        $h3.append('<button id="rogue-clear" class="cv-btn cv-btn-cancel">清空</button>')
        $('#rogue-clear').click(function () {
            clearData();
            showDataList();
        });
        $('#rogue-start').click(startRogue);
        $('#rogue-fresh').click(async function () {
            for (let i = 0; i < dataList.length; i++) {
                await getTeachingClassCapacity(dataList[i]);
            }
            showDataList();
        });
        $('#rogue-stop').click(function () {
            stop = true;
            showDataList();
            $('#rogue-start').attr('disabled', false);
        });
    };
    $('#aRogueCourse').click(showDataList);
})();