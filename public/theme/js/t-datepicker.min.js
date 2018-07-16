
;(function($){'use strict';var Defaults={autoClose:true,durationArrowTop:200,numCalendar:2,titleCheckIn:'Check In',titleCheckOut:'Check Out',titleToday:'Today',titleDateRange:'night',titleDateRanges:'nights',titleDays:['Mo','Tu','We','Th','Fr','Sa','Su'],titleMonths:['January','February','March','April','May','June','July','August','Septemper','October','November',"December"],titleMonthsLimitShow:3,replaceTitleMonths:null,showDateTheme:null,iconArrowTop:true,iconDate:'&#x279C;',arrowPrev:'&#x276E;',arrowNext:'&#x276F;',toDayShowTitle:true,dateRangesShowTitle:true,dateRangesHover:true,toDayHighlighted:false,nextDayHighlighted:false,daysOfWeekHighlighted:[0,6],formatDate:'yyyy-mm-dd',dateCheckIn:null,dateCheckOut:null,startDate:null,endDate:null,limitPrevMonth:0,limitNextMonth:11,limitDateRanges:31,showFullDateRanges:false,fnDataEvent:null};var update_options;$.fn.tDatePicker=function(pr_el,options){var d=new Date();var m=d.getMonth();var y=d.getFullYear();var toDay=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());function getToday(){return Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());}
if(options===undefined&&typeof(pr_el)!=='string'){update_options=pr_el;}
update_options.formatDate=update_options.formatDate||Defaults.formatDate;update_options.startDate=update_options.startDate||toDay;if(update_options.startDate===''||update_options.startDate==='null'){update_options.startDate=toDay;}
update_options.startDate=convertDateUTC(convertFormatDf(update_options.startDate))
var sd=new Date(update_options.startDate);var nextDay=Date.UTC(sd.getFullYear(),sd.getMonth(),sd.getDate()+1);if(pr_el==='setStartDate'&&typeof(pr_el)==='string'){update_options.startDate=convertDateUTC(convertFormatDf(options))}
if(pr_el==='setEndDate'&&typeof(pr_el)==='string'){update_options.endDate=convertDateUTC(convertFormatDf(options))}
if(update_options.dateCheckIn===''||update_options.dateCheckIn==='null'){update_options.dateCheckIn=null;}
if(update_options.dateCheckOut===''||update_options.dateCheckOut==='null'){update_options.dateCheckOut=null;}
if(update_options.endDate===''||update_options.endDate==='null'){update_options.endDate=null;}
if(options!==undefined){update_options.numCalendar=update_options.numCalendar||2;var num_Limit=update_options.limitDateRanges||31;var num_month_Limit=update_options.limitNextMonth||11;var limitEndDate=new Date(sd.getFullYear(),sd.getMonth()+update_options.numCalendar+num_month_Limit-1,sd.getDate());limitEndDate=convertDateUTC(convertFormatDf(limitEndDate))
if(pr_el==='update'){if(options.length===2){checkCI(options[0]);checkCO(options[1]);}else{checkCI(options);}
if(options===''){update_options.dateCheckIn=null;update_options.dateCheckOut=null;}}
if(pr_el==='updateCI'){checkCI(options);}
if(pr_el==='updateCO'){checkCO(options)}}
function checkCI(pr_options){if(pr_options===''){update_options.dateCheckIn=null;update_options.dateCheckOut=null;return;}
var CI=convertDateUTC(convertFormatDf(pr_options));var date=new Date(CI);var dateLimit=new Date(date.getFullYear(),date.getMonth(),date.getDate()+num_Limit);dateLimit=convertDateUTC(convertFormatDf(dateLimit))
var op_CO=convertDateUTC(convertFormatDf(update_options.dateCheckOut));update_options.dateCheckIn=CI;if(CI<update_options.startDate){update_options.dateCheckIn=update_options.startDate;}
if(CI>limitEndDate){update_options.dateCheckIn=limitEndDate;}
if(CI>=op_CO||op_CO>dateLimit){update_options.dateCheckOut=null;}}
function checkCO(pr_options){var op_CI=convertDateUTC(convertFormatDf(update_options.dateCheckIn));if(pr_options===''){update_options.dateCheckIn=op_CI;if(isNaN(op_CI)){update_options.dateCheckIn=null;}
update_options.dateCheckOut=null;return;}
var CO=convertDateUTC(convertFormatDf(pr_options));var date=new Date(CO);var CO_dateLimit=new Date(date.getFullYear(),date.getMonth(),date.getDate()-num_Limit);CO_dateLimit=convertDateUTC(convertFormatDf(CO_dateLimit))
if(CO>limitEndDate){update_options.dateCheckOut=limitEndDate;update_options.dateCheckIn=CO_dateLimit;return;}
if(CO>update_options.startDate){if(update_options.dateCheckIn===undefined||update_options.dateCheckIn===null){update_options.dateCheckOut=CO;if(update_options.startDate>CO_dateLimit){update_options.dateCheckIn=update_options.startDate;}else{update_options.dateCheckIn=CO_dateLimit;}}else{update_options.dateCheckOut=CO;if(update_options.startDate>CO_dateLimit){update_options.dateCheckIn=op_CI;if(CO<op_CI){update_options.dateCheckIn=update_options.startDate;}}else{if(op_CI>CO_dateLimit){update_options.dateCheckIn=op_CI;}else{update_options.dateCheckIn=CO_dateLimit;}
if(op_CI>CO){update_options.dateCheckIn=CO_dateLimit;}}}}else{update_options.dateCheckIn=update_options.startDate;update_options.dateCheckOut=nextDay;}}
var findValueCI=this.find('.t-input-check-in').val();var findValueCO=this.find('.t-input-check-out').val();if(typeof(pr_el)==='string'){if(pr_el==='show'||pr_el==='hide'){if(findValueCI!=='null'){update_options.dateCheckIn=findValueCI;}
if(findValueCO!=='null'){update_options.dateCheckOut=findValueCO;}}
if(findValueCI==='null'){if(pr_el==='getDate'||pr_el==='getDateInput'||pr_el==='getDateUTC'){return null;}
if(pr_el==='getDates'||pr_el==='getDateInputs'||pr_el==='getDateUTCs'){return[null,null];}}
if(findValueCI!=='null'){if(findValueCO==='null'){if(pr_el==='getDates'){return[new Date(findValueCI),null]}
if(pr_el==='getDateInputs'){return[findValueCI,null]}
if(pr_el==='getDateUTCs'){var d_CI=convertDateUTC(convertFormatDf(findValueCI));return[d_CI,null]}}
if(pr_el==='getDate'){return new Date(findValueCI)}
if(pr_el==='getDates'){return[new Date(findValueCI),new Date(findValueCO)]}
if(pr_el==='getDateInput'){return findValueCI;}
if(pr_el==='getDateInputs'){return[findValueCI,findValueCO]}
if(pr_el==='getDateUTC'){return convertDateUTC(convertFormatDf(findValueCI));}
if(pr_el==='getDateUTCs'){var d_CI=convertDateUTC(convertFormatDf(findValueCI));var d_CO=convertDateUTC(convertFormatDf(findValueCO));return[d_CI,d_CO]}}}
var this_el=this;var settings=$.extend({},Defaults,update_options);settings.durationArrowTop=Number(settings.durationArrowTop)
settings.limitPrevMonth=Number(settings.limitPrevMonth)
settings.limitNextMonth=Number(settings.limitNextMonth)
settings.numCalendar=Number(settings.numCalendar)
settings.limitDateRanges=Number(settings.limitDateRanges)
settings.titleMonthsLimitShow=Number(settings.titleMonthsLimitShow)
if(typeof(pr_el)==='string'){var get_startDate=settings.startDate||settings.dateCheckIn;if(pr_el==='getStartDate'){return new Date(get_startDate)}
if(pr_el==='getStartDateUTC'){return convertDateUTC(convertFormatDf(get_startDate))}
var get_endDate=settings.endDate||new Date(sd.getFullYear(),sd.getMonth()+settings.numCalendar+settings.limitNextMonth-1,sd.getDate());if(pr_el==='getEndDate'){return new Date(get_endDate);}
if(pr_el==='getEndDateUTC'){return convertDateUTC(convertFormatDf(get_endDate));}}
function check_num_10(pr_el){if(pr_el<10){return pr_el='0'+pr_el}else{return pr_el;}}
function convertArrayToString(pr_array){pr_array=pr_array.toString();pr_array=pr_array.replace(/,/g,'');return pr_array;}
function fnParents(pr_el_parent,pr_el_class){var i=0;while(pr_el_parent.className.match(pr_el_class)===null){if(pr_el_parent.className===pr_el_class){return pr_el_parent;}
if(pr_el_parent.nodeName==='HTML'){return pr_el_parent;}
pr_el_parent=pr_el_parent.parentElement;if(pr_el_parent===null){return document.body.parentElement;}
i++;if(i>500){return;}}
return pr_el_parent;}
function appendSpan(pr_el,pr_class,pr_class_span,pr_text_node){if(pr_class!=''){pr_el.className=pr_el.className+' '+pr_class;}else{pr_el.className=pr_el.className+pr_class;}
var node=document.createElement("span");node.className=pr_class_span;var textnode=document.createTextNode(pr_text_node);node.appendChild(textnode);pr_el.appendChild(node)}
var aDays=settings.titleDays;function setDayOfWeek(){for(var i=0;i<aDays.length;i++){if(aDays[i].indexOf('<th>')===-1){aDays[i]='<th>'+aDays[i]+'</th>';}else{aDays[i]=aDays[i];}}
return convertArrayToString(aDays)}
var setTemplate='<div class="t-table-wrap"><table class="t-table-condensed">'+'<thead>'+'<tr>'+'<th class="t-arrow t-prev">'+settings.arrowPrev+'</th>'+'<th colspan="5" class="t-month"></th>'+'<th class="t-arrow t-next">'+settings.arrowNext+'</th>'+'</tr>'+'<tr>'+
setDayOfWeek()+'</tr>'+'</thead>'+'<tbody></tbody>'+'</table></div>'
var numCalendar=settings.numCalendar;var checkNumCalendar='';if(Number(numCalendar)>1){var checkNumCalendar=' t-datepicker-days'}
var dataTheme=[];var setNumTheme=numCalendar;while(setNumTheme>0){dataTheme.push(setTemplate);setNumTheme--;}
numCalendar=numCalendar-1;function AppendDaysInMonth(pr_num){var i=0;var setTr='';while(i<pr_num){setTr=setTr+'<tr>'+'<td class="t-day">1</td>'+'<td class="t-day">2</td>'+'<td class="t-day">3</td>'+'<td class="t-day">4</td>'+'<td class="t-day">5</td>'+'<td class="t-day">6</td>'+'<td class="t-day">0</td>'+'</tr>';i++;}
return setTr;}
function setThemeCheckDate(pr_title,pr_class,pr_data_utc,pr_input,pr_fm_input){return'<div class="t-dates t-date-'+pr_class+'">'+
settings.iconDate+'<label class="t-date-info-title">'+pr_title+'</label>'+
showThemeDate(pr_class,pr_data_utc)+'</div>'+'<input type="hidden" class="t-input-'+pr_class+'"'+' value="'+pr_fm_input+'" name="'+pr_input+'">'}
function showThemeDate(pr_class,pr_data_utc){if(pr_data_utc!==0&&pr_data_utc!==null){var d=new Date(pr_data_utc)
var showMonths=settings.titleMonths[d.getMonth()].slice(0,settings.titleMonthsLimitShow);if(settings.replaceTitleMonths!==null){showMonths=settings.replaceTitleMonths+' '+check_num_10(d.getMonth()+1);}
if(settings.showDateTheme==='dd'){return'<span class="t-day-'+pr_class+'"> '+check_num_10(d.getDate())+'</span>'}else if(settings.showDateTheme==='dd/mm'||settings.showDateTheme==='dd-mm'){return'<span class="t-day-'+pr_class+'"> '+check_num_10(d.getDate())+'</span>'+'<span class="t-month-'+pr_class+'"> '+showMonths+' </span>'}else{return'<span class="t-day-'+pr_class+'"> '+check_num_10(d.getDate())+'</span>'+'<span class="t-month-'+pr_class+'"> '+showMonths+' </span>'+'<span class="t-year-'+pr_class+'"> '+check_num_10(d.getFullYear())+'</span>'}}else{return'';}}
function convertDateUTC(pr_date_utc){var date=new Date(pr_date_utc);var date_utc=Date.UTC(date.getFullYear(),date.getMonth(),date.getDate());if(date_utc===0){date_utc=null};return date_utc;}
function convertFormatDf(pr_date){if(typeof(pr_date)==='object'&&pr_date!==null){return pr_date=convertDateUTC(pr_date)}
if(typeof(pr_date)==='string'&&pr_date!=='null'){var yyyy_mm_dd;if(pr_date.indexOf('/')!==-1){pr_date=pr_date.replace(/\//g,'-')}
var dd=pr_date.split('-');if(update_options.formatDate==='mm-dd-yyyy'&&dd[2].length===4&&dd[0]<13){yyyy_mm_dd=dd[2]+'-'+dd[0]+'-'+dd[1];}
if(update_options.formatDate==='dd-mm-yyyy'&&dd[2].length===4&&dd[1]<13){yyyy_mm_dd=dd[2]+'-'+dd[1]+'-'+dd[0];}
if(update_options.formatDate==='yyyy-dd-mm'&&dd[0].length===4&&dd[2]<13){yyyy_mm_dd=dd[0]+'-'+dd[2]+'-'+dd[1];}
if(update_options.formatDate==='yyyy-mm-dd'&&dd[0].length===4&&dd[1]<13){yyyy_mm_dd=dd[0]+'-'+dd[1]+'-'+dd[2];}
if(isNaN(new Date(yyyy_mm_dd))){return console.log("'Thank you for using t-datepicker. Please, check formatDate :'%c "+settings.formatDate+' ','background: #f16d99; color: #fff');}
return yyyy_mm_dd;}
return pr_date;}
function showValueInput(pr_date){if(pr_date!==null){var d=new Date(pr_date)
pr_date=check_num_10(d.getDate())+'-'+(check_num_10(d.getMonth()+1))+'-'+d.getFullYear();if(settings.formatDate==='mm-dd-yyyy'){pr_date=(check_num_10(d.getMonth()+1))+'-'+check_num_10(d.getDate())+'-'+d.getFullYear();}
if(settings.formatDate==='yyyy-dd-mm'){pr_date=d.getFullYear()+'-'+check_num_10(d.getDate())+'-'+(check_num_10(d.getMonth()+1));}
if(settings.formatDate==='yyyy-mm-dd'){pr_date=d.getFullYear()+'-'+(check_num_10(d.getMonth()+1))+'-'+check_num_10(d.getDate());}}
return pr_date;}
function getDateUTC(pr_in,pr_out){var Array_In_Out=['check-in','check-out'];Array_In_Out.forEach(function(e){var label_title=settings.titleCheckIn;var getDay=pr_in;var Input='t-start'
if(pr_in!==null){label_title='';}
if(e==='check-out'){label_title=settings.titleCheckOut;getDay=pr_out;if(pr_in===pr_out){getDay=null;}else if(pr_out!==null){label_title='';}
Input='t-end'}
getDay=convertFormatDf(getDay)
var formatDate=showValueInput(getDay);getDay=convertDateUTC(getDay);this_el.find('.t-'+e).html(setThemeCheckDate(label_title,e,getDay,Input,formatDate))})
if(pr_in===null&&pr_out===null){pr_in=settings.startDate;var date=new Date(pr_in);pr_out=Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()+1);}
if(pr_in!==null&&pr_out!==null){if(convertDateUTC(convertFormatDf(pr_in))>convertDateUTC(convertFormatDf(pr_out))){pr_in=pr_out;}}
if(pr_in!==null&&pr_out===null){pr_out=pr_in;}
if(pr_in===null&&pr_out!==null){pr_in=pr_out;}
pr_in=convertFormatDf(pr_in)
pr_out=convertFormatDf(pr_out)
return[convertDateUTC(pr_in),convertDateUTC(pr_out)];}
var dataUTC=getDateUTC(settings.dateCheckIn,settings.dateCheckOut);function setDaysInMonth(pr_el,pr_data_utc){var tswitch=pr_el.find('.t-month');if(numCalendar>=0){for(var i_num=0;i_num<=numCalendar;i_num++){var date=new Date(pr_data_utc)
var newDate=new Date(Date.UTC(date.getFullYear(),(date.getMonth()+i_num)));tswitch[i_num].innerHTML=settings.titleMonths[newDate.getMonth()]+' '+newDate.getFullYear();var dataDays=[];var dataUTCDate=[];var days=[];var nextDate=Date.UTC(date.getFullYear(),(date.getMonth()+i_num));var date=new Date(nextDate)
while(Date.UTC(date.getFullYear(),(date.getMonth()))===nextDate){days.push(date.getDay());dataDays.push(date.getDate());dataUTCDate.push(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()))
date.setDate(date.getDate()+1);}
var beforeDay=days[0];if(beforeDay===0){while(beforeDay<6){dataDays.unshift('');dataUTCDate.unshift('');beforeDay++;}}else{while(beforeDay>1){dataDays.unshift('');dataUTCDate.unshift('');beforeDay--;}}
var afterDay=days[days.length-1];while(afterDay<7){dataDays.push('');dataUTCDate.push('');afterDay++;}
setThemeData(dataDays,dataUTCDate,i_num,pr_el)}}
getStyleDays(pr_el,pr_data_utc);}
function setThemeData(dataDays,dataUTCDate,pr_num,pr_el){var checkdataDays=dataDays.slice(-7)[0]
if(checkdataDays===''){dataDays=dataDays.slice(0,-7)}
var getTH=pr_el.find('tbody')
getTH[pr_num].innerHTML=AppendDaysInMonth(Math.round(dataDays.length/7));var getTD=getTH[pr_num].querySelectorAll('td')
for(var td=0;td<getTD.length;td++){getTD[td].setAttribute('data-t-date',dataUTCDate[td]);getTD[td].innerHTML=dataDays[td];}}
function getStyleDays(pr_el,pr_data_utc){var limitdateN=clickEvent(pr_el,pr_data_utc)
var limitEndDate=convertDateUTC(convertFormatDf(settings.endDate))||limitdateN;var toDayElement=pr_el.find('td')
var d_utc=new Date(dataUTC[0]);var d_utc_co=new Date(dataUTC[1]);var limitRange=Date.UTC(d_utc.getFullYear(),d_utc.getMonth(),d_utc.getDate()+settings.limitDateRanges);var limitRangeCO=Date.UTC(d_utc_co.getFullYear(),d_utc_co.getMonth(),d_utc_co.getDate()-settings.limitDateRanges);for(var i=0;i<toDayElement.length;i++){var dayselect=toDayElement[i].getAttribute('data-t-date');if(Number(dayselect)<settings.startDate){toDayElement[i].className='t-disabled';}
if(pr_el.hasClass('t-check-out')===true){if(Number(dayselect)<dataUTC[0]){toDayElement[i].className='t-disabled';}
if(Number(dayselect)>dataUTC[1]||Number(dayselect)>=limitRange){toDayElement[i].className='t-disabled';}
if(Number(dayselect)!=0&&Number(dayselect)>dataUTC[0]&&Number(dayselect)<limitRange&&Number(dayselect)!=dataUTC[1]){toDayElement[i].className='t-day';}
if(Number(dayselect)===dataUTC[0]){var Arrow=pr_el.parent().find('.t-arrow');Arrow[0].className=Arrow[0].className.replace(' t-disabled','')+' t-disabled'
Arrow[0].onclick=function(){return;}}
var CI_Arrow=settings.dateCheckIn||toDay;var ci_d=new Date(CI_Arrow);var co_n=Date.UTC(ci_d.getFullYear(),ci_d.getMonth(),ci_d.getDate()+settings.limitDateRanges)
if($(pr_el).find('[data-t-date="'+co_n+'"]')[0]!==undefined){var Arrow=pr_el.parent().find('.t-arrow');Arrow[Arrow.length-1].className=Arrow[Arrow.length-1].className.replace(' t-disabled','')+' t-disabled'
Arrow[Arrow.length-1].onclick=function(){return;}}}
if(Number(dayselect)>dataUTC[0]&&Number(dayselect)<dataUTC[1]&&dataUTC[0]>=settings.startDate&&dataUTC[1]<=limitEndDate){toDayElement[i].className='t-range';}
if(Number(dayselect)>limitEndDate){toDayElement[i].className='t-disabled';}
if(Number(dayselect)===dataUTC[0]){var this_picker=$(toDayElement[i]).parents('.t-datepicker')
if(this_picker.find('.t-input-check-in').val()!=='null'||settings.toDayHighlighted!==false){toDayElement[i].className='t-start';}}
if(Number(dayselect)===dataUTC[1]){var this_picker=$(toDayElement[i]).parents('.t-datepicker')
if(this_picker.find('.t-input-check-out').val()!=='null'||settings.nextDayHighlighted!==false){toDayElement[i].className='t-end';}}
if(Number(dayselect)===toDay){if(settings.toDayShowTitle===true||settings.toDayShowTitle==='true'){appendSpan(toDayElement[i],'t-hover-day','t-hover-day-content',settings.titleToday)
toDayElement[i].className=toDayElement[i].className.replace(' t-today','')+' t-today';}}
var Cn=new Date(Number(dayselect))
Cn=Cn.getDay()
settings.daysOfWeekHighlighted.forEach(function(e){if(Cn==e){toDayElement[i].className=toDayElement[i].className.replace(' t-highlighted','')+' t-highlighted';}})
toDayElement[i].onclick=function(e){e.stopPropagation();if($(this).hasClass('t-disabled')===true){return;}
var data_utc_in,data_utc_out;var get_utc=$(this).attr('data-t-date')
var datepicker=$(this).parents('.t-check-out');get_utc=Number(get_utc)
if($(this).parents('.t-check-in').hasClass('t-check-in')===true){if(Number($(this).attr('data-t-date'))>limitEndDate){return;}
$(pr_el).trigger('selectedCI',Number(get_utc))
var setChangeDate=$(this).parents('.t-check-in').find('.t-input-check-in').val();if(convertDateUTC(convertFormatDf(setChangeDate))!=get_utc){$(pr_el).trigger('onChangeCI',Number(get_utc))}
var d=new Date(dataUTC[1]);var limitdate=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()-settings.limitDateRanges);data_utc_in=get_utc;data_utc_out=dataUTC[1];if(get_utc===settings.startDate&&$(this).hasClass('t-start')===false&&dataUTC[0]>=settings.startDate){data_utc_out=dataUTC[0];}
if(get_utc>dataUTC[1]||get_utc===dataUTC[1]||get_utc<=limitdate){data_utc_out=get_utc;}
if($(this).parents('.t-picker-only').hasClass('t-picker-only')===true){data_utc_out=data_utc_in;}
datepicker=$(this).parents('.t-datepicker').find('.t-check-out')
if(datepicker.length===0){datepicker=$(this_el).find('.t-picker-only')
setTimeout(function(){if($('.t-datepicker-day').length!==0&&settings.autoClose===true){$('.t-datepicker-day').remove()
$('.t-arrow-top').remove()}},10)}}
if($(this).parents('.t-check-out').hasClass('t-check-out')===true){if($(this).hasClass('t-start')===true){return;}
if($(this).parents('.t-datepicker').find('.t-start').length===0&&$(this).hasClass('t-end')===true){return;}
$(pr_el).trigger('selectedCO',Number(get_utc))
var setChangeDate=$(this).parents('.t-check-out').find('.t-input-check-out').val();if(convertDateUTC(convertFormatDf(setChangeDate))!=get_utc){$(pr_el).trigger('onChangeCO',Number(get_utc))}
data_utc_in=dataUTC[0];data_utc_out=get_utc;$(pr_el).trigger('afterCheckOut',[[data_utc_in,data_utc_out]])
setTimeout(function(){if($('.t-datepicker-day').length!==0&&settings.autoClose===true){$('.t-datepicker-day').remove()
$('.t-arrow-top').remove()}},10)}
dataUTC=getDateUTC(data_utc_in,data_utc_out)
$(pr_el).trigger('eventClickDay',[dataUTC])
callEventClick(datepicker,dataUTC)}
if('ontouchstart'in window===false){toDayElement[i].onmouseover=function(e){if($(this).hasClass('t-special-day')===true&&$(this).parents('.t-datepicker-day').length!=0){$(this).parents('.t-datepicker-day').append('<p class="t-date-title">'+$(this).attr('t-date-title')+'</p>')}
function checkNumNight(pr_el,pr_date_utc){var el_hover=Number($(pr_el).attr('data-t-date'));var numDay=0;if(e.target.className.indexOf('t-hover-day-content')!==-1||e.target.className.indexOf('t-disabled')!==-1){return;}
if($(pr_el).parents('.t-check-in').hasClass('t-check-in')===true){var nd=new Date(pr_date_utc[1]);if(el_hover===settings.startDate){if($(pr_el).parents('.t-check-in').find('.t-end').length===0&&$(pr_el).parents('.t-check-in').find('.t-start').length===0){nd=new Date(pr_date_utc[0]);}}
var nd_1=Date.UTC(nd.getFullYear(),nd.getMonth(),nd.getDate());var limitday=Date.UTC(nd.getFullYear(),nd.getMonth(),nd.getDate()-settings.limitDateRanges);if(el_hover<=limitday){return;}
while(el_hover<nd_1){nd_1=Date.UTC(nd.getFullYear(),nd.getMonth(),nd.getDate()-numDay);var t_this=$(pr_el).parents('.t-check-in').find('[data-t-date="'+nd_1+'"]')[0];if(t_this!=undefined){t_this.className=t_this.className.replace(' t-range-limit','')+' t-range-limit';}
numDay++;if(numDay>1000){return;}}}
if($(pr_el).parents('.t-check-out').hasClass('t-check-out')===true){var nd=new Date(pr_date_utc[0]);var nd_1=Date.UTC(nd.getFullYear(),nd.getMonth(),nd.getDate());var limitday=Date.UTC(nd.getFullYear(),nd.getMonth(),nd.getDate()+settings.limitDateRanges);if(el_hover>=limitday){return;}
while(el_hover!=nd_1){nd_1=Date.UTC(nd.getFullYear(),nd.getMonth(),nd.getDate()+numDay);var t_this=$(pr_el).parents('.t-check-out').find('[data-t-date="'+nd_1+'"]')[0];if(t_this!=undefined){t_this.className=t_this.className.replace(' t-range-limit','')+' t-range-limit';}
numDay++;if(numDay>5000){return;}}}
return numDay;}
if(settings.dateRangesHover===true||settings.dateRangesHover==='true'){var numDay=checkNumNight(this,dataUTC)
if(settings.dateRangesShowTitle===true){var num_full=1;if(settings.showFullDateRanges===true){num_full=0;settings.titleDateRange=settings.titleDateRanges;}
if(numDay===2){appendSpan(this,'t-hover-day','t-hover-day-content',((numDay-num_full)+' '+settings.titleDateRange))}else if(numDay>2){appendSpan(this,'t-hover-day','t-hover-day-content',((numDay-num_full)+' '+settings.titleDateRanges))}}}
this.onmouseout=function(){if(this.getElementsByClassName('t-hover-day-content').length!=0){var node=this.getElementsByClassName('t-hover-day-content')[0]
node.parentNode.removeChild(node);this.className=this.className.replace(' t-hover-day','');}
if(document.getElementsByClassName('t-range-limit').length!=0){var a=document.getElementsByClassName('t-range-limit');a=[].slice.call(a)
for(var i=0;i<a.length;i++){a[i].className=a[i].className.replace(' t-range-limit','');}}
if(this.className.indexOf('t-today')!==-1){if(this.getElementsByClassName('t-hover-day-content').length!=0){var node=this.getElementsByClassName('t-hover-day-content')[0]
node.parentNode.removeChild(node);}
appendSpan(this,'t-hover-day','t-hover-day-content',settings.titleToday);this.className=this.className.replace(/\ t-hover-day/g,'')+' t-hover-day';}
if(fnParents(this,'t-datepicker').getElementsByClassName('t-date-title').length!=0){var elem=fnParents(this,'t-datepicker').getElementsByClassName('t-date-title');elem=[].slice.call(elem)
for(var i=0;i<elem.length;i++){elem[i].parentNode.removeChild(elem[i]);}}}}}}
if(settings.fnDataEvent!=undefined&&'ontouchstart'in window===false){for(var cl=0;cl<settings.numCalendar;cl++){var t=new Date(pr_data_utc).getMonth();var m=t+1+cl;if(m===13){m=m-12}
var gMonth=m;var gYear=new Date(pr_data_utc).getFullYear();for(var i=0;i<toDayElement.length;i++){var getNum=Number(toDayElement[i].textContent)
if(isNaN(getNum)){getNum=new Date(toDay).getDate();}
var getDays=Number(toDayElement[i].getAttribute('data-t-date'));var getMonths=new Date(getDays).getMonth()+1;var key=gYear+'-'+check_num_10(gMonth)+'-'+check_num_10(getNum);if(settings.fnDataEvent[key]!=undefined&&getMonths===m){var cln=toDayElement[i].className;toDayElement[i].className=toDayElement[i].className.replace(' t-special-day','')+' t-special-day';toDayElement[i].setAttribute('t-date-title',check_num_10(getNum)+' '+settings.titleMonths[new Date(getDays).getMonth()]+' - '+settings.fnDataEvent[key])}}}}}
function clickEvent(pr_el,pr_data_utc){var tArrow=pr_el.find('.t-arrow');var df_toDay=new Date(settings.startDate);var end_Date=new Date(convertFormatDf(settings.endDate))
var limitPrevMonth=Date.UTC(df_toDay.getFullYear(),df_toDay.getMonth()-settings.limitPrevMonth);var limitNextMonth=Date.UTC(end_Date.getFullYear(),end_Date.getMonth())||Date.UTC(df_toDay.getFullYear(),df_toDay.getMonth()+numCalendar+settings.limitNextMonth);var newDate=new Date(pr_data_utc)
var y=newDate.getFullYear();var m=newDate.getMonth();var d=newDate.getDate();if(tArrow.length!=0){for(var i=1;i<tArrow.length-1;i++){tArrow[i].innerHTML='';tArrow[i].className=tArrow[i].className.replace(' t-disabled','')+' t-disabled';}
tArrow[0].onclick=function(e){e.stopPropagation()
if(Date.UTC(y,m)>limitPrevMonth){m=m-1;setDaysInMonth(pr_el,Date.UTC(y,m))}}
tArrow[tArrow.length-1].onclick=function(e){e.stopPropagation()
if(Date.UTC(y,m+numCalendar)<limitNextMonth){m=m+1;setDaysInMonth(pr_el,Date.UTC(y,m))}}}
var Arrow_2=pr_el.find('.t-arrow');if(Date.UTC(y,m+numCalendar)!=limitNextMonth&&Date.UTC(y,m)===limitPrevMonth){Arrow_2[Arrow_2.length-1].className='t-arrow t-next'
Arrow_2[0].className='t-arrow t-prev t-disabled'}else{Arrow_2[0].className='t-arrow t-prev'}
if(Date.UTC(y,m+numCalendar)===limitNextMonth||new Date(Date.UTC(y,m+numCalendar)).getMonth()===new Date(dataUTC[0]).getMonth()+1){Arrow_2[Arrow_2.length-1].className='t-arrow t-next t-disabled'}
if(Date.UTC(y,m+numCalendar)<limitNextMonth){Arrow_2[Arrow_2.length-1].className='t-arrow t-next'}
return Date.UTC(df_toDay.getFullYear(),df_toDay.getMonth()+numCalendar+settings.limitNextMonth,df_toDay.getDate());}
function getTableCalendar(pr_el,pr_date_utc){if($(pr_el).find('.t-datepicker-day').length!==0){$('.t-datepicker-day').remove();$('.t-arrow-top').css({'display':'none'})
$('html').removeClass('t-datepicker-open')}else{if($(pr_el).parents('.t-datepicker').hasClass('t-datepicker').length!==0){$('.t-datepicker-day').remove();$('.t-arrow-top').css({'display':'none'})}
if(settings.iconArrowTop===true){var this_el_arrow=$(pr_el).parents('.t-datepicker');if(this_el_arrow.find('.t-arrow-top').length===0){this_el_arrow.append('<span class="t-arrow-top"></span>')}
var CI_CO_width=$(pr_el).position().left+$(pr_el).outerWidth()/2
var leftArrTop=this_el_arrow.find('.t-arrow-top').outerWidth()/2
if(this_el_arrow.find('.t-arrow-top').css('display')==='block'){this_el_arrow.find('.t-arrow-top').css({'left':CI_CO_width-leftArrTop+'px'})}
this_el_arrow.find('.t-arrow-top').css({'display':'block'})
this_el_arrow.find('.t-arrow-top').animate({'left':CI_CO_width-leftArrTop+'px'},settings.durationArrowTop)}
$(pr_el).find('.t-dates').parent().append('<div class="t-datepicker-day'+checkNumCalendar+'">'+convertArrayToString(dataTheme)+'</div>')
setDaysInMonth($(pr_el).find('.t-dates').parent(),pr_date_utc)
$('html').addClass('t-datepicker-open')}}
var pr_callback='';function callEventClick(pr_callback,pr_date_utc){this_el.find('.t-dates').on('click',function(e){if($(e.target).parents('.t-check-in').hasClass('t-check-in')===true){$(e.target).trigger('clickDateCI',[pr_date_utc]);}
if($(e.target).parents('.t-check-out').hasClass('t-check-out')===true){$(e.target).trigger('clickDateCO',[pr_date_utc]);}
if($('.t-datepicker-day').length===0){$(this).trigger('beforeShowDay');}
var click=$(this).parent();if($(this).parents('.t-datepicker').find('.t-input-check-in').val()==='null'&&$(this).parents('.t-check-out').find('.t-input-check-out').val()==='null'){click=$(e.target).parents('.t-datepicker').find('.t-check-in');$(e.target).trigger('clickDateCI',[pr_date_utc]);}
getTableCalendar(click,pr_date_utc[0])
setTimeout(function(){if($('.t-datepicker-day').length!==0){$(e.target).trigger('afterShowDay');}else{$(e.target).trigger('toggleAfterHideDay');}},1)})
if(pr_callback!=''){getTableCalendar(pr_callback,pr_date_utc[0]);}}
callEventClick(pr_callback,dataUTC)
setTimeout(function(){if(typeof(pr_el)==='string'&&pr_el==='show'){if(this_el.find('.t-datepicker-day').length===0){this_el.each(function(e){if(settings.iconArrowTop===true){if($(this).find('.t-arrow-top').length===0){$(this).append('<span class="t-arrow-top"></span>')}
var CI_width=$(this).find('.t-check-in').outerWidth()
$(this).find('.t-arrow-top').css({'left':CI_width/2-10+'px','display':'block'})}
$(this).find('.t-check-in').append('<div class="t-datepicker-day'+checkNumCalendar+'">'+convertArrayToString(dataTheme)+'</div>')
setDaysInMonth($(this).find('.t-check-in'),dataUTC[0])
$('html').addClass('t-datepicker-open')})}}},5)
if(typeof(pr_el)==='string'&&pr_el==='hide'){$('html').removeClass('t-datepicker-open')
setTimeout(function(){$('html').addClass('t-datepicker-open')},5)}
return this;}
$('html').on('click',function(e){if($(this).hasClass('t-datepicker-open')===true){setTimeout(function(){if($(e.target).parents('.t-datepicker').hasClass('t-datepicker')===false&&$('.t-datepicker-day').length>0){$('.t-datepicker-open').removeClass('t-datepicker-open')
$('.t-datepicker-day').remove()
$('.t-arrow-top').remove()}},1)}});}(jQuery));