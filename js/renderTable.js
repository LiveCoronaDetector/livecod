function renderTable(){
    let data = tableData
    let h = [];
    let len = data.length;
    for(let i=0 ; i<len ; i++){
        h.push('<tr>');
        h.push('<td>' + data[i]['순서'] + '</td>');
        h.push('<td>' + data[i]['국가'] + ' ' + data[i]['나이'] + ' '  + data[i]['성별'] + ' '  + '</td>');
        h.push('<td>' + data[i]['입국일자'] + ' '  + data[i]['확진일자'] + '</td>');
        h.push('<td>' + data[i]['감염차수'] + '차'  + '</td>');
        h.push('<td>' + data[i]['접촉자'] + '</td>');
        h.push('<td>' + data[i]['이동경로'] + '</td>');
        h.push('<td>' + data[i]['치료장소'] + '</td>');
        h.push('</tr>');
    }
    document.querySelector('#dataTable > tbody').innerHTML = h.join('');
}
renderTable();
