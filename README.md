# calculator
functional calculator

- The calculator is initiated through the power button. 

- The calculator has a screen that displays both a solution(bottom numbers) and equation(top numbers) that yielded the solution.  

- Add event listener to all buttons for click and keydown.
    -there are 3 types of buttons, numbers, functions, and operators. 

- Each click or keydown will populated the solution with it's value as a string, but also stored as an array of numbers and symbols.

- When the enter butter is clicked the equation will be set to the solution string. The solution array will be stepped through and reordered based on the order of operations. 

- Then each pair of numbers and their operator will be evaluated, creating a "running total" variable.

- The completed evaluation of the array will be displayed as the solution on screen and 
