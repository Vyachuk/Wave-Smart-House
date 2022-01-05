/********** ******* ******* ******* ******* *******
                        DEVICES
********** ******* ******* ******* ******* *******/
const tv = {
    name: "TV",
    id: 'tv',
    img: 'css/images/icons/tv.png',
    switch: false,
    volume: 0,
    page: ["Інтер", "Україна", "1+1", "НТН", "К-1", "Перший", "ICTV", "Enter-фільм", "ZOOM",
    "Індиго", "СТБ", "ТЕТ", "К-2", "Новий канал", "М-1", "Прямий", "Культура", "РАДА", "Україна 24", 
    "ЛЬВІВ", "112-UA(Вибір)", "24", "Правда тут Львів", "5 канал", "Мега", "Pixel", "XSport", 
    "НЛО ТБ", "2+2", "ZIK", "Еспресо ТБ", "ПЛЮС ПЛЮС", "4 канал"]
}
const microwave = {
    name: "Microwave",
    id: 'microwave',
    img: 'css/images/icons/microwave.png',
    switch: false,
    time: 0,
    power: 0
}
const oven = {
    name: 'Oven',
    id: 'oven',
    img: 'css/images/icons/oven.png',
    switch: false,
    time: 0,
    temp: 0,
    mode: 'down',
    cooler: false,
    program: '1'
}
const dishWasher = {
    name: 'Dish Washer',
    id: 'dishwash',
    img: 'css/images/icons/dishwash.png',
    switch: false,
    time: 0,
    power: 0
}
const washmach = {
    name: 'Wash. Mach',
    id: 'washmach',
    img: 'css/images/icons/washmach.png',
    switch: false,
    mode: 'Cotton',
    spin: 600,
    temp: 30
}
const radiator = {
    name: 'Radiator',
    id: 'radiator',
    img: 'css/images/icons/radiator.png',
    temp: 40
}
const keetle = {
    name: 'Keetle',
    id: 'keetle',
    img: 'css/images/icons/keetle.png',
    switch: false
}
const garageDoor = {
    name: 'Garage door',
    id: 'garageDoor',
    img: 'css/images/icons/garagedoor.png',
    switch: false
}
const light = {
    name: 'Light',
    id: 'light',
    img: 'css/images/icons/lump.png',
    switch: false
}
const devices = [tv, microwave, oven, dishWasher, washmach, radiator, keetle, garageDoor, light];
/********** ******* ******* ******* ******* *******
                        Application weather: 08254abc1707df94e5f9110b4f7b0c11
********** ******* ******* ******* ******* *******/
let settingsWindow = document.querySelector('#settings');
let settingRoomList = document.querySelector('#settingroomlist')
let startButton = document.querySelector('#startWindow button');
let app = document.querySelector('#app');
let weatherBlock = document.querySelector('#weather');
startButton.onclick = function() {
    let input = document.querySelectorAll('#inputLogin > input');
    let person = {
        'name': input[0].value,
        'city': input[1].value[0].toUpperCase() + input[1].value.substring(1)
    }
    localStorage.setItem('person', JSON.stringify(person));
    checkWeather(person.city);
    if(person.name == '' || person.city == '') new Feed(`Fill in the gaps!`)
    else {
        appStart(person);
    }
}
function appStart(person) {
    let ownerPlace = document.getElementById('owner');
    ownerPlace.innerHTML = `${person.name}<button onclick="deletePerson()" class="btn owner"></button> <br>${person.city} `;
    startWindow.style.display = "none";
    app.style.display = "block";
    weatherBlock.style.display = 'block';
    document.body.querySelector('header').style.display = 'block';
    if(allRooms.length == 0) {
        let nameOfRoom = document.querySelector('#app span');
        nameOfRoom.innerHTML = '<center><p style="font-size: 150px; background-color: rgb(220,220,220); border: 1px solid; border-radius: 20px; padding: 0; \
        width: 200px; height:200px; cursor: pointer; margin-top: 30px;" onclick="newRoomWindow()">+</p></center><br>Add new Room';
    }
    else checkRoom(0); 
}
function deletePerson() {
    localStorage.removeItem('person');
    startWindow.style.display = "block";
    deviceMenu.style.display = 'none';
    app.style.display = "none";
    roomWindow.style.display = 'none';
    settingsWindow.style.display = 'none';
    weatherBlock.style.display = 'none';
    document.body.querySelector('header').style.display = 'none';
    let ownerPlace = document.getElementById('owner');
    ownerPlace.innerText = ``;

}
let navButtonRooms = document.querySelector('#addNewRoomButton');
let roomWindow = document.querySelector('#addNewRoomWindow');
navButtonRooms.addEventListener('click', newRoomWindow);
function newRoomWindow() {
    app.style.display = 'none';
    roomWindow.style.display = 'block';
    weatherBlock.style.display = 'none';
}


let addRoom = document.querySelector('#addNewRoomWindow button');
if(!localStorage.hasOwnProperty('count')) {
    localStorage.setItem('count', 0);
}    
let roomCount = localStorage.getItem('count');  
addRoom.addEventListener('click', function() {
    let name = document.querySelector('#roomName').value;
    let area = document.querySelector('#roomArea').value;
    addNewRoom(roomCount, name, area);
    checkRoom(roomCount);
    roomCount++;
    localStorage.setItem('count', roomCount);
    roomWindow.style.display = 'none';
    app.style.display = 'block';
    localStorage.setItem('rooms', JSON.stringify(allRooms));
    new Feed(`New room: ${name} with ${area}m² is add!`);
});
let deviceMenu = document.querySelector('#deviceMenu');
let deviceMenuButton = document.querySelector('#devicesList');
deviceMenuButton.addEventListener('click', function() {
    deviceMenu.style.display = 'block';
    startWindow.style.display = "none"; //Робота з блоками
    app.style.display = "none";
    roomWindow.style.display = 'none';
    settingsWindow.style.display = 'none';
})
function pushRoomToArr(count,name,area) {
    let rooms = {
        id: count,
        name: name,
        area: area
    };
    allRooms.push(rooms);
}
let roomList = document.querySelector('#roomList');
const allRooms = [];
function addNewRoom(count, name, area) { 
    addNewButton (count, name);
    pushRoomToArr(count,name,area);
}
function addNewButton (count, name) { 
    let li = document.createElement('li');
    roomList.appendChild(li);
    let a = document.createElement('a');
    a.href = "#";
    a.innerHTML = `${name}<button class='btn'></button>`;
    a.id = count;
    a.setAttribute("onclick", `checkRoom(${count})`);
    li.appendChild(a);
}   
roomList.addEventListener('click', function(e){
    if(e.target && e.target.nodeName == "BUTTON") {
        deleteRoomFromArr(e.target.parentNode.id);
        e.target.parentNode.remove();
        new Feed(`Room: ${e.target.parentNode.innerText} is removed!`);
    }
});

function deleteRoomFromArr(id){
    allRooms.splice(id,1);
    while (roomList.children.length > 1) {
        roomList.removeChild(roomList.lastChild);
    }
    for(let i = 0; i < allRooms.length; i++) {
        allRooms[i].id = i;
        addNewButton(allRooms[i].id, allRooms[i].name);
    }
    if(allRooms.length > 0) {
        checkRoom(0);
    } else {
        roomWindow.style.display = 'block';
        app.style.display = 'none';
    }
    roomCount = allRooms.length;
    localStorage.setItem('count', roomCount);
    localStorage.setItem('rooms', JSON.stringify(allRooms));
}
function checkRoom(roomC) { // провіряємо ДІВ елемент по масиву
    roomWindow.style.display = 'none';
    settingsWindow.style.display = 'none';
    deviceMenu.style.display = 'none';
    weatherBlock.style.display = 'block';
    app.style.display = 'block';
    let room = allRooms[roomC].name;
    let area = allRooms[roomC].area;
    let nameOfRoom = document.querySelector('#app p');
    nameOfRoom.innerText = `${room}: (${area}m²)`;
    showItem(roomC);
}
function showItem(roomC) { //записуємо додані ітеми в масив
    for(let i = 0; i < 12; i++) {
        let block = document.querySelector(`#block_${i}`);
        block.style.display = 'none';
        removeAllChildren(block);
    }
    let nameOfRoom = document.querySelector('#app span');
    nameOfRoom.innerHTML = '';
    if(Object.keys(allRooms[roomC]).length <= 3) {
        nameOfRoom.innerHTML = '<center><p style="font-size: 150px; background-color: rgb(220,220,220); border: 1px solid; border-radius: 20px; padding: 0; \
        width: 200px; height:200px; cursor: pointer; margin-top: 30px;" onclick="settings()">+</p></center><br>Add new device';
    }
    else {
        for(let i = 3; i < Object.keys(allRooms[roomC]).length; i++) {
            let block = document.querySelector(`#block_${i-3}`);
            block.style.display = 'inline-table';
            showDeviceBlock(roomC, block, i);
        }
    }
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////?/     START DEVICES      ////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function showDeviceBlock(roomId, block, devKey) {
    let device = allRooms[roomId][devKey];
    let switchIco;
    if(device.switch) switchIco = 'css/images/icons/shutOn.png';
    else switchIco = 'css/images/icons/shutOf.png';
    let head = `<p><img onclick='switchDevice(${roomId}, ${devKey}, this)' style='margin-left:-10px;float:left;cursor:pointer;' src='${switchIco}'></img>${device.name} <img src='${device.img}'></img><button onclick="removeBlock(${block.id},${roomId},${devKey})" class="crosbtn">X</button></p>`
    let power = `<input type="range" name="${roomId}_${devKey}" value="${device.power}" min="0" max="5" style="width:130px" step="1" oninput="changePower(this)"><output style="font-size:16px;">${switchPower(device)}</output> `
    let time = `<input type="range" class="tim" name="${roomId}_${devKey}" value="${device.time}" min="0" max="3590" style="width:130px" step="10" oninput="changeTime(this)"><output style="font-size:16px;">Time: ${checkDeviceInfo(device, 'time')}</output> `
    switch(device.id) {
        case "tv":
            let select = document.createElement('select');
            if(device.hasOwnProperty('channel')) select.innerHTML = `<option selected>${device.channel}</option>`;
            else select.innerHTML = `<option disabled selected>Select channel!</option>`;
            for(let i=0; i<device.page.length; i++) {
                let option = document.createElement('option');
                option.innerText = option.value = device.page[i];
                select.appendChild(option);
            }
            select.addEventListener('change', function() {
                device.channel = select.value;
                new Feed(`Selected channel: ${select.value}!`);
                localStorage.setItem('rooms', JSON.stringify(allRooms));
            })
            let volume = `<a style="vertical-align:middle; float: left;"><img style="width:15px;height:15px;" name="${roomId}_${devKey}" onclick="changeVolume(this)" value="1" src="css/images/icons/volume.png">
            </img></a><input type="range" name="${roomId}_${devKey}" value="${device.volume}" min="1" max="100" oninput="changeVolume(this)"><output>${device.volume}</output>`;
            block.innerHTML = `${head} <div>${volume}</div>`;
            block.children[1].appendChild(select); 
            break;
        case "microwave":  
            block.innerHTML = `${head} <div><p>${power}</p> <p>${time}</p></div>`;
            break;
        case "oven":
            let program = `<input type="range" name="${roomId}_${devKey}" value="${device.program}" min="0" max="5" style="width:130px" step="1" oninput="changeProgram(this)"><output style="font-size:16px;">${switchProgram(device)}</output> `
            block.innerHTML = `${head} <div><p>${slider(device, roomId, devKey, 0, 250, 130, 2,'temp')}</p>\
            <p>${program}</p><p>${time}</p></div>`;
            break;   
        case "dishwash":
            block.innerHTML = `${head} <div><p>${time}</p><p>${power}</p></div>`;
            break;
        case "washmach":
                let mode = `<ul style='text-align:left;width:80px;padding:0;margin:0; font-size:16px;' class='settingsdevice'><li>Mode<ul>
                <li onclick="changeMode(this, ${roomId}, ${devKey})">Cotton</li>
                <li onclick="changeMode(this, ${roomId}, ${devKey})">Synthetics</li>
                <li onclick="changeMode(this, ${roomId}, ${devKey})">Delicates</li>
                <li onclick="changeMode(this, ${roomId}, ${devKey})">Quick wash</li>
                <li onclick="changeMode(this, ${roomId}, ${devKey})">Hard wash</li></ul></li></ul>`;
            block.innerHTML = `${head} <div><p>${slider(device, roomId, devKey, 30, 90, 130, 10, 'temp')}</p>\
            <p>${slider(device, roomId, devKey, 500, 1200, 130, 100, 'spin')}</p><div style="display: flex">${mode} : <span>${device.mode}</span></div></div>`;
            break; 
        case "radiator":
            block.innerHTML = `${head} <div><p>${slider(device, roomId, devKey, 20, 90, 130, 1, 'temp')}</p></div>`;
            break;
        case "keetle":
            block.innerHTML = `${head} <div></div>`;
            break;
        case "garageDoor":
            block.innerHTML = `${head} <div></div>`;
            break;
        case "light":
            block.innerHTML = `${head}<div></div>`;
            break;
    }
    if(device.switch) block.children[1].setAttribute('style', 'display:block');
    else block.children[1].setAttribute('style', 'display:none');  
}
function changeMode(e, room, val) {
    e.parentNode.parentNode.parentNode.nextElementSibling.innerText = e.innerText;
    let char = {
        name: `${room}_${val}`,
        value: e.innerText
    }
    new Feed(`Washing Machine mode: ${char.value}!`);
    saveToRooms(char,'mode');
}
function slider(device, room, key, min, max, leng, step, dev) {
    let slid = `<input type="range" name="${room}_${key}" value="${device.temp}" \
    min="${min}" max="${max}" style="width:${leng}px" step="${step}" oninput="changeSlider(this, '${dev}')"><output \
    style="font-size:16px;">${checkDeviceInfo(device, dev)}</output> `
    return slid;
}
function changeProgram(e) {
    e.nextElementSibling.value = switchProgram(e);
    saveToRooms(e,'program');
}
function dev(e) {
    let arr = e.name.split('_');
    [f,s] = arr;
    let device = allRooms[f][s];
    return device;
}
function switchProgram(e) {
    let m;
    let pName;
    if(Object.keys(e).length > 0) m = e.program;
    if(Object.keys(e).length == 0) m = e.value;
    switch(m) { 
        case '0': pName = '-';
        if(Object.keys(e).length == 0) {
            let device = dev(e);
            device.mode = 'up';
            device.cooler = false;
            new Feed(`Oven program: ${pName}!`);
        }
        break;
        case '1': pName = '_';
        if(Object.keys(e).length == 0) {
            let device = dev(e);
            device.mode = 'down';
            device.cooler = false;
            new Feed(`Oven program: ${pName}!`);
        }
        break;
        case '2': pName = '=';
        if(Object.keys(e).length == 0) {
            let device = dev(e);
            device.mode = 'both';
            device.cooler = false;
            new Feed(`Oven program: ${pName}!`);
        }
        break;
        case '3': pName = '-*';
        if(Object.keys(e).length == 0) {
            let device = dev(e);
            device.mode = 'up';
            device.cooler = true;
            new Feed(`Oven program: ${pName}!`);
        }
        break;
        case '4': pName = '_*';
        if(Object.keys(e).length == 0) {
            let device = dev(e);
            device.mode = 'down';
            device.cooler = true;
            new Feed(`Oven program: ${pName}!`);
        }
        break;
        case '5': pName = '=*';
        if(Object.keys(e).length == 0) {
            let device = dev(e);
            device.mode = 'both';
            device.cooler = true;
            new Feed(`Oven program: ${pName}!`);
        }
        break;
    }
    return `Program: ${pName}`;
}
function removeBlock(block, room, key) {
    block.style.display = 'none';
    removeDevice(allRooms, [room, key]);
    for(let m = key; m < Object.keys(allRooms[room]).length; m++) {
        allRooms[room][m] = allRooms[room][m+1];
        if(m+1 == Object.keys(allRooms[room]).length) {
            removeDevice(allRooms, [room, m]);
        }
    }
    device = `${allRooms[room][key].name}`;
    place = `${allRooms[room].name}`;
    new Feed(`Device: ${device} is removed from: ${place}!`);
    showItem(room);
}
function checkDeviceInfo(e, char) {
    if(Object.keys(e).length > 0) {     // при оновлені сторінки!
        if(e.id == 'oven' && char == 'temp' || e.id == 'radiator' || e.id == 'washmach' && char == 'temp' ) return `Temp: ${e.temp} ℃`;
        if(e.id == 'washmach' && char == 'spin') return `Spin: ${e.spin}`;
        if(e.id == 'microwave' || e.id == 'oven' && char == 'time' || e.id == 'dishwash') {
            let time = `${Math.trunc(e.time/60)} min. ${e.time % 60} sec.`;
            return time;
        };
    } else { //при зміні в онлайн
        let arr = e.name.split('_');
        [f,s] = arr;
        let device = allRooms[f][s];
        //Провіряємо на відповідність до девайсів
        if(device.id == 'microwave' || device.id == 'oven' && e.className == 'tim' || device.id == 'dishwash') {
            let time = `${Math.trunc(e.value/60)} min. ${e.value % 60} sec.`;
            new Feed(`${device.name}: time is - ${time}`);
            return `Time: ${time}`;
        }    
        if(device.id == 'washmach' && char == 'spin') {
            new Feed(`${device.name}: spin is - ${e.value}`);
            return `Spin: ${e.value}`;
        }
        if(device.id == 'oven' || device.id == 'radiator' || device.id == 'washmach') {
            new Feed(`${device.name}: temperature is - ${e.value} ℃`);
            return `Temp: ${e.value}  ℃`;
        }
    }
}
function switchPower(e) {
    let m;
    let powerName;
    if(Object.keys(e).length > 0) m = e.power;
    if(Object.keys(e).length == 0) m = e.value;
    switch(m) { 
        case '0': powerName = 'Ultra Light';
        break;
        case '1': powerName = 'Light';
        break;
        case '2': powerName = 'Medium';
        break;
        case '3': powerName = 'Medium High';
        break;
        case '4': powerName = 'High';
        break;
        case '5': powerName = 'Ultra High';
        break;
    }
    if(Object.keys(e).length == 0) {
        new Feed(`${dev(e).name} power is - ${powerName}`); 
    }
    return `Power: ${powerName}`;
}
function changeSlider(e, dev) {
    e.nextElementSibling.value = checkDeviceInfo(e,dev);
    saveToRooms(e, dev);
}
function changeTime(e) {
    e.nextElementSibling.value = checkDeviceInfo(e);
    saveToRooms(e,'time');
}
function changePower(e) {
    e.nextElementSibling.innerText = switchPower(e);
    saveToRooms(e,'power');
}
function changeVolume(e) {
    let device = dev(e);
    if(e && e.nodeName == "INPUT") {
        e.nextElementSibling.value = e.value;
        if(e.value > 1) {
            e.previousElementSibling.firstChild.src = 'css/images/icons/volume.png';
        } else {
            e.previousElementSibling.firstChild.src = 'css/images/icons/mute.png';
        }
        device.volume = e.value;
    }
    if(e && e.nodeName == "IMG") {
        e.parentNode.nextElementSibling.value = 1;
        e.parentNode.nextElementSibling.nextElementSibling.value = 1;
        e.src = 'css/images/icons/mute.png'
        device.volume = '1';
    }
    new Feed(`${device.name} volume is - ${device.volume}`);
    localStorage.setItem('rooms', JSON.stringify(allRooms));    
}
function saveToRooms(e,device) {
    let arr = e.name.split('_');
    [f,s] = arr;
    allRooms[f][s][device] = e.value;
    localStorage.setItem('rooms', JSON.stringify(allRooms));
}
function switchDevice(roomId,devKey, e) {
    let device = allRooms[roomId][devKey];
    let png = document.querySelector(`#block_${devKey-3} p > img`);
    let answer;
    if(device.switch) {
        device.switch = false;
        png.setAttribute('src', 'css/images/icons/shutOf.png');
        e.parentNode.nextElementSibling.setAttribute('style', 'display:none');
        answer = `${device.name} is Off!`
        //Switch OFF the TV! 
    }    
    else {
        device.switch = true;
        png.setAttribute('src', 'css/images/icons/shutOn.png')
        e.parentNode.nextElementSibling.setAttribute('style', 'display:block');
        answer = `${device.name} is On!`; 
        //Switch ON the TV! 
    }
    new Feed(answer);
    localStorage.setItem('rooms', JSON.stringify(allRooms));    
}
//////////////////////////////////////////////////////////////////////////////
/////////////////////////     END OF DEVICES      ////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/// Devices list
let navButtonDevices = document.querySelector('#devicesList');

document.addEventListener("DOMContentLoaded", function() {  
    const allRoomsLocal = JSON.parse(localStorage.getItem('rooms')); 
    if (localStorage.hasOwnProperty('rooms')) {
    for(let i = 0; i < allRoomsLocal.length; i++) {
        addNewRoom(allRoomsLocal[i].id, allRoomsLocal[i].name, allRoomsLocal[i].area);
        for(let j = 3; j < Object.keys(allRoomsLocal[i]).length; j++) {
            addDeviceToArr(i, allRoomsLocal[i][j]);
        }
    } 
    if(localStorage.hasOwnProperty('person')) {
        const person = JSON.parse(localStorage.getItem('person')); 
        appStart(person);
        checkWeather(person.city);
    }
}
});
function checkWeather(city) {
    let linkWeather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=70e1ed322b02acbc57d443dd91065f3e`
        fetch(linkWeather)
        .then(function(resp) {return resp.json() })
        .then(function(data) {
            let weatherBox = document.querySelector('#weatherBox');
            let date = new Date();
            let wind = data.weather[0]['description'];
            let icon = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`
            weatherBox.innerHTML = `<div style="font-size:16px;"><br>${date.toDateString()}<br><div style="font-size:22px;">${Math.round(data.main.temp - 273)}&degC</div>\
            <br><img src="${icon}"></img><div style="font-size:15px">Description: ${wind}</div>`
            console.log(data)
        })
}
/* ********* ******* ******* ******* ******* *******
        Settings (функція спрацьовує по кнопці)
**** ***** ****** ******* ******* ******* ******* */
function settings() {
    removeAllChildren(settingRoomList);
    /******* Формуємо структуру тегів в середині Settings *******/
    for(let i = 0; i < allRooms.length; i++) {
        let div = document.createElement('div');
        div.innerText = `${i+1}. ${allRooms[i].name} with ${allRooms[i].area}m².`;
        settingRoomList.appendChild(div);
        let childDiv = document.createElement('div');
        div.appendChild(childDiv);
        let thirdDiv = document.createElement('div');
        thirdDiv.className = 'settingsiconbox';
        showIconBox(thirdDiv, i);
        childDiv.before(thirdDiv);
        
    /******* Створення списку всіх девайсів в Settings *******/    
        let ul = document.createElement('ul');
        let ul1 = document.createElement('ul');
        let lili = document.createElement('li');
        lili.innerText = 'Select device';
        ul.id = `listRoom_${i}`;
        ul.className = 'settingsdevice';
        childDiv.appendChild(ul);
        ul.appendChild(lili);
        lili.appendChild(ul1);
        
        for(let m = 0; m < devices.length; m++) { 
            let li = document.createElement('li');
            li.innerHTML = `<img src="${devices[m].img}"></img>${devices[m].name}`;
            ul1.appendChild(li);

    /******* Cтворюємо евент на клік по списку! *******/ 
            li.onclick = function(e) {
                if(Object.keys(allRooms[i]).length >= 15) {
                    new Feed('Is too much devices in array! Max: 12 pieces!');
                }
                else {
                    imgBox = e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling;
                    addDeviceToArr(i, devices[m]);
                    showIconBox(imgBox, i);
                    new Feed(`${devices[m].name} was added to ${allRooms[i].name}.`);
                }
            }
        }
    }
    startWindow.style.display = "none"; //Робота з блоками
    app.style.display = "none";
    roomWindow.style.display = 'none';
    deviceMenu.style.display = 'none';
    settingsWindow.style.display = 'block';
}
function addDeviceToArr(roomId, devID) { //додаємо актуальні дані в AllRooms з localstorage
    devname = Object.keys(allRooms[roomId]).length;
    allRooms[roomId][devname] = devID;
    localStorage.setItem('rooms', JSON.stringify(allRooms));
}    
function showIconBox(imgBox, i) {
    if(imgBox.childElementCount > 0) removeAllChildren(imgBox);  
    for(let j = 3; j < Object.keys(allRooms[i]).length; j++) {
        let img = document.createElement('img');
        img.setAttribute('src', allRooms[i][j].img);
        img.setAttribute('id', `${i},${j},${allRooms[i][j].name}`)
        imgBox.appendChild(img);
        
        img.onclick = function(e) {
            let arr = e.target.id.split(',');
            [f,s,device_name] = arr;
            removeDevice(allRooms, [f,s]);
            for(let m = j; m < Object.keys(allRooms[i]).length; m++) {
                allRooms[i][m] = allRooms[i][m+1];
                if(m+1 == Object.keys(allRooms[i]).length) {
                    removeDevice(allRooms, [i, m]);
                }
            }
            new Feed(`${device_name} was removed from ${allRooms[i].name}.`);
            e.target.remove();
            return settings();
        }
    }  
}
function removeDevice (obj, path_to_key){
    if(path_to_key.length === 1){
        delete obj[path_to_key[0]];
    }else{
        if(obj[path_to_key[0]])
            return removeDevice(obj[path_to_key[0]], path_to_key.slice(1));
    }
    localStorage.setItem('rooms', JSON.stringify(allRooms));
};
function removeAllChildren(id) {
    while (id.firstChild) {
        id.removeChild(id.firstChild);
    }
}
class Feed {
    constructor (message) {
        this.message = message;
        this._autohide = true;
        this.create();
        this.show();
        this._el.addEventListener('click', (e) => {
            if (e.target.classList.contains('feed__close')) {
              this.hide();
            }
          });
    }
    show(){
        this._el.classList.add('feed_show');
      if (this._autohide) {
        setTimeout(() => {
          this.hide();
        }, 5000);
      }
    }
    hide(){
        this._el.classList.remove('feed_show');
        const event = new CustomEvent('hide.feed', { detail: { target: this._el } });
        document.dispatchEvent(event);
    }
    create(){
        const el = document.createElement('div');
        el.classList.add('feed');
        this._el = el;
        let html = `<div class="feed__body"></div><button class="feed__close" type="button"></button>`;
        el.innerHTML = html;
        el.querySelector('.feed__body').textContent = this.message;
        if (!document.querySelector('.feed-container')) {
            const container = document.createElement('div');
            container.classList.add('feed-container');
            document.body.append(container);
          }
          document.querySelector('.feed-container').append(this._el);
    }
}
