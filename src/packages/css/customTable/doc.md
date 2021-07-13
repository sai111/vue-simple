<!-- customTable文档 -->

[vue+element模板导入excel]: https://blog.csdn.net/qq_35864320/article/details/105421023



// 前端 读取excel 数据
https://blog.csdn.net/young_Emily/article/details/77337284

https://www.cnblogs.com/liuxianan/p/js-excel.html


步骤：
1. xlsx 插件 xlsx.core.min.js
2. 读取excel
   1. 获取workbook 对象
       读取本地文件
     ```
        // 读取本地excel文件
        function readWorkbookFromLocalFile(file, callback) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            if(callback) callback(workbook);
          };
          reader.readAsBinaryString(file);
        }
     ```
     读取网络文件
     ```
        // 从网络上读取某个excel文件，url必须同域，否则报错
        function readWorkbookFromRemoteFile(url, callback) {
          var xhr = new XMLHttpRequest();
          xhr.open('get', url, true);
          xhr.responseType = 'arraybuffer';
          xhr.onload = function(e) {
            if(xhr.status == 200) {
              var data = new Uint8Array(xhr.response)
              var workbook = XLSX.read(data, {type: 'array'});
              if(callback) callback(workbook);
            }
          };
          xhr.send();
        }
     ```

    

Workbook 里面的内容

![img](https://images2018.cnblogs.com/blog/352797/201807/352797-20180706101133858-640072825.png)





2. ### 读取workbook

```
// 读取 excel文件
function outputWorkbook(workbook) {
	var sheetNames = workbook.SheetNames; // 工作表名称集合
	sheetNames.forEach(name => {
		var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
		for(var key in worksheet) {
			// v是读取单元格的原始值
			console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
		}
	});
}
```





Xlsx 工具类

- `XLSX.utils.sheet_to_csv`：生成CSV格式
- `XLSX.utils.sheet_to_txt`：生成纯文本格式
- `XLSX.utils.sheet_to_html`：生成HTML格式
- `XLSX.utils.sheet_to_json`：输出JSON格式



采用转csv方式输出结果的简单示例

```
function readWorkbook(workbook)
{
	var sheetNames = workbook.SheetNames; // 工作表名称集合
	var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
	var csv = XLSX.utils.sheet_to_csv(worksheet);
	document.getElementById('result').innerHTML = csv2table(csv);
}

// 将csv转换成简单的表格，会忽略单元格合并，在第一行和第一列追加类似excel的索引
function csv2table(csv)
{
	var html = '<table>';
	var rows = csv.split('\n');
	rows.pop(); // 最后一行没用的
	rows.forEach(function(row, idx) {
		var columns = row.split(',');
		columns.unshift(idx+1); // 添加行索引
		if(idx == 0) { // 添加列索引
			html += '<tr>';
			for(var i=0; i<columns.length; i++) {
				html += '<th>' + (i==0?'':String.fromCharCode(65+i-1)) + '</th>';
			}
			html += '</tr>';
		}
		html += '<tr>';
		columns.forEach(function(column) {
			html += '<td>'+column+'</td>';
		});
		html += '</tr>';
	});
	html += '</table>';
	return html;
}
```

