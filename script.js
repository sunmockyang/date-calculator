function appendUnitString(a,b,c){return c>0?(""===a?"":" ")+c+" "+(1!==c?b+"s":b):""}var DCA={};DCA.getDaysBetween=function(a,b){if(a.getTime()>b.getTime())return DCA.getDaysBetween(b,a);var e=a.getFullYear(),f=b.getFullYear(),g=a.getMonth(),h=b.getMonth(),i=a.getDate(),j=b.getDate();i>j&&(j+=DCA.getDaysInMonth(g++,e)),g>h&&(h+=12,e++),days=Math.round((b.getTime()-a.getTime())/864e5);var k="",l=f-e,m=h-g,n=j-i;k=appendUnitString(k,"year",l),k+=appendUnitString(k,"month",m),k+=appendUnitString(k,"day",n),console.log(k),console.log(days)},DCA.addTime=function(a,b){},DCA.getDaysInMonth=function(a,b){return new Date(b,a,0).getDate()},console.log(DCA.getDaysBetween(new Date(2017,1,1),new Date(2016,0,1)));
