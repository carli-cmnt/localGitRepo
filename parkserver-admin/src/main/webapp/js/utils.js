jQuery.validator.addMethod("isPhone",function(value,element){
	var isMobile = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
	var isPhone = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
	return this.optional(element) || (isMobile.test(value) || isPhone.test(value));
});
jQuery.validator.addMethod("isZipCode",function(value,element){
	var isZipCode = /^[0-9]{6}$/;
	return this.optional(element) || (isZipCode.test(value));
});
jQuery.validator.addMethod("isIdCard",
		function(value, element) {

	return this.optional(element) || isIdCard(value);
}, $.validator.format(" * 身份证号码不符合国定标准，请核对！ "));

function isIdCard(person_id) {
	var person_id = person_id;

	//身份证的地区代码对照  
	var aCity = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
	};
	//获取证件号码  
	//  var person_id=person_id.value();  
	//合法性验证  
	var sum = 0;
	//出生日期  
	var birthday;
	//验证长度与格式规范性的正则  
	var pattern = new RegExp(
	/(^\d{15}$)|(^\d{17}(\d|x|X)$)/i);
	if (pattern.exec(person_id)) {
		//验证身份证的合法性的正则  
		pattern = new RegExp(
		/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/);
		if (pattern.exec(person_id)) {
			//获取15位证件号中的出生日期并转位正常日期       
			birthday = "19" + person_id.substring(6, 8)
			+ "-" + person_id.substring(8, 10)
			+ "-" + person_id.substring(10, 12);
		} else {
			person_id = person_id.replace(/x|X$/i, "a");
			//获取18位证件号中的出生日期  
			birthday = person_id.substring(6, 10) + "-"
			+ person_id.substring(10, 12) + "-"
			+ person_id.substring(12, 14);

			//校验18位身份证号码的合法性  
			for ( var i = 17; i >= 0; i--) {
				sum += (Math.pow(2, i) % 11)
				* parseInt(
						person_id.charAt(17 - i),
						11);
			}
			if (sum % 11 != 1) {
				//alert("身份证号码不符合国定标准，请核对！");                               
				return false;
			}
		}
		//检测证件地区的合法性                                  
		if (aCity[parseInt(person_id.substring(0, 2))] == null) {
			//  alert("证件地区未知，请核对！");                             
			return false;
		}
		var dateStr = new Date(birthday.replace(/-/g, "/"));

		//alert(birthday +":"+(dateStr.getFullYear()+"-"+ appendZore(dateStr.getMonth()+1)+"-"+ appendZore(dateStr.getDate())))  
		if (birthday != (dateStr.getFullYear() + "-"
				+ appendZore(dateStr.getMonth() + 1) + "-" + appendZore(dateStr
						.getDate()))) {
			//  alert("证件出生日期非法！");                           
			return false;
		}
	} else {
		// alert("证件号码格式非法！");                           
		return false;
	}
	return true;
}

function appendZore(temp) {
	if (temp < 10) {
		return "0" + temp;
	} else {
		return temp;
	}
}