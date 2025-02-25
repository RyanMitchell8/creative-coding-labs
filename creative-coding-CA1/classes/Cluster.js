class ClusteredBarChart {
  // Defines a class called BarChart.

  constructor(obj) {
    // Constructor function initializes the chart with multiple properties (data, chart heights widths, colours).

    this.data = obj.data; // Assigns the input data to the property `data`.
    this.xValue = obj.xValue; // Sets the name of the x-axis data field.
    //this.yValue = obj.yValue; // Sets the name of the y-axis data field.
    this.chartHeight = obj.chartHeight || 350; // Sets the height of the chart.
    this.chartWidth = obj.chartWidth || 550; // Sets the width of the chart.
    this.barWidth = obj.barWidth || 15; // Sets the width of each bar.
    this.margin = obj.margin || 15; // Sets the margin around the chart.
    this.axisThickness = obj.axisThickness || 5; // Sets the thickness of the axis lines.
    this.chartPosX = obj.chartPosX || 200; // Sets the X position.
    this.chartPosY = obj.chartPosY || 450; // Sets the Y position.

    // Calculates the gap between bars, considering the total chart width, bar width, and margin.
    this.gap =
      (this.chartWidth - (this.data.length * this.barWidth* 2) - (this.margin * 2)) /
      (this.data.length - 2);

    this.yvalueTotal = "Total";

    this.axizTickColour = color(0); // Light gray for the axis ticks.
    this.axizColour = color(0); // Dark blue for the axis lines.
    this.barColour = color(50, 170, 200); // Soft blue for the bars.
    this.textColour = color(50); // Dark gray for the text labels on the x-axis.

    this.Ticks = 8; // Sets the number of ticks on the Y-axis.
    this.numTicks = 10; // Sets the number of ticks on the X-axis.

    this.maxValue = 0;

    this.yValues = obj.yValues;

    this.maxValues = [];

    this.yValues.forEach((yValue) =>
      this.maxValues.push(this.data.map((row) => row[yValue]))
    );

    this.maxValue = max(this.maxValues.flat(5));

    // Calculates a scaling factor for the height of the bars based on the chart height and the maximum value of y-axis data.
    this.scaler = this.chartHeight / this.maxValue;

    this.barColours = [color(50, 170, 200), color(70, 180, 150)];
    
    this.chartTitle = obj.chartTitle || "Clustered Bar Chart"; // Add chart title property
    this.xAxisLabel = this.xValue; // Add X axis label property
        this.yAxisLabel = obj.yAxisLabel || "Goals Per Season"; // Add Y axis label property

  }

  renderBars() {
    // Function to render the bars on the chart.


    push(); // Saves the current drawing.
    translate(this.chartPosX, this.chartPosY); // Translates the origin to the chart's position.

    push(); // Saves the drawing state again for a nested transformation.
    translate(this.margin, 0); // Adds margin to the left of the chart for positioning the bars.

    // we will draw a SET of bars (male and female in this case)
    for (let i = 0; i < this.data.length; i++) {
      push();

      // push over on the x axis according to the available space dictated in this case by the number of y values
      // so same as usual, except it takes up double space
      translate((this.gap + this.barWidth * this.yValues.length) * i, 0);

      // this part will iterate over the two options, male and female, draw a bar for each
      for (let j = 0; j < this.yValues.length; j++) {
        fill(this.barColours[j % 3]);
        noStroke();

        rect(this.barWidth * j,0, this.barWidth, -this.data[i][this.yValues[j]] * this.scaler
        );
        //   pop();
      }

      pop();
    }

    pop(); // Restores the drawing state after rendering the bars.
    pop();
  }

  renderAxis() {
    // Function to render the axes (X and Y) on the chart.

    push(); // Saves the current drawing state.
    translate(this.chartPosX, this.chartPosY); // Translates the origin to the chart's position.
    noFill();
    stroke(this.axizColour); // Sets the stroke color for the axis lines.
    strokeWeight(this.axisThickness); // Sets the thickness of the axis lines.

    line(0, 0, 0, -this.chartHeight); // Draws the Y-axis.
    line(0, 0, this.chartWidth, 0); // Draws the X-axis.

    // Render X and Y axis labels at the center
    fill(this.textColour);
    textSize(15);
    textAlign(CENTER, CENTER);
    
    // X-axis label (centered)
    noStroke()
    textFont(font);
    text(this.xAxisLabel, this.chartWidth / 2, 100); 
    
    // Y-axis label (centered vertically)
    push();
    textFont(font);
    text(this.yAxisLabel, -this.chartHeight / 3, -170); // Rotate to place Y-axis label vertically
    pop();

    pop(); // Restores the drawing state after rendering the axes.
  }

  renderLabels() {
    // Function to render labels for the bars on the X-axis.

    push(); // Saves the current drawing.
    translate(this.chartPosX, this.chartPosY); // Translates the origin to the chart's position.

    push(); // Saves the drawing state again for a nested transformation.
    translate(this.margin, 0); // Adds margin to the left of the chart.

    for (let i = 0; i < this.data.length; i++) {
      // Loops through the data to render each label.

      let xPos = (this.barWidth*2 + this.gap) * i; // Calculates the X position for each label.
      fill(this.textColour); // Sets the text color.
      noStroke();
      textAlign(LEFT, CENTER); // Aligns he text to the left and vertically centered.
      textSize(15); // Sets the text sizet to 10.

      push(); // Saves the drawing state for rotating the text.
      translate(xPos + this.barWidth / 2, 10); // Positions the label in the center of each bar with a slight vertical offset.
      rotate(35);
      textFont(font);
      text(this.data[i][this.xValue], 2, 0); // Draws the label using the x-value from the data.
      pop(); // Restores the drawing state after rotating the text.
    }

    pop(); // Restores the drawing state after rendering the labels.
    pop(); // Restores the original drawing state after positioning the chart.
  }

  renderTicks() {
    push();
    translate(this.chartPosX, this.chartPosY);
    noFill();
    stroke(this.axizTickColour);
    strokeWeight(this.axisThickness);

    // Find the max Y value from the data
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i][this.yvalueTotal] > this.maxValue) {
        this.maxValue = this.data[i][this.yvalueTotal];
      }
    }

    let tickIncrement = this.maxValue / this.Ticks;
    let pixelIncrement = this.chartHeight / this.Ticks;

    for (let i = 0; i <= this.Ticks; i++) {
      let yPos = -pixelIncrement * i;
      let tickValue = tickIncrement * i;

      // Draw ticks on the Y-axis
      line(0, yPos, -this.numTicks, yPos);

      noStroke();

      // Draw tick values
      fill(this.textColour);
      textAlign(RIGHT, CENTER);
      textSize(15);
      textFont(font);
      text(tickValue.toFixed(0), -this.numTicks - 10, yPos); // Display the tick values rounded to integers

      stroke(this.axizTickColour);
    }

    pop();
  }

  renderTitle() {
    push();
    translate(this.chartPosX, this.chartPosY - this.chartHeight - 30); // Place title above the chart
    fill(this.textColour);
    textSize(20);
    textAlign(CENTER, CENTER);
    textFont(font);
    text(this.chartTitle, 250, 0); // Render the chart title
    pop();
}
}
