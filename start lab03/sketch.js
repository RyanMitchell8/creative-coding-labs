let data;
let cleanedData =[];

let charts =[]

function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header')
}

// function setup(){
//     createCanvas(800, 800);
//     angleMode(DEGREES);
//     noLoop();
//     cleanData();
//     femaleScores = cleanedData.map(row => row.Female)
//     ageGroups = cleanedData.map(row => row.Age_Group)
//     console.log(femaleScores,ageGroups);


//     gap = (chartWidth - (femaleScores.length * barWidth) - (margin*2))/(femaleScores.length-1);
//     scaler = chartHeight/(max(femaleScores));


//     axizColour = color(200, 0, 0);
//     barColour = color(0, 255, 150);
//     textColour = color(20, 100, 0);
// }
function setup(){
    createCanvas(600, 600);
    angleMode(DEGREES);
    noLoop();
    cleanData(); 
    charts.push(new BarChart(cleanedData,"Age_Group","Female",400,400,10,15,2,50,450,50,20,30))
}

function draw(){
    background(255, 100, 100);
    charts.forEach(chart =>{
        chart.renderBars();
        chart.renderAxis();
        chart.renderLabels();
        chart.renderTicks();
    })
    // push()
    // translate(chartPosX,chartPosY)
    // noFill()
    // stroke(axizColour)
    // strokeWeight(axisThickness)
    // line (0,0,0,-chartHeight)// Y axis
    // line (0,0,chartWidth,0)// X axis

    // push()
    // translate(margin,0)
    // for(let i = 0; i<femaleScores.length; i++){
    //     let xPos = (barWidth + gap)*i;
    //     fill(barColour)
    //     noStroke()
    //     rect (xPos,0,barWidth,-femaleScores[i]*scaler)

    //     fill(textColour)
    //     noStroke()
    //     textAlign(LEFT, CENTER);
    //     textSize(10)
    //     push()
    //     translate(xPos + barWidth/2,10)
    //     rotate(45)
    //     text(ageGroups[i],0,0);
    //     pop()
    // }
    // pop()

    // pop()

    
    

    // let femaleAges = [];
    // [0,0,13,17......] we need to get this first before we move on.
    // for(let i=0; i<cleanedData.length; i++){
    //     console.log(i)
    //     femaleAges.push(cleanedData[i].Female)
    //    console.log(femaleAges)
    // }


    // cleanedData.forEach(
    //     function(row){
    //         femaleAges.push(row.Female);
    //     }
        
    // )
    // console.log(femaleAges);


    // cleanedData.forEach(
    //     row => {femaleAges.push(row.Female)}
    // );


    // let femaleScores = cleanedData.map(row => row.Female)
    // let ageGroups = cleanedData.map(row => row.Age_Group)

    

    // console.log(femaleScores,ageGroups);

}

function cleanData(){
    for(i =0; i < data.rows.length; i++){
        cleanedData.push(data.rows[i].obj)
    }

    for(i =0; i < cleanedData.length; i++){
        cleanedData[i].Female = parseInt(cleanedData[i].Female)
        cleanedData[i].Male = parseInt(cleanedData[i].Male)
        cleanedData[i].Total = parseInt(cleanedData[i].Total)

    }
}

// class Friend {
//     constructor(name, number) {
//       this.name = name;
//       this.number = number;
//     }
//   }

//   class Friend {
//     constructor(_name, _number) {
//       this.name = _name;
//       this.number = _number;
//     }

    
//   }

//   let friends = [];
//   friends.push(new Friend("Dave", 444));
//   friends.push(new Friend("Ryan", 994));
//   console.log(friends)


// class Friend {
//     constructor(_name, _number) {
//       this.name = _name;
//       this.number = _number;
//     }

//     report(){
//         console.log(this.name, this.number);
//     }
//   }

//   let friends = [];
//   friends.push(new Friend("Dave", 444));
//   friends.push(new Friend("Ryan", 994));
//   console.log(friends)
