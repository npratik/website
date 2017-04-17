    /*global declaration*/
    var myArrayglobal        = new Array(); /* Array used to store the data entered manually - values for the vector 'X' */
	var vectorArray          = new Array(); /* Array used to store the data entered - 3-tuple*/
	
    var X;
    var x;
	google.charts.load('current', {'packages':['bar']}); /*google chart is loaded only once */
	
	var vectorArrayFinal      = new Array(); 
$(document).ready(function(){
    
	$("#calculateResult").prop("disabled",true);
    $('#myTab a').click(function (e) {
		console.log('clicked '+this);
		if($(this).parent('li').hasClass('active')){
			var target_pane=$(this).attr('href');
			console.log('pane: '+target_pane);
			$( target_pane ).toggle( !$( target_pane ).is(":visible") );
		}
	});
    
    
		  
    /*logic to handle radio buttons */
	$(function () {
	       
	    /* Radio button option for entering each individual element of X is selected by default*/	
		if ($("#singleVect").is(":checked")) {
			  $("#eachVector").show();
			  $("#eachVector2").hide();
			  $("#eachVector3").hide();
		} 
        /* On-click function to display corresponding user inputs based on the type selected*/
		$("input[name='inputvector']").click(function () {
            if ($("#singleVect").is(":checked")) {
                    $("#eachVector").show();
				    $("#eachVector2").hide();
				    $("#eachVector3").hide();
            } else if ($("#minSpMax").is(":checked")) {
                    $("#eachVector2").show();
				    $("#eachVector").hide();
				    $("#eachVector3").hide();				
            } else if ($("#minSpTot").is(":checked")) {
                    $("#eachVector3").show();
				    $("#eachVector2").hide();
				    $("#eachVector").hide();				
            }
        });
		
    });
          
	  /* Filter for single input vector where each individual element of X is entered*/
	 /* only numbers, space, backspace, delete, tab,escape and tab are allowed*/
	 $("#eachVectorString").keydown(function (e) {   
		/* Allow: space, backspace, delete, tab, escape, enter .*/
		if ($.inArray(e.keyCode, [32,46, 8, 9, 27, 13, 110, 189,190]) !== -1 ||
			 /* Allow: Ctrl+A, Command+A */
			(e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
			 /* Allow: home, end, left, right, down, up */
			(e.keyCode >= 35 && e.keyCode <= 40)) {
				 return;
		}
		/* Ensure that it is a number and stop the keypress*/
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault(); 
		}
	}); 
		
	/*Filter for 3-tuple input fileds */
	/* only numbers, backspace, delete, tab,escape and tab are allowed*/
	$("#minSpacingMinInput,#minSpacingSpacInput,#minSpacingMaxInput,#numSpacingMinInput,#numSpacingSpacInput").keydown(function (e) {   
		 /* Allow: backspace, delete, tab, escape, enter .*/
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 189,190]) !== -1 ||
			  /* Allow: Ctrl+A, Command+A */
			(e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
			 /* Allow: home, end, left, right, down, up */
			(e.keyCode >= 35 && e.keyCode <= 40)) {
				 return;
		}
		/* Ensure that it is a number and stop the keypress*/
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault(); 
		}
	}); 
		
	/*Filter for Number of elements field in  3-tuple (Minimum Number, Spacing, Number of elements) */
	/*filter negative numbers*/
	$("#numSpacingNumInput").keydown(function (e) {   
	/* Allow:  backspace, delete, tab, escape, enter and .*/
		if ($.inArray(e.keyCode, [46,8, 9, 27, 13]) !== -1 ||
			 /* Allow: Ctrl+A, Command+A*/
			(e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
			 /* Allow: home, end, left, right, down, up */
			(e.keyCode >= 35 && e.keyCode <= 40)) {
				 return;
		}
		/* Ensure that it is a number and stop the keypress*/
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault(); 
		}
	}); 
     
	 /* Logic to handle entered vector Values for 'X'*/
	 /* The entered values with spaces is validated and placed into an array for 
	 for further processing, if the data is valid*/
	$("#eachVectorString").change(function () {
		var myArray = $.trim($('#eachVectorString').val()).split(" ");

        //alert("myArray after split" + myArray);
		var checkFlag;
		var sucessCnt=0;
		var errorFound;
        myArrayglobal =new Array();  

		for(var i=0; i<myArray.length; i++) { 
		checkFlag = isNaN($.trim(myArray[i]));//isNaN(myArray[i]);
		
		 
         if($.trim(myArray[i]) !==''){		
			if(checkFlag === true) {
				errorFound = 'Y';
			}else{
			  //alert("false");
				myArrayglobal[sucessCnt] = +myArray[i];// myArray[i] = +myArray[i]; 
				sucessCnt = sucessCnt + 1;
			}
		 }
		}
			
		if( errorFound == 'Y'){
		  $("#calculateResult").prop("disabled",true);
		   $("#singleInputVectorErr").show(); 
		   $("#eachVectorString").css("border-color","red");
		} else{
		  $("#calculateResult").prop("disabled",false);
		   $("#singleInputVectorErr").hide(); 
		   $("#eachVectorString").css("border-color","");
		}
						 
					
	});
			
	/* When the Calculate Result button is clicked based on the radio button option selected
	   the corresponding Array data captured after validation, is moved into global arrays for 
	   calculating the results based on the formula*/
	$("#calculateResult").click(function () {
	  //alert("click global");
	  //alert(myArrayglobal);
	  var vectorArray1;
	  if ($("#singleVect").prop("checked")) {
		if ($.trim($('#eachVectorString').val()) !='') { 
		  vectorArrayFinal = myArrayglobal; 
		}
	  }
	  
	  
	 if ($("#minSpMax").prop("checked")) { 
		if (($.trim($('#minSpacingMaxInput').val()) !='')&& ($.trim($('#minSpacingMaxInput').val()) !== '')&& ($.trim($('#minSpacingSpacInput').val()) !== '')) { 
		vectorArrayFinal = vectorArray; 
		//alert(vectorArrayFinal +"inside 3 tuple array ");
		}
	  } 
	  
	  if ($("#minSpTot").prop("checked")) { 
		if (($.trim($('#numSpacingMinInput').val()) !='')&& ($.trim($('#numSpacingNumInput').val()) !== '')&& ($.trim($('#numSpacingSpacInput').val()) !== '')) { 
		vectorArrayFinal = vectorArray; 
		//alert(vectorArrayFinal +"inside 3 tuple array ");
		}
	  }
	  
	  
	 });
    
	/* Logic to insert formula/operations based on the buttons clicked(option selected)
   	   by the user in the formula text box*/
	$('#formulaText').val("X");
	$('#plus,#minus,#multiply,#divide,#sqrt,#pow,#percentage,#leftbrace,#rightbrace,#ceil,#floor,#max,#min,#abs,#round').click(function(){
		var v = $(this).val();
		//$('#formulaText').val($('#formulaText').val() + v);	
		 typeInTextarea($("#formulaText"), v)
			return false
		 
	});
	
	function typeInTextarea(el, newText) {
		var start = el.prop("selectionStart")
		var end = el.prop("selectionEnd")
		var text = el.val()
		var before = text.substring(0, start)
		var after  = text.substring(end, text.length)
		el.val(before + newText + after)
		el[0].selectionStart = el[0].selectionEnd = start + newText.length
		el.focus()
		return false
	}

	$('#clearFormula').click(function(){
		var v = $(this).val();
		$('#formulaText').val("X");
	});
	



	

	
	
	/* Logic for the input numbers entered for 3-tuple (Minimum Number, Spacing, Maximum Number)
	   The data validations are performed for each input text field and corresponding operations are performed 
	   During validations the messages are displayed on the html page - suggestions to the user
	   CSS styles are used by highlighting the fields with error*/   
    $('#minSpacingMaxInput,#minSpacingMinInput,#minSpacingSpacInput').change(function () {                  
				     
		/*reset for change in 3-tupple inputs*/
		$("#minSpacingMinInput").css("border-color","");
		$("#minSpacingSpacInput").css("border-color","");
		$("#minSpacingMaxInput").css("border-color","");
		$("#lblVectorErr").hide();
		$("#lblVectorErr2").hide();
		$("#lblVectorErr4").hide();


		var checkFlagMin;
		var checkFlagSpac;
		var checkFlagMax;
		var validFlagSpac ='Y';

		if ($("#minSpacingMinInput").val() !== '') {
			checkFlagMin = isNaN(parseFloat($("#minSpacingMinInput").val()));
		}

		if ($("#minSpacingSpacInput").val() !== '') {
			checkFlagSpac = isNaN(parseFloat($("#minSpacingSpacInput").val()));
		}

		if ($("#minSpacingMaxInput").val() !== '') {
			checkFlagMax = isNaN(parseFloat($("#minSpacingMaxInput").val()));
		}	

		
		if( (checkFlagMin === true)  || (checkFlagSpac === true) || (checkFlagMax === true) ) {
		 //disable Calculate Result Button and diplay an error message.
		  $("#lblVectorErr3").show();	
		  $("#calculateResult").prop("disabled",true);
		  validFlagSpac = 'N';
		} else {
		  $("#lblVectorErr3").hide();
		  $("#calculateResult").prop("disabled",false);
		  //validFlagSpac == 'Y';
		}	

		var min = parseFloat($("#minSpacingMinInput").val());
		var spac = parseFloat($("#minSpacingSpacInput").val());
		var max =  parseFloat($("#minSpacingMaxInput").val());
		
				

		if ((min >= max) && ($.trim($('#minSpacingMaxInput').val()) !== '')&& ($.trim($('#minSpacingMinInput').val()) !== '')) {
			$("#lblVectorErr").show();
			$(this).focus();
			$(this).css("border-color","red");
			validFlagSpac = 'N';
		}
		else {
			 $("#lblVectorErr").hide();
			 $(this).css("border-color","");
		}
         
		//lblVectorErr4 
		
		if (($.trim($('#minSpacingMaxInput').val()) !== '')&& ($.trim($('#minSpacingMinInput').val()) !== '')&& ($.trim($('#minSpacingSpacInput').val()) !== '')) {
          if((min<= 0) && (spac<= 0) && (max>= 0)) {
				$("#lblVectorErr4").show();
				$(this).css("border-color","red");
				validFlagSpac = 'N';
		    }else{
				$("#lblVectorErr4").hide();
				$(this).css("border-color","");
			}
		}
		 
		if ((spac >= max) && ($.trim($('#minSpacingMaxInput').val()) !== '') && ($.trim($('#minSpacingSpacInput').val()) !== '')) {
		 
			$("#lblVectorErr2").show();	
			$(this).focus();
			$(this).css("border-color","red");
			validFlagSpac = 'N';
		}
		else {
			 $("#lblVectorErr2").hide();
			 $(this).css("border-color","");
		}
			
		/*resetting*/	
		var text = "";
		var i = min;
		var j = 0;
		vectorArray = new Array();

		
		if((validFlagSpac === 'Y')&& ($.trim($('#minSpacingMinInput').val()) !== '') && ($.trim($('#minSpacingSpacInput').val()) !== '') && ($.trim($('#minSpacingMaxInput').val()) !== '') ){
			
			while(i<=max){
				 vectorArray[j] = i;
				j++;
				i=i+spac;
			}

		    
			
		} else {
			
			$("#calculateResult").prop("disabled",true);
		}
				
	});
			 
				
			
	/* Logic for the input numbers entered for 3-tuple (Minimum Number, Spacing, Number of elements)
	   The data validations are performed for each input text field and corresponding operations are performed 
	   During validations the messages are displayed on the html page - suggestions to the user
	   CSS styles are used by highlighting the fields with error*/  		
    
    $('#numSpacingMinInput,#numSpacingSpacInput,#numSpacingNumInput').change(function () {
	
		/*reset for change in 3-tupple inputs*/
		$("#numSpacingMinInput").css("border-color","");
		$("#numSpacingSpacInput").css("border-color","");
		$("#numSpacingNumInput").css("border-color","");
		$("#lblNumVectorErr").hide();
		$("#lblVectorErr").hide();
		$("#lblVectorErr2").hide();


		
		var checkFlagNumMin;
		var checkFlagNumSpac;
		var checkFlagNumMax;
		var validFlagNumSpac ='Y';

		if ($("#numSpacingMinInput").val() !== '') {
			checkFlagNumMin = isNaN(parseFloat($("#numSpacingMinInput").val()));
		}

		if ($("#numSpacingSpacInput").val() !== '') {
			checkFlagNumSpac = isNaN(parseFloat($("#numSpacingSpacInput").val()));
		}

		if ($("#numSpacingNumInput").val() !== '') {
			checkFlagNumMax = isNaN(parseFloat($("#numSpacingNumInput").val()));
		}	

		
		if( (checkFlagNumMin === true)  || (checkFlagNumSpac === true) || (checkFlagNumMax === true) ) {
			//disable Calculate Result Button and diplay an error message.
			$("#lblNumVectorErr3").show();	
			$("#calculateResult").prop("disabled",true);
			validFlagNumSpac = 'N';
		} else {
			$("#lblNumVectorErr3").hide();
			$("#calculateResult").prop("disabled",false);
			//validFlagNumSpac == 'Y';
		}	

		var min              = parseFloat($("#numSpacingMinInput").val());
		var spac             = parseFloat($("#numSpacingSpacInput").val());
		var numberofElements =  parseFloat($("#numSpacingNumInput").val());

		if((validFlagNumSpac == 'Y') && ($.trim($('#numSpacingMinInput').val()) !== '') && ($.trim($('#numSpacingSpacInput').val()) !== '') && ($.trim($('#numSpacingNumInput').val()) !== '') ){

		
			var text = "";
			var i;
			var j=min;
			
			vectorArray = new Array();

			for(i=0;i<numberofElements;i++){
				vectorArray[i] = j;

				j=j+spac;
		    }
						
				
		}		
     });
			
    });
	 
	
	
 $(function(){
	/*
	Function to calculate the result based on the formula selected 
	and the vector values. The formula entered is also validated and
	the error messages messages will be displayed accordingly  
	*/	
	$("#calculateResult").click(function () {	 	

	

	/* stackto hold braces*/
	var stack = [];
	//alert("stack");
	
    /* logic to check if the braces are balanced */
	var input1 = "'" + String($("#formulaText").val()) + "'";

	
	if(processExp(input1)) {
		$("#lblBracesError").hide();
	}else{
		$("#lblBracesError").show();
	}
	

	function processExp(exp)
	{
		for(var i =0;i<exp.length;i++)
		{
			if(exp[i] == '(' || exp[i] == '{' || exp[i] == '[')
				stack.push(exp[i]);
			else if(exp[i] == ')' || exp[i] == '}' || exp[i] == ']')
				{
				if(stack.length==0 || !isMatchingPair(stack[stack.length-1],exp[i]))
					return false;
				else
					stack.pop();
				}
		}
		if(stack.length==0)
			return true;
		else
			return false;
	}

	function isMatchingPair(ch1,ch2)
	{
		if(ch1 == '(' && ch2 == ')')
			return true;
		else if(ch1 == '{' && ch2 == '}')
			return true;
		else if(ch1 == '[' && ch2 == ']')
			return true;
		else
			return false;
	}

	



	function getAllMethods(object) {
		return Object.getOwnPropertyNames(object).filter(function(property) {
		return typeof object[property] == 'function';
	});
	}

	//alert(getAllMethods(Math));			

	var mathArray = new Array();
	//var texta;

	mathArray = getAllMethods(Math);


	



	var str1 = "'" + String($("#formulaText").val()) + "'"; 
	
	//alert(str1 + "str1 before");

	for(l=0;l<mathArray.length;l++){
		if(str1.toLowerCase().indexOf(mathArray[l]) != -1){
			var oldVar = mathArray[l];

			var newVar = "Math."+ mathArray[l];
              
			  
			str1.replace(/['"]+/g, '');

			

            var regex = new RegExp(mathArray[l], 'g');

            str1 = str1.replace(regex, newVar);
			
			

		}
	}  
	
	//alert(str1 + "str1 after");

	var str2 = "";
	var rest;
	var errorCaught='';
	$("#formulaError").hide();
    $("#formulaText").css("border-color","");

	var finalResultArray = new Array();
	var n= 0;
	for(m=0;m<vectorArrayFinal.length;m++){
	   //alert(vectorArrayFinal[m] + "loopcount");

		X = vectorArrayFinal[m]; 

		var str3 = str1;
				
		try {
		   var finalResult = eval(str3.replace(/['"]+/g, '')); //str2
		     			 
			 var checkValidNbr = isNaN(eval(str3.replace(/['"]+/g, '')));
			 
		    if(checkValidNbr=== true){
				errorCaught='Y';
				$("#formulaError").show();
		        $("#formulaText").css("border-color","red");
		        break;
			}
		} catch(err) {
		   
		   errorCaught='Y'
		   //formulaError
		   $("#formulaError").show();
		   $("#formulaText").css("border-color","red");
		   break;
		}
		
		
		finalResultArray[m] = finalResult;
		
	}

	/* Logic to create Table and graph with results */
	
	$("#table_div").empty();
	if (errorCaught=='')	{    
		
		$("#table_div").append("<tr><th>Input Vector</th><th>Output Vector</th></tr>");
		for(m=0;m<vectorArrayFinal.length;m++){
			$("#table_div").append("<tr><td>"+ vectorArrayFinal[m]+"</td><td>"+finalResultArray[m]+"</td></tr>");
		}
		$("#table_div").append("</table>");

		google.charts.setOnLoadCallback(drawChart);
		function drawChart() {
			
			var counterArray = new Array(); 

			for(i=0;i<vectorArrayFinal.length;i++){
			  counterArray[i] = i+1;
			}

			var count = counterArray; 
			var input = vectorArrayFinal;
			var output = finalResultArray;


			var data = new google.visualization.DataTable();
			data.addColumn('number', 'count');
			data.addColumn('number', 'input');
			data.addColumn('number', 'output');

			for(i = 0; i < count.length; i++){
				data.addRow([count[i], input[i],output[i]]); 
			}

			var options = {
				chart: {
				title: 'Comparision of Vectors',
				
			},
				width: 600,
				height: 500,

			};

				var chart = new google.charts.Bar(document.getElementById('columnchart_material')); //Bar Line
				chart.draw(data, options);
		}


	
	vectorArrayFinal = new Array();
    }

	});	//when the user clicks on Calculate Result button



});
	
	