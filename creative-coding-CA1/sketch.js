let data;
let cleanedData =[];
let charts =[]

function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header')
}

function setup(){
    createCanvas(1800, 1600);
    angleMode(DEGREES);
    noLoop();
    cleanData(); 
    
    charts.push(
        new BarChart({
          data: cleanedData,
          xValue: "Age_Group",
          yValue: "Female",
          barWidth: 25,
        })
      );
    
      charts.push(
        new HorizontalBarchart({
          data: cleanedData,
          xValue: "Age_Group",
          yValue: "Female",
          barWidth: 15,
          chartPosX: 800,
        })
      );
    
      charts.push(
        new StackedBarchart({
          data: cleanedData,
          xValue: "Age_Group",
          yValue: "Female",
          barWidth: 15,
          chartPosY: 1000,
          yValues: ["Male", "Female"],
        })
      );
      charts.push(
        new ClusteredBarChart({
          data: cleanedData,
          xValue: "Age_Group",
          yValue: "Female",
          barWidth: 15,
          chartPosX: 800,
          chartPosY: 1000,
          yValues: ['Male', 'Female']
        })
      );

      charts.push(
        new LineChart({
          data: cleanedData,
          xValue: "Age_Group",
          yValue: "Female",
          barWidth: 25,
          chartPosX: 200,
          chartPosY: 1500,
        })
      );
}

function draw(){
    background(255);
    charts.forEach(chart =>{
        chart.renderBars();
        chart.renderAxis();
        chart.renderLabels();
        chart.renderTicks();
    })

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