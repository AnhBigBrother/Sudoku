function sudoku() {
    let a = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let flag = true;
    function check(grid, i, j, k) {
        for (let x = 0; x < 9; x++) {
            if (x !== i && grid[x][j] === k) {
                return false;
            }
            if (x !== j && grid[i][x] === k) {
                return false;
            }
        }
        let x = Math.floor(i / 3) * 3;
        let y = Math.floor(j / 3) * 3;
        for (let m = x; m < x + 3; m++) {
            for (let n = y; n < y + 3; n++) {
                if (!(m === i && n === j) && grid[m][n] === k) {
                    return false;
                }
            }
        }
        return true;
    }
    function checkvalid(grid) {
        let flag = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!a.includes(grid[i][j])) {
                    let index = "i" + (i + 1) + (j + 1);
                    let x = document.getElementById(index);
                    x.style = "background-color:red;color:black;";
                    flag = false;
                }
                if (grid[i][j] !== "0") {
                    if (!check(grid, i, j, grid[i][j])) {
                        let index = "i" + (i + 1) + (j + 1);
                        let x = document.getElementById(index);
                        x.style = "background-color:red;color:black;";
                        flag = false;
                    }
                }
            }
        }
        return flag;
    }
    function checkFilled(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === "0") { return false; }
            }
        }
        return true;
    }
    function solve(grid, p) {
        if (p > 80) {
            flag = false;
            return;
        }
        let x = Math.floor(p / 9);
        let y = p % 9;
        if (grid[x][y] !== "0") {
            solve(grid, p + 1);
        } else {
            for (let i = 0; i < 9; i++) {
                if (check(grid, x, y, a[i]) === true) {
                    grid[x][y] = a[i];
                    solve(grid, p + 1);
                    if (flag === false) {
                        return;
                    }
                }
            }
            grid[x][y] = "0";
        }
    }
    let grid = new Array(9);
    for (let i = 0; i < 9; i++) {
        grid[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
            let index = "i" + (i + 1) + (j + 1);
            let x = document.getElementById(index);
            if (x.value !== "") {
                if (x.value === "0") {
                    x.style = "background-color:red;color:black;";
                    flag = false;
                }
                else {
                    grid[i][j] = x.value;
                    x.style = "background-color:#006d12;color:whitesmoke;";
                }
            }
            else { 
                grid[i][j] = "0"; 
                x.style="background-color:antiquewhite;color:black";;
            }
        }
    }
    let checvali = checkvalid(grid);
    if (checvali === false) {
        alert("Your Sudoku is invalid");
        return;
    }
    if (flag === false){
        alert("Your Sudoku is invalid");
        return;
    }
    let checfill = checkFilled(grid);
    if (checfill === true) {
        alert("Your Sudoku has filled, press 'Reset' to reset your Sudoku ")
        return;
    }
    solve(grid, 0);
    for (let i=0; i<9; i++){
        for (let j=0; j<9; j++){
            let index = "i"+(i+1)+(j+1);
            let x = document.getElementById(index);
            if (x.value === ""){
                x.value = grid[i][j];
                x.style="background-color:lightblue"
            }
        }
    }
}
function reset(){
    for (let i=0; i<9; i++){
        for (let j=0; j<9; j++){
            let index = "i"+(i+1)+(j+1);
            let x = document.getElementById(index);
            x.value = "";
            x.style="background-color:antiquewhite;color:black";
        }
    }
}