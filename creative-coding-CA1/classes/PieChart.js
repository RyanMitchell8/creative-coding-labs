class PieChart {
    constructor(obj) { 
        // Constructor function initializes the chart with multiple properties (data, chart heights widths, colours).
        this.data = obj.data; // Assigns the input data to the property `data`.
        this.xValue = obj.xValue; // Sets the name of the x-axis data field.
        this.yValue = obj.yValue; // Sets the name of the y-axis data field.
        this.chartHeight = obj.chartHeight || 350; // Sets the height of the chart.
        this.chartWidth = obj.chartWidth || 450; // Sets the width of the chart.
        this.margin = obj.margin || 15; // Sets the margin around the chart.
        this.chartPosX = obj.chartPosX || 200; // Sets the X position.
        this.chartPosY = obj.chartPosY || 450; // Sets the Y position.

        // Defines the radius of the donut's hole
        this.innerRadius = obj.innerRadius || 100; // Default inner radius for the hole

        // Calculates the scaling factor based on the height and the max value of y-axis data
        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue])));

        this.axizTickColour = color(0); // Axis tick color
        this.axizColour = color(0); // Axis color
        this.barColour = color(50, 170, 200); // Bar color
        this.textColour = color(50); // Text color for labels
        
        this.Ticks = 8; // Number of Y-axis ticks
        this.numTicks = 10; // Number of X-axis ticks

        this.myNewArray = this.data.map(row => row[this.yValue]);
        this.total = this.myNewArray.reduce((sum, item) => sum + item, 0); // Total of the Y-values

        this.angleStart = 0; // Initial starting angle
        this.trackAngle = 0; // Tracks the angle for each slice
    }

    renderBars() {  
        // Function to render the donut chart slices
        
        push(); // Saves the current drawing
        translate(this.chartPosX, this.chartPosY); // Moves the origin to the center of the chart
        
        for (let i = 0; i < this.myNewArray.length; i++) {
            fill(random(0, 100), 100, random(150, 255)); // Random color generation for each slice
            stroke(255); // Stroke color for the arcs
            
            // Calculate the angle for each slice based on the data
            let angleEnd = (this.myNewArray[i] / this.total) * 360;
            
            // Draw the arc for each slice (donut effect: two radii)
            arc(0, 0, 750, 750, this.angleStart, this.angleStart + angleEnd, PIE); // Outer arc (donut's outer radius)
            fill(255)
            arc(0, 0, this.innerRadius * 4, this.innerRadius * 4, this.angleStart, this.angleStart + angleEnd, PIE); // Inner arc (donut's inner radius)
            
            let midAngle = (angleEnd - this.angleStart) / 2;
            let xPos = (this.innerRadius + 150) * cos(midAngle); // X position for text
            let yPos = (this.innerRadius + 150) * sin(midAngle); // Y position for text

            fill(255); // White text color
            noStroke();
            textSize(20);
            push();
            translate(xPos, yPos);
            
            // Rotate the text so it aligns with the slice
            rotate(midAngle);
            textAlign(LEFT, CENTER);
            textSize(20);
            textFont(font);
            text(this.data[i][this.xValue], 0, 0); // Display label (from xValue)

            pop();
            rotate(angleEnd); // Update the rotation for the next slice
            this.trackAngle += angleEnd; // Keep track of the total angle
        }

        pop(); // Restores the original drawing state after positioning the chart
    }

    // Other functions (renderAxis, renderLabels, etc.) can be kept as they are or modified as per your needs.
    renderAxis() { 
        push(); // Saves the current drawing
        translate(this.chartPosX, this.chartPosY); // Moves the origin to the center of the chart
        
        for (let i = 0; i < this.myNewArray.length; i++) {
            fill(random(0, 100), 100, random(150, 255)); // Random color generation for each slice
            stroke(255); // Stroke color for the arcs
            
            // Calculate the angle for each slice based on the data
            let angleEnd = (this.myNewArray[i] / this.total) * 360;
            
            // Draw the arc for each slice (donut effect: two radii) // Inner arc (donut's inner radius)
            fill(100)
            arc(0, 0, 390, 390, this.angleStart, this.angleStart + angleEnd, PIE);
            
            let midAngle = (angleEnd - this.angleStart) / 2;
            let xPos = (this.innerRadius + 50) * cos(midAngle); // X position for text
            let yPos = (this.innerRadius + 50) * sin(midAngle); // Y position for text

            fill(255); // White text color
            noStroke();
            textSize(20);
            push();
            translate(xPos, yPos);
            
            // Rotate the text so it aligns with the slice
            rotate(midAngle);
            textAlign(LEFT, CENTER);
            textSize(17);
            textFont(font);
            text(this.data[i][this.yValue], 0, 0); // Display label (from xValue)

            pop();
            rotate(angleEnd); // Update the rotation for the next slice
            this.trackAngle += angleEnd; // Keep track of the total angle
        }

        pop(); }
    renderLabels() { /* Not needed for donut chart rendering */ }
    renderTicks() { /* Not needed for donut chart rendering */ }

    renderTitle() {
    }
    
}
