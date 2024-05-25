/*async function fetchJSON(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching JSON:', error);
      throw error;
    }
  }
  
  // Assigning the result of fetchJSON to a variable
  async function getData() {
    try {
        const jsonData = await fetchJSON('data.json');
        console.log(jsonData); // Use the jsonData as needed
      return jsonData; // You can return it or do further processing
    } catch (error) {
        // Handle errors here
    }
}

// Usage
getData().then(data => {
    // Now you can use the data variable here
    console.log(data);
}).catch(error => {
    // Handle errors here
});
*/

var zombieCode = new Object();
const zombie = {"ArtCenter":{"x":90,"y":125},"AttackRect":{"mHeight":95,"mWidth":20,"mX":15,"mY":0},"CanSpawnPlantFood":true,"Cost":150,"EatDPS":100,"GroundTrackName":"ground_swatch","HitRect":{"mHeight":95,"mWidth":32,"mX":10,"mY":10},"Hitpoints":190,"ScaledProps":[{"Arg1":1.3,"Arg2":0.05,"Formula":"standard","Key":"Hitpoints"},{"Arg1":1.3,"Arg2":0.05,"Formula":"standard","Key":"EatDPS"},{"Formula":"constant","Key":"Speed"},{"Formula":"constant","Key":"WavePointCost"}],"ShadowOffset":{"x":5,"y":0,"z":1.4},"Speed":0.185,"WavePointCost":100,"Weight":1000,"ZombieStats":[{"Type":"toughness","Value":"toughness1"},{"Type":"speed","Value":"speed2"}]};

// This function will be called when the page is fully loaded

function alterCondition(num){
    var table = document.getElementById('conditions');

    if (!table) {
        console.error('Table with id conditions not found.');
        return;
    }

    var inputs = table.getElementsByTagName('input');
    
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = num;
    }
}

function setInputByID(id){
    document.getElementById(id).value = 0;
}

window.onload = function() {
    alterCondition(1);

    function processTable(className) {
        // Get the table with the given class name
        var table = document.getElementsByClassName(className)[0];

        // Get all the rows in the table
        var rows = table.getElementsByTagName("tr");

        // Initialize an empty object to store the data
        var data = {};

        // Loop through each row
        for (var i = 1; i < rows.length; i++) {
            // Get the text from the first cell (td) in the row
            var key = rows[i].cells[0].innerText;

            // Get the checkbox from the second cell (td) in the row
            var checkbox = rows[i].cells[1].children[0];

            // Add the key-value pair to the data object
            // The value is whether the checkbox is checked or not
            data[key] = checkbox.checked;

            // Use an IIFE to create a new scope for each iteration of the loop
            (function(key, checkbox) {
                // Add an event listener to the checkbox
                checkbox.addEventListener('change', function() {
                    // Update the data object when the checkbox is clicked
                    zombie[key] = this.checked;
                    console.log(key);
                });
            })(key, checkbox);
        }

        // Now the data object contains the data from the table
        console.log(data);
    }
    // Call the function with the class name of your table
    processTable("booleans");
}



document.addEventListener("DOMContentLoaded", function() {
    zombieCode.aliases = ['myCustomZombie'];
    // Get all input elements
    var inputs = document.querySelectorAll('input');

    // Loop through each input element and set the attribute
    inputs.forEach(function(input) {
        input.setAttribute('autocomplete', 'off');
        if (!(input.hasAttribute('type'))){
            input.setAttribute('type', 'number');
            if (input.hasAttribute('placeholder')){
                input.setAttribute('min','1')
            }
        }
    });
});

function changeDisplay(){
    let inputValue = get('alias','myCustomZombie');
    let prop = `RTID(${inputValue}@.)`;
    zombieCode.aliases = [inputValue];
    document.getElementById('display').setAttribute('title',prop);
}

function copyToClipboard(obj) {
    const text = JSON.stringify(obj, null, 2); // Converts the object to a formatted JSON string
    navigator.clipboard.writeText(text).then(function() {
        console.log('Object copied to clipboard');
    }).catch(function(error) {
        console.error('Error copying object: ', error);
    });
}

function get(identifier,default_) {
    var element = document.getElementById(identifier).value;
    if (element == ""){
        return default_;
    }
    if (element) {
        return element;
    } else {
        console.error('Element not found');
        return null;
    }
}


function putObject(){

    zombie.Hitpoints = + get('hp',190);
    zombie.Speed = + get('speed',0.185);
    zombie.EatDPS = + get('dps',100);

    zombie.AttackRect.mHeight = + get('aHeight',95);
    zombie.AttackRect.mWidth = + get('aWidth',20);
    zombie.AttackRect.mX = + get('aX',15);
    zombie.AttackRect.mY = + get('aY',0);

    zombie.HitRect.mHeight = + get('hHeight',95);
    zombie.HitRect.mWidth = + get('hWidth',32);
    zombie.HitRect.mX = + get('hX',10);
    zombie.HitRect.mY = + get('hY',10);

    zombie.ArtCenter.x = + get('artX',90);
    zombie.ArtCenter.y = + get('artY',125);

    zombieCode.objclass = "ZombiePropertySheet";
    zombieCode.objdata = zombie;
    
    alert("Zombie's code has been copies to the clipboard.");
    console.log(zombieCode);
    copyToClipboard(zombieCode);
}
