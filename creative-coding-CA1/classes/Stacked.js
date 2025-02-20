class StackedBarchart {
  // Defines a class called BarChart.

  constructor(obj) {
    // Constructor function initializes the chart with multiple properties (data, chart heights widths, colours).

    this.data = obj.data; // Assigns the input data to the property `data`.
    this.xValue = obj.xValue; // Sets the name of the x-axis data field.
    //this.yValue = obj.yValue; // Sets the name of the y-axis data field.
    this.chartHeight = obj.chartHeight || 350; // Sets the height of the chart.
    this.chartWidth = obj.chartWidth || 450; // Sets the width of the chart.
    this.barWidth = obj.barWidth || 15; // Sets the width of each bar.
    this.margin = obj.margin || 15; // Sets the margin around the chart.
    this.axisThickness = obj.axisThickness || 5; // Sets the thickness of the axis lines.
    this.chartPosX = obj.chartPosX || 200; // Sets the X position.
    this.chartPosY = obj.chartPosY || 450; // Sets the Y position.

    // Calculates the gap between bars, considering the total chart width, bar width, and margin.
    this.gap =
      (this.chartWidth - this.data.length * this.barWidth - this.margin * 2) /
      (this.data.length - 1);

    this.yvalueTotal = "Total";

    // Calculates a scaling factor for the height of the bars based on the chart height and the maximum value of y-axis data.
    this.scaler =
      this.chartHeight / max(this.data.map((row) => row[this.yvalueTotal]));

    this.axizTickColour = color(0); // Light gray for the axis ticks.
    this.axizColour = color(0); // Dark blue for the axis lines.
    this.barColour = color(50, 170, 200); // Soft blue for the bars.
    this.textColour = color(50); // Dark gray for the text labels on the x-axis.

    this.Ticks = 8; // Sets the number of ticks on the Y-axis.
    this.numTicks = 10; // Sets the number of ticks on the X-axis.

    this.maxValue = 0;

    this.yValues = obj.yValues

    this.barColours = [color(255, 0, 0), color(0, 255, 0)];
  }

  renderBars() {
    // Function to render the bars on the chart.

    push(); // Saves the current drawing.
    translate(this.chartPosX, this.chartPosY); // Translates the origin to the chart's position.

    push(); // Saves the drawing state again for a nested transformation.
    translate(this.margin, 0); // Adds margin to the left of the chart for positioning the bars.

    for (let i = 0; i < this.data.length; i++) {
      let xPos = (this.barWidth + this.gap) * i;

      push();
      translate(xPos, 0);

      push();
      // two values in y axis, male and female
      // so loop twice
      // each iteration draw a rectangle and we'll give it a different colour, otherwise won't see them
      for (let j = 0; j < this.yValues.length; j++) {
        fill(this.barColours[j]);
        noStroke();

        rect(0, 0, this.barWidth, -this.data[i][this.yValues[j]] * this.scaler);
        translate(0, -this.data[i][this.yValues[j]] * this.scaler - 1);
      }

      pop();
      pop();
    }

    pop(); // Restores the drawing state after rendering the bars.
    pop(); // Restores the original drawing state after positioning the chart.
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

      let xPos = (this.barWidth + this.gap) * i; // Calculates the X position for each label.
      fill(this.textColour); // Sets the text color.
      noStroke();
      textAlign(LEFT, CENTER); // Aligns he text to the left and vertically centered.
      textSize(15); // Sets the text sizet to 10.

      push(); // Saves the drawing state for rotating the text.
      translate(xPos + this.barWidth / 2, 10); // Positions the label in the center of each bar with a slight vertical offset.
      rotate(35);
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
      text(tickValue.toFixed(0), -this.numTicks - 10, yPos); // Display the tick values rounded to integers

      stroke(this.axizTickColour);
    }

    pop();
  }
}
