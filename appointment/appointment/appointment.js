$(document).ready((function(){
	getAppointments();
	btnSwitch();
	  
	$("#btnNew").click(function(){
		$("#btnAdd").show();
 		$("#btnCancel").show();
		$("#appointmentForm").show();
		$("#btnNew").hide();						   
	});
	
	$("#submitForm").validate({ 
	
	 
			rules: {   
			
				appointmentDate: {
					
					required: true,
				},
				        
				appointmentTime: {
					required: true,
					
				},
				appointmentDescription: {
					required:  true
				}
			},
			messages: {
				 appointmentDate: "Please choose date",
				 appointmentTime: "Please enter time.",
    			 appointmentDescription: "Please enter a description.",
			},
			errorElement : 'div',
			errorLabelContainer: '.alert-danger',
			
		submitHandler: function(form) {
		  
		  var appDate = $("#appointmentDate").val();
		  var appTime = $("#appointmentTime").val();
		  var appDescription = $("#appointmentDescription").val();
		$.ajax('http://localhost:8082/appointment/insertData.pl',{
					"type": "POST", 
					dataType:"JSON",		
					"data": {
						appDate:appDate,
						appTime:appTime,
						appDescription:appDescription
					},
					"success":getAppointments,
					"error":failure
		});
		}
	  });
	  
	$("#btnCancel").click(function(){
		btnSwitch();
		$("#btnNew").show();						   
	});
	
	$("#btnSearch").click(function(){

	var searchData=$("#appointmentSearch").val();
	$.ajax('http://localhost:8082/appointment/searchSelect.pl',{
				"type": "GET", 
				dataType:"JSON",		
				"data": {searchData:searchData},
				"success":loadOnSuccess,
				"error":failure
	});
	});
  
	$('.datepicker').datepicker({
		format: 'mm/dd/yyyy',
		startDate: '-1d',
		todayHighlight: true,
        autoclose: true,
	});
	
	$('#appointmentTime').timepicker();
}));

function btnSwitch(){
	
	$("#appointmentForm").hide();
	
	$("#btnAdd").hide();
	$("#btnCancel").hide();
	
};

function getAppointments(){
	$.ajax('http://localhost:8082/appointment/searchSelect.pl',{
		"type": "GET", 
		dataType:"JSON",		
		"data": '',
		"success":loadOnSuccess,
		"error":failure
	});
}

function loadOnSuccess(data){
	if(data.length==0){
		failure();
	}
	else { 
		var tableData='<table border="2" class=""table table-hover""><tr><td colspan="3" align="center"><strong>Appointment Table</strong></td></tr>';
			tableData+='<tr><th>Appointment Date</th><th>Appointment Time </th><th>Description</th></tr>';		
			$.each(data,function(index,item){
				var datetime = data[index].datetime.split(' ');
				tableData+='<tr>';
				tableData+='<td>'+datetime[0]+'</td>';
				tableData+='<td>'+datetime[1]+'</td>';
				tableData+='<td>'+item.description+'</td>';
				tableData+='</tr>';
			});
	tableData+='</table>';
	$('#displayAppointment').html(tableData);
  }
}

function failure(){
	var noDataError='No Appointment scheduled in the System. Please Enter Appointment/s';		
	$('#displayAppointment').html(noDataError);
}