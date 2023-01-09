let content = [
    "القاهره", "الاسكندرية", "الجيزه", "بني سويف", "اسوان"
];
for(let cont of content){
    const co = `
    <option value="${cont}">${cont}</option>
    `;
    document.getElementById("city_options").innerHTML += co
}
document.getElementById("city_options").addEventListener("change", function (){
    document.getElementById("city_name").innerHTML = this.value
    if(this.value === "القاهره"){
        upgreat("cario")
    }
    else if(this.value === "الاسكندرية"){
        upgreat("ALAlexandriaX")
    }
    else if(this.value === "الجيزه"){
        upgreat("Giza")
    }
    else if(this.value === "بني سويف"){
        upgreat("Beni Suef")
    }
    else if(this.value === "اسوان"){
        upgreat("Aswan")
    }
    console.log(this.value)
})
function upgreat(cityName) {
    let pramas = {
        country : "EG",
        city : cityName
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params:pramas
      })
      .then(function (response) {
        const timings_all = response.data.data.timings ;
        allTimings("fajr_time",timings_all.Fajr)
        allTimings("zoher_time",timings_all.Dhuhr)
        allTimings("aser_time",timings_all.Asr)
        allTimings("maghrb_time",timings_all.Maghrib)
        allTimings("asha_time",timings_all.Isha)
        const readable = response.data.data.date.readable;
        const weekday = response.data.data.date.hijri.weekday.ar;
        const date = weekday + " | " + readable ;
        document.getElementById("date").innerHTML = date
      })
      .catch(function (error) {
        console.log(error);
      });
}
upgreat("Beni Suef");
function allTimings(id,time){
    document.getElementById(id).innerHTML = time
}  
