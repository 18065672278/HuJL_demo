//保留小数位（第一种）
function firstround(size,num){
	num = num.toFixed(size);
	return num; 
};
//保留小数位（第二种）
function secondround(size,num){
	var f_x = parseFloat(num);  
    if (isNaN(f_x)){  
        return '0.00';  
    }  
    var f_x = Math.round(f_x*100)/100;  
    var s_x = f_x.toString();  
    var pos_decimal = s_x.indexOf('.');  
    if (pos_decimal < 0){  
        pos_decimal = s_x.length;  
        s_x += '.';  
    }  
    while (s_x.length <= pos_decimal + size){  
        s_x += '0';  
    }  
    return s_x;
};