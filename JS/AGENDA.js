$(document).ready(function(){

	//SE VERIFICA QUE HAYA UN USUARIO CONECTADO
	if(localStorage.getItem('usuario') != null && localStorage.getItem('usuario') != ""){
	
		//SE MUESTRA USUARIO CONECTADO
		$('#usu_tag').text(localStorage.getItem('usuario'));
	}
	else{
		window.location.href = "/AGENDA/INDEX.html";
	}

	//INICIALIZAR CALENDARIO
	var calendarEl = document.getElementById('calendario');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });

    //VALIDAR SI HAY EVENTOS YA REGISTRADOS
	if(localStorage.getItem('eventos') != null){
		var temp_events = JSON.parse(localStorage.getItem('eventos'));

		for(var i = 0; i < temp_events.datos.length; i++){

			var fecha = temp_events.datos[i]['fecha'].split('/');
			fecha = fecha[2] + '-' + fecha[0] + '-' + fecha[1];
			var horario = temp_events.datos[i]['horario'].split('-');

			$('#calendario').html('');

		 	var titulo = temp_events.datos[i]['nombre'] + ' ' + temp_events.datos[i]['ap'] + ' - ' + temp_events.datos[i]['medico'];
		 	var start = fecha + ' ' + horario[0];
		 	var end = fecha + ' ' + horario[1];

		 	calendar.addEvent({
		        title: titulo,
		        start: start,
		        end: end
		    });
		}
	}
  
    calendar.render();

	//INICIALIZAR DATEPICKER
	$("#fecha").datepicker();

	//CIERRE DE SESION
	$('#logout').on('click', function(){

		localStorage.setItem('usuario', '');
		window.location.href = "/AGENDA/INDEX.html";
	});

	//BOTON MODAL AGENDAR
	$('#registrar').on('click', function(){

		//VALIDAR SI HAY EVENTOS YA REGISTRADOS
		if(localStorage.getItem('eventos') != null){

			//AÑADIR INFORMACION NUEVA
			var eventos = JSON.parse(localStorage.getItem('eventos'));
			var cont = eventos.datos.length;

			eventos.datos[cont] = {
				'nombre': $('#nombre').val(),
				'ap': $('#ap').val(),
				'am': $('#ap').val(),
				'edad': $('#edad').val(),
				'fecha': $('#fecha').val(),
				'horario': $('#horario').val(),
				'localidad': $('#localidad').val(),
				'correo': $('#correo').val(),
				'tel': $('#tel').val(),
				'medio': $('#medio').val(),
				'medico': $('#medico').val(),
				'observacion': $('#observacion').val()
			}

			localStorage.setItem('eventos', JSON.stringify(eventos));
			alert('Nueva cita agendada!');

			var fecha = $('#fecha').val().split('/');
			fecha = fecha[2] + '-' + fecha[0] + '-' + fecha[1];
			var horario = $('#horario').val().split('-');

			$('#calendario').html('');

		 	var titulo = $('#nombre').val() + ' ' + $('#ap').val() + ' ' + $('#medico').val();
		 	var start = fecha + ' ' + horario[0];
		 	var end = fecha + ' ' + horario[1];

		 	calendar.addEvent({
		        title: titulo,
		        start: start,
		        end: end
		    });

		}
		else{

			//REGISTRAR INFORMACION
			var datos = [];
	        var evento = {};

			datos.push({
				'nombre': $('#nombre').val(),
				'ap': $('#ap').val(),
				'am': $('#am').val(),
				'edad': $('#edad').val(),
				'fecha': $('#fecha').val(),
				'horario': $('#horario').val(),
				'localidad': $('#localidad').val(),
				'correo': $('#correo').val(),
				'tel': $('#tel').val(),
				'medio': $('#medio').val(),
				'medico': $('#medico').val(),
				'observacion': $('#observacion').val()
			});

			evento.datos = datos;

			localStorage.setItem('eventos', JSON.stringify(evento));
			alert('Nueva cita agendada!');

			var fecha = $('#fecha').val().split('/');
			fecha = fecha[2] + '-' + fecha[0] + '-' + fecha[1];
			var horario = $('#horario').val().split('-');

			$('#calendario').html('');

		 	var titulo = $('#nombre').val() + ' ' + $('#ap').val() + ' ' + $('#medico').val();
		 	var start = fecha + ' ' + horario[0];
		 	var end = fecha + ' ' + horario[1];

		 	calendar.addEvent({
		        title: titulo,
		        start: start,
		        end: end
		    });

		}

		$('#cancelar').trigger('click');
	});
});