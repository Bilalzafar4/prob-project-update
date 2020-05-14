// .csv Select File Event
fileSelect.addEventListener('change', function (e) {
    filename.innerHTML = fileSelect.files[0].name;
    const reader = new FileReader();
    reader.onload = function () {
        lines = reader.result.split('\n').map(function (line) {
          console.log(lines);
            return line.split(',');
        })
        displayTable(lines);
    }
    reader.readAsText(fileSelect.files[0]);
}, false);

// first we split unorder data by line , then split word by word
// Show File Data
function displayTable(lines) {
    var table = document.getElementById('table');
    var rows = lines.length - 1;
    var cols = lines[0].length;
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement('tr');
        var tds = [];
        for (var j = 0; j < cols; j++) {
            tds.push(document.createElement('td'));
            tds[j].innerHTML = lines[i][j];
        }
        for (var j = 0; j < cols; j++) {
            tr.appendChild(tds[j]);
        }// clear tr performed ,
        table.appendChild(tr);
    }
}
// dynamic work performed in table format , runtime work
// Frequency Table Find Event
calculateFrequencyTable.addEventListener('click', function () {
    data = lines[0];
    var rows = lines.length;
    var cols = lines[0].length;
    var j = column.value;
//to get column no
    for (var i = 0; i < data.length; i++) {
        if (j == data[i]) {
            j = i;
            break;
        }
    }
//match column data , and that is written by user , if not match  written undefined and no action performed
    var heading = data[j];
    var h2 = document.createElement('h2');
    h2.innerHTML = heading;
    h2.style.textTransform = "capitalize";
    heading = h2.innerHTML;
// replace data with specifix word that user enter
    var x = "";
    myData = []; //Col data
    for (var i = 1; i < rows; i++) {
        x = parseInt(lines[i][j]);
        myData.push(x);
    }
// get column data ,that user write in box
    var table = new Table();
// now take action , and make a suitable table for that data and performed all its SPSS actions :D
    table.addRow();
    table.addCol('Class');
    table.addCol('Frequency');
    table.addCol('Commulative Frequency');
    table.addCol('Relative Frequency');
    table.addCol('Percentage');
    table.addCol('Commulative Relative Frequency');

    var t = table.getTable();
    t.classList.add("tableContainer");

    var demo = document.getElementById('frequencyTablesContainer');
    demo.appendChild(h2);
    demo.appendChild(t);
//now we create table , and input our record
// now we put our data into the table and performed operations

    var d = new Data(myData);
    // we put our data into data table of specific column that is stored in our array myData[];
    var max = d.max();
    var labels = [];
    var rows = d.getNoOfRows();
    var min = d.min();
    var interval = d.getClassInterval();

    var first, second, f, cf, rf, p, crf;
    first = min;//min
    second = first + interval; //min
    c = d.getClass();//
    f = d.getFrequencyArray();
    cf = d.getCommulativeFreqArray();
    rf = d.getRelativeFreqArray();
    p = d.getPercentageArray();
    crf = d.getCommulativeRelativeFrequencyArray();

    if (interval != 0) {
        for (var i = 0; i < rows; i++) {
            table.addRow();
            table.addCol(first + " - " + second);
            table.addCol(f[i]);
            table.addCol(cf[i]);
            table.addCol(rf[i]);
            table.addCol(p[i] + " %");
            table.addCol(crf[i] + " %");
            first = second;
            second += interval;
            labels.push(i+1);
        }
    } else {
        for (var i = 0; i < rows; i++) {
            table.addRow();
            table.addCol(first);
            table.addCol(f[i]);
            table.addCol(cf[i]);
            table.addCol(rf[i]);
            table.addCol(p[i] + " %");
            table.addCol(crf[i] + " %");
            first++;
            labels.push(i+1);
        }
    }

    table.addRow();
    table.addCol();
    table.addCol('sum = ' + d.length());
    table.addCol();
    table.addCol();
    table.addCol();
    table.addCol();

    var meanTable = new Table();
    meanTable.addRow();
    meanTable.addCol('Mean');
    meanTable.addCol('Standard Deviation');
    meanTable.addRow();
    meanTable.addCol(meanFunc(d.getData()));
    meanTable.addCol(standardDeviation(d.getData()));

    var t = meanTable.getTable();
    demo.appendChild(t);


    /*if (interval > 0)
      {  histogram(f, c, interval, max, heading);}
    else{

        heading = "" + heading + "";
        var title = heading.toLocaleUpperCase();
        barchart(demo,title,f,labels);
    }
    */

});

/*function histogram(f, c, interval, max, heading) {\
    var data = [];
    for (var i = 0; i < f.length; i++) {
        var obj = {
            x: "" + c[i] + "",
            y: f[i]
        };
        data[i] = obj;
    }
    var binInc = interval;
    var maxBin = max;
    console.log(maxBin);
    console.log(binInc);
    heading = "" + heading + "";
    var title = heading.toLocaleUpperCase();
    createHistogram(data, maxBin, binInc, title);
}

function barchart(demo,title,f,labels) {
    var canvas = document.createElement('canvas');
    canvas.style.width = "400px";
    canvas.style.height = "400px";
    canvas.style.margin = "auto";
    demo.appendChild(canvas);
    var id = canvas;
    var data = f;
    var labels = labels;
    var label = title;
    barChart(id, data, labels, label);
}

*/

calculateFrequencyTable1.addEventListener('click',function(){
    var col1=document.getElementById("column1").value;
    var col2=document.getElementById("column2").value;
    var data = lines[0];
    var rows = data.length;
    var cols = lines[0].length;
    var selectedCol1,selectedCol2;


    for (var i = 0; i < rows; i++) {
        if (col1 == data[i]) {
            selectedCol1 = i;
            break;
        }
    }
    for (var i = 0; i < rows; i++) {
        if (col2 == data[i]) {
            selectedCol2 = i;
            break;
        }
    }
    var x = "";
    var col1_data = [];
    var col2_data = [];
    for (var i = 1; i < rows; i++) {
        var Temp = data[i].split(',');
        x = parseInt(Temp[selectedCol1]);
        col1_data.push(x);
    }
    for (var i = 1; i < rows; i++) {
        var Temp = data[i].split(',');
        x = parseInt(Temp[selectedCol2]);
        col2_data.push(x);
    }
    var filter_col1=[];
    var filter_col2=[];
    for(var x=0;x<col1_data.length*0.1;x++)
    {
        filter_col1[x]=col1_data[Math.floor(Math.random() * col1_data.length)];
        filter_col2[x]=col2_data[Math.floor(Math.random() * col2_data.length)];
    }
    // Calculate size of first array
    var mean1=meanFunc(filter_col1);
    var mean2=meanFunc(filter_col2);// now it is correct , Fucking right
    var sd1=standardDeviation(filter_col1);
    var sd2=standardDeviation(filter_col2);
    if(mean1>mean2)
  {  var t_test = ((mean1 - mean2) / (Math.sqrt((sd1 * sd1) / filter_col1.length) + (sd2 * sd2) / filter_col2.length));}
  else
  {
     var t_test = ((mean2 - mean1) / (Math.sqrt((sd1 * sd1) / filter_col1.length) + (sd2 * sd2) / filter_col2.length));
  }
    var p=jStat.ttest( t_test, filter_col1.length*0.1, 2);
    var showtest = document.getElementById('frequencyTablesContainer1');
    var T_Test = new Table();
    T_Test.addRow();
    T_Test.addCol('T Test (t value)');
    T_Test.addCol('T Test (p value)');
    T_Test.addRow();
    T_Test.addCol(t_test);
    T_Test.addCol(p);

var t1= T_Test.getTable();
t1.classList.add("tableContainer");
var demo1 = document.getElementById('frequencyTablesContainer1');
demo1.appendChild(t1);

});
