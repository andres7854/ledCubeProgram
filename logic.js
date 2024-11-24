var arrays = [];
var actualArray = 0;
var sequence = "";
function previousArray()
{
    if (actualArray > 0)
    {
        actualArray = actualArray-1;
        for (var floor = 0; floor < 5; floor++) 
        {
            for (let row = 0; row < 5; row++)
            {
                for (let led = 0; led < 5; led++) {
                    var actualLed = document.getElementById(`floor${floor+1}`).children[1].children[row].children[led].children[0];
                    for (var ledOfArr = 0; ledOfArr < 32; ledOfArr++)
                    {
                        if(`led${ledOfArr}` == actualLed.id)
                        {
                            actualLed.checked = arrays[actualArray][floor][ledOfArr-1] == 1 ? true : false; 
                            break
                        }
                    }
                }
            }
        }
        console.log(`mostrando el array ${actualArray}`);
    }
}
function nextArray()
{
    actualArray = actualArray+1;
    if (actualArray < arrays.length)
    {
        for (var floor = 0; floor < 5; floor++) 
        {
            for (let row = 0; row < 5; row++)
            {
                for (let led = 0; led < 5; led++) {
                    var actualLed = document.getElementById(`floor${floor+1}`).children[1].children[row].children[led].children[0];
                    for (var ledOfArr = 0; ledOfArr < 32; ledOfArr++)
                    {
                        if(`led${ledOfArr}` == actualLed.id)
                        {
                            actualLed.checked = arrays[actualArray][floor][ledOfArr-1] == 1 ? true : false;
                            break
                        }
                    }
                }
            }
        }
        console.log(`mostrando el array ${actualArray}`);
    }else
    {
        if (confirm("¿Esta seguro de crear un nuevo array?"))
        {
            var newArray = [];
            for (var floor = 0; floor < 5; floor++) 
            {
                var floorArray = [];
                for (let row = 0; row < 5; row++)
                {
                    for (let led = 0; led < 5; led++) {
                        var actualLed = document.getElementById(`floor${floor+1}`).children[1].children[row].children[led].children[0];
                        actualLed.checked = false;
                        floorArray.push(0);
                    }
                }
                newArray.push(floorArray);
            }
            arrays.push(newArray);   
        }else
        {
            actualArray = actualArray-1;
        }
        console.log(`mostrando el array ${actualArray}`);
    }
}
function saveArray()
{
    var newArray = [];
    for (var floor = 0; floor < 5; floor++) 
    {
        var floorArray = [];
        for (let row = 0; row < 5; row++)
        {
            for (let led = 0; led < 5; led++) {
                var actualLed = document.getElementById(`floor${floor+1}`).children[1].children[row].children[led].children[0];
                if (actualLed.checked == true)
                {
                    floorArray.push(1);
                }else
                {
                    floorArray.push(0);
                }
            }
        }
        for (let i = 0; i < 7; i++)
        {
            floorArray.push(0);    
        }
        newArray.push(floorArray);
    }
    arrays[actualArray] = newArray;
    console.log(`array ${actualArray} guardado`);
}
function generateSequence()
{
    var nameOfSequence = document.getElementById("nameOfSequence").value;
    sequence = 
    `void ${nameOfSequence}()\n{`;
    for (var bitsMatrix = 0; bitsMatrix < arrays.length; bitsMatrix++) 
    {
        sequence += `\nstatic const byte bitsMatrix${bitsMatrix+1}[5][32] PROGMEM ={`;
        for (let floor = 0; floor < 5; floor++)
        {
            sequence += `{`;
            for (var led = 0; led < 32; led++)
            {
                if (led != 31)
                {
                    sequence += `${arrays[bitsMatrix][floor][led]},`;
                }else{
                    sequence += `${arrays[bitsMatrix][floor][led]}`;
                }
            }
            if (floor != 4)
            {
                sequence += `},`;
            }else
            {
                sequence += `}`;
            }
        }
        sequence += `};\n`;
        sequence += `showMatrix(t[0], ${bitsMatrix+1}, bitsMatrix${bitsMatrix+1}, ${bitsMatrix != arrays.length-1 ? "false" : "true"});`;
        sequence += bitsMatrix == arrays.length-1 ? "}" : "";
    }
    document.getElementById("finalSequence").textContent = sequence;
}