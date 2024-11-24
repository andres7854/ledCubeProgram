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
                    for (var ledOfArr = 0; ledOfArr < 33; ledOfArr++)
                    {
                        if (ledOfArr == 0)
                        {
                            document.getElementById("timeOfArray").value = arrays[actualArray][floor][ledOfArr]     
                        }
                        if(`led${ledOfArr}` == actualLed.id)
                        {
                            actualLed.checked = arrays[actualArray][floor][ledOfArr] == 1 ? true : false; 
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
                    for (var ledOfArr = 0; ledOfArr < 33; ledOfArr++)
                    {
                        if (ledOfArr == 0)
                        {
                            document.getElementById("timeOfArray").value = arrays[actualArray][floor][ledOfArr]     
                        }
                        if(`led${ledOfArr}` == actualLed.id)
                        {
                            actualLed.checked = arrays[actualArray][floor][ledOfArr] == 1 ? true : false;
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
                floorArray.push(document.getElementById("timeOfArray").value);
                for (let row = 0; row < 5; row++)
                {
                    for (let led = 0; led < 5; led++)
                    {
                        var actualLed = document.getElementById(`floor${floor+1}`).children[1].children[row].children[led].children[0];
                        if (document.getElementById("keepArrayCheck").checked == true)
                        {
                            actualLed.checked == false ? floorArray.push(0) : floorArray.push(1);    
                        }else
                        {
                            actualLed.checked = false;
                        }                         
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
        floorArray.push(document.getElementById("timeOfArray").value);
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
        sequence += `\nstatic const byte bitsMatrix${bitsMatrix+1}[5][32] PROGMEM = {`;
        for (let floor = 0; floor < 6; floor++)
        {
            if (floor != 0)
            {
                sequence += `{`;
                for (var led = 0; led < 33; led++)
                {
                    if (led != 0)
                    {
                        if (led != 32)
                        {
                            sequence += `${arrays[bitsMatrix][floor-1][led]},`;
                        }else{
                            sequence += `${arrays[bitsMatrix][floor-1][led]}`;
                        }   
                    }
                }
                if (floor != 5)
                {
                    sequence += `},`;
                }else
                {
                    sequence += `}`;
                }
            }
        }
        sequence += `};\n`;
        sequence += `showMatrix(${arrays[bitsMatrix][0][0]}, ${bitsMatrix+1}, bitsMatrix${bitsMatrix+1}, ${bitsMatrix != arrays.length-1 ?"false":"true"});`;
        sequence += bitsMatrix == arrays.length-1 ? "\n}" : "";
    }
    document.getElementById("finalSequence").textContent = sequence;
}

function delay(ms)
{
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateSequence() 
{
    console.log("simulando");
    for(var array = 0; array < arrays.length; array++)
    {
        for (var floor = 0; floor < 5; floor++) 
        {
            for (let row = 0; row < 5; row++)
            {
                for (let led = 0; led < 5; led++) {
                    var actualLed = document.getElementById(`floor${floor+1}`).children[1].children[row].children[led].children[0];
                    for (var ledOfArr = 0; ledOfArr < 33; ledOfArr++)
                    {
                        if (ledOfArr == 0)
                        {
                            document.getElementById("timeOfArray").value = arrays[array][0][0];     
                        }
                        if(`led${ledOfArr}` == actualLed.id)
                        {
                            actualLed.checked = arrays[array][floor][ledOfArr] == 1 ? true : false;
                            break
                        }
                    }
                }
            }
            
        }
        await delay(arrays[array][0][0]);
        if (document.getElementById("keepLoopSimulation").checked == true && array == arrays.length-1)
        {
            array = -1;
        }
    }

    console.log("simulacion finalizada");
    for (var floor = 0; floor < 5; floor++) 
    {
        for (let row = 0; row < 5; row++)
        {
            for (let led = 0; led < 5; led++) {
                var actualLed = document.getElementById(`floor${floor+1}`).children[1].children[row].children[led].children[0];
                for (var ledOfArr = 0; ledOfArr < 33; ledOfArr++)
                {
                    if (ledOfArr == 0)
                    {
                        document.getElementById("timeOfArray").value = arrays[actualArray][floor][ledOfArr]     
                    }
                    if(`led${ledOfArr}` == actualLed.id)
                    {
                        actualLed.checked = arrays[actualArray][floor][ledOfArr] == 1 ? true : false;
                        break
                    }
                }
            }
        }
    }
}