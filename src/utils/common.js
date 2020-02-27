export function getLocalTime(now) {
    let time = new Date(now*1000);
    console.log(time)
    let year=time.getFullYear();
    let month=time.getMonth()+1;
    let date=time.getDate();
    let hour=time.getHours();
    let minute=time.getMinutes();
    let second=time.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}