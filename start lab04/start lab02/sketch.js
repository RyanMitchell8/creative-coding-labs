let friend01 = {name:"David", age:100, boweling:true};
let friend02 = {name:"Peter", age:22, boweling:false};
let friend03 = {name:"Steve", age:26, boweling:true};
let friend04 = {name:"Jake", age:21, boweling:false};
let friend05 = {name:"Eoin", age:24, boweling:false};

let friends =[];
let friendsAges = [];
let friendBowleingAges = [];

friends.push(friend01);
friends.push(friend02);
friends.push(friend03);
friends.push(friend04);
friends.push(friend05);

for(let index=0; index<5; index++){
    friendsAges.push(friends[index].age)
}

for(let index=0; index<5; index++){
    if(friends[index].boweling == true){
        friendBowleingAges.push(friends[index].age)
    }
}

function calcAvg(arrayNums){
    //decalre a starting value(set it to 0)
    let startValue=0;
 
    //loop through the array, add values to startvalue then end the loop
    for (let i = 0; i < arrayNums.length; i++){
        startValue = startValue + arrayNums[i]
    }

    //then you return the value 
    return startValue/arrayNums.length;

}


// for(let i =0; i<100; i++){
//     if(i%5==0){console.log(i)}
// }

function median(arrayNums){
    if(arrayNums.length%2==0){
        console.log("its even")
    } else{
        return arrayNums[Math.floor(arrayNums.length/2)]
    }
}

function median(arrayNums){
    arrayNums.sort((a,b) => (a-b))

    if(arrayNums.length%2==0){
        let endNum = arrayNums.length/2
        let startNum = endNum -1

        return (arrayNums[startNum] + arrayNums[endNum])/2
    } else{
        return arrayNums[Math.floor(arrayNums.length/2)]
    }
}

