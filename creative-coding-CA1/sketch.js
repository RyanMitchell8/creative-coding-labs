let data;
let cleanedData =[];
let charts =[]

function preload(){
    data = loadTable('data/Footballcc.csv', 'csv', 'header');
    font = loadFont(`Merriweather/Merriweather-Black.ttf`);
}

function setup(){
    createCanvas(1800, 1900);
    angleMode(DEGREES);
    noLoop();
    cleanData(); 
    
    charts.push(
        new BarChart({
          data: cleanedData,
          xValue: "Season",
          yValue: "Ronaldo",
          barWidth: 15,
        })
      );
    
      charts.push(
        new HorizontalBarchart({
          data: cleanedData,
          xValue: "Season",
          yValue: "Messi",
          barWidth: 15,
          chartPosX: 1000,
          chartPosY: 450,
        })
      );
    
      charts.push(
        new StackedBarchart({
          data: cleanedData,
          xValue: "Season",
          yValue: "Ronaldo",
          barWidth: 15,
          chartPosY: 1000,
          yValues: ["Messi", "Ronaldo", "Neymar", "Bale"],
          yvalueTotal:  ["Total"],
        })
      );
      charts.push(
        new ClusteredBarChart({
          data: cleanedData,
          xValue: "Season",
          yValue: "Bale",
          barWidth: 10,
          chartPosX: 1050,
          chartPosY: 1000,
          yValues: ['Neymar', 'Bale']
        })
      );

      charts.push(
        new LineChart({
          data: cleanedData,
          xValue: "Season",
          yValue: "Neymar",
          barWidth: 15,
          chartPosX: 200,
          chartPosY: 1600,
        })
      );

      charts.push(
        new PieChart({
          data: cleanedData,
          xValue: "Season",
          yValue: "Ronaldo",
          barWidth: 25,
          chartPosX: 1150,
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
        chart.renderTitle();
    })

}

function cleanData(){
    for(i =0; i < data.rows.length; i++){
        cleanedData.push(data.rows[i].obj)
    }

    for(i =0; i < cleanedData.length; i++){
        cleanedData[i].Ronaldo = parseInt(cleanedData[i].Ronaldo)
        cleanedData[i].Messi = parseInt(cleanedData[i].Messi)
        cleanedData[i].Bale = parseInt(cleanedData[i].Bale)
        cleanedData[i].Neymar = parseInt(cleanedData[i].Neymar)
        cleanedData[i].Total = parseInt(cleanedData[i].Total)
    }
}