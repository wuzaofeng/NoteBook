var idTmr;
    function getExplorer() {
        var explorer = window.navigator.userAgent;
        //ie  
        if (explorer.indexOf("MSIE") >= 0) {
            return 'ie';
        }
        //firefox  
        else if (explorer.indexOf("Firefox") >= 0) {
            return 'Firefox';
        }
        //Chrome  
        else if (explorer.indexOf("Chrome") >= 0) {
            return 'Chrome';
        }
        //Opera  
        else if (explorer.indexOf("Opera") >= 0) {
            return 'Opera';
        }
        //Safari  
        else if (explorer.indexOf("Safari") >= 0) {
            return 'Safari';
        } else {
            return -1;
        }
    }
    function Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
    }
    //ie导出方法一:
    function IEoutput1(tableid) {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }
    }
    //ie导出方法2:  //未检测到浏览器时使用
    function IEoutput2(tableid) {

        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var oSheet = oWB.ActiveSheet;
        var Lenr = curTbl.rows.length;
        for (i = 0; i < Lenr; i++) {
            var Lenc = curTbl.rows(i).cells.length;
            for (j = 0; j < Lenc; j++) {
                oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;

            }

        }
        oXL.Visible = true;
    }
    //其他浏览器导出方法:chrome,firefox,opera,webkit,....
    var otherOutput = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g,
                    function (m, p) { return c[p]; })
            }
        return function (table, name) {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            window.location.href = uri + base64(format(template, ctx))
        }
    })()

    //主方法, 导出到excel
    function outputExcel(tableid) {
        if (getExplorer() == 'ie') {
            IEoutput1(tableid);
        }
        else if (getExplorer() != -1) {
            otherOutput(tableid);
        } else {
            IEoutput2(tableid);
        }
    }