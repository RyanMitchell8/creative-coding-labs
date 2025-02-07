class BarChart{
    constructor(_data,_xValue, _yValue, _chartHeight, _chartWidth, _barWidth, _margin,  _axisThickness, _chartPosX, _chartPosY, _axizColour, _barColour, _textColour) {
        this.data = _data;
        this.xValue = _xValue;
        this.yValue = _yValue;
        this.chartHeight = _chartHeight;
        this.chartWidth= _chartWidth;
        this.barWidth = _barWidth;
        this.margin = _margin;
        this.axisThickness = _axisThickness;
        this.chartPosX = _chartPosX;
        this.chartPosY = _chartPosY;

        this.gap =  (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);;
        this.scaler =  this.chartHeight/(max(cleanedData.map(row => row[this.yValue])));;

        this.axizTickColour= color(100);
        this.axizColour = color(200, 0, 0);
        this.barColour = color(0, 255, 150);
        this.textColour =color(130,);
        this.Ticks =5;
        this.numTicks =10;

    }
    renderBars(){
        push()
    translate(this.chartPosX,this.chartPosY)

    push()
    translate(this.margin,0)
    for(let i = 0; i<this.data.length; i++){
        let xPos = (this.barWidth + this.gap)*i;
        fill(this.barColour)
        noStroke()
        rect (xPos,0,this.barWidth,-this.data[i][this.yValue]*this.scaler)

    }
    pop()

    pop()
    }

    renderAxis(){
        push()
    translate(this.chartPosX,this.chartPosY)
    noFill()
    stroke(this.axizColour)
    strokeWeight(this.axisThickness)
    line (0,0,0,-this.chartHeight)// Y axis
    line (0,0,this.chartWidth,0)// X axis

    pop()
    }

    renderLabels(){
        push()
    translate(this.chartPosX,this.chartPosY)


    push()
    translate(this.margin,0)
    for(let i = 0; i<this.data.length; i++){
        let xPos = (this.barWidth + this.gap)*i;
        fill(this.textColour)
        noStroke()
        textAlign(LEFT, CENTER);
        textSize(10)
        push()
        translate(xPos + this.barWidth/2,10)
        rotate(45)
        text(this.data[i][this.xValue],0,0);
        pop()
    }
    pop()

    pop()
    }

    renderTicks(){
        push()
        translate(this.chartPosX,this.chartPosY)
        noFill()
        stroke(this.axizTickColour)
        strokeWeight(this.axisThickness)

        let tickIncerment = this.chartHeight/this.Ticks;
        for(let i =0; i<=this.Ticks; i++){
            line(0,-tickIncerment*i,-this.numTicks,-tickIncerment*i)
        }

    pop()
    }
}