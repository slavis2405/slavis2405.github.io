const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for(let key of keys){
    const value = key.dataset.key;              //vytiahne hodnotu z data-* (.key znamena ze je to z dataset-key)
                                                //value je data-key

    key.addEventListener('click', () => {
        if (value == 'clear'){
            input = "";                             
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        }
        else if (value == 'backspace'){
            input = input.slice(0,-1)                             //slice(0,1) zacina od prveho znaku a posledny odoberie      
            display_input.innerHTML = CleanInput(input);        
        }
        else if (value == '='){
            let result = eval(input);

            display_output.innerHTML = result
        }
        else if(value == "brackets"){
            if(
                input.indexOf("(") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf(")")
            
            ){
                input += "(";
            }
            else if(
                input.indexOf("(") != -1 && 
				input.indexOf(")") == -1 || 
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") > input.lastIndexOf(")")
            ){
                input += ")";
            }
            display_input.innerHTML = CleanInput(input);
        }
        else{
            if(ValidateInput(value)){
                input += value;                                     //else pre cisla
                display_input.innerHTML = CleanInput(input);
            }
        }
    })
}
function CleanInput(input){                                     //nahradzuje znaky na vstupe
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for(i=0; i<input_array_length; i++){
        if(input_array[i] == "*"){
            input_array[i] = '<span class="operator"> x </span>';
        }else if(input_array[i] == '/'){
            input_array[i] = '<span> ÷ </span>';
        }else if(input_array[i] == '+'){
            input_array[i] = '<span class="operator"> + </span>';
        }else if(input_array[i] == '-'){
            input_array[i] = '<span class="operator"> - </span>';
        }else if(input_array[i] == '('){
            input_array[i] = '<span class="brackets action">(</span>';
        }else if(input_array[i] == ')'){
            input_array[i] = '<span class="brackets action">)</span>';
        }else if(input_array[i] == '%'){
            input_array[i] = '<span class="percent action">%</span>';
        }
}
return input_array.join("");
}
function ValidateInput (value) {
	let last_input = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	if (value == "." && last_input == ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}