$(document).ready(function(){

	$('#registrar').on('click', function(){

		//VALIDAR CORREO ELECTRONICO
		if($("#usuario").val().indexOf('@', 0) == -1 || $("#usuario").val().indexOf('.com', 0) == -1) {
            
            alert('El correo electr\u00F3nico introducido no es correcto.');
        }
        else{

        	var cont = 0;

            //VALIDAR SI HAY USUARIOS YA REGISTRADOS
            if(localStorage.getItem('usuarios') != null){

            	console.log('ya hay datos');

            	var usuarios = JSON.parse(localStorage.getItem('usuarios'));
            	var cont = usuarios.datos.length;
            	var usu_temp = false;

            	//VALIDAR SI EXISTE EL CORREO
            	
            	for(var i = 0; i < cont; i++){

            		if(usuarios.datos[i]['usuario'] == $('#usuario').val()){
            			alert('Usuario ya existente!');
            			return false; //cancela el proceso completo
            		}
            	}
            	
            	//VALIDAR PASSWORD
        		if($('#pass').val() != undefined && $('#pass').val() != null && $('#pass').val() != ""){
        			
        			//SE AGREGA NUEVO REGISTRO A LOS YA EXISTENTES
        			usuarios.datos[cont] = {
        				'usuario': $('#usuario').val(),
        				'clave': $('#pass').val()
        			}

        			localStorage.setItem('usuarios', JSON.stringify(usuarios));
					console.log('json: ' + localStorage.getItem('usuarios'));

					alert('usuario registrado!');
            	}
            	else{

            		alert('Introduzca una clave, por favor.');
            	}
            }
            else{

            	//VALIDAR PASSWORD

        		if($('#pass').val() != undefined && $('#pass').val() != null && $('#pass').val() != ""){

	        		var datos = [];
	        		var objeto = {};

	        		//AGREGAR DATOS NUEVOS AL ARRAY
	        		datos.push({

	        			'usuario': $('#usuario').val(),
	        			'clave': $('#pass').val()
	        		});

	        		objeto.datos = datos;

	        		//ACTUALIZAR DATOS NUEVOS
	        		localStorage.setItem('usuarios', JSON.stringify(objeto));
	        		localStorage.setItem('usuario', $('#usuario').val());

        			window.location.href = "/AGENDA/AGENDA.html";
	        	}
	        	else{

	        		alert('Introduzca una clave, por favor.');
	        	}
	        }

        }

	});

	$('#login').on('click', function(){

		var usu = $('#usuario').val();
      	var usu_temp = false;
      	var pass_temp = false;
		
		//VALIDAR MAIL
		if(usu.indexOf('@', 0) == -1 || usu.indexOf('.com', 0) == -1) {
            
            alert('El correo electr\u00F3nico introducido no es correcto.');
        }
        else{

        	//VALIDAR CAMPO PASSWORD NO ESTE VACIO
        	if($('#pass').val() != undefined && $('#pass').val() != null && $('#pass').val() != ""){

        		var pass = $('#pass').val();
        		var usuarios = JSON.parse(localStorage.getItem('usuarios'));

        		//VERIFICAR SI HAY DATOS ALMACENADOS
        		if(usuarios == null){
        			alert('No existen usuarios registrados!')
        			return false; // SE DETIENE EL PROCESO
        		}

        		//VALIDAR DATOS CON DATOS ALMACENADOS
        		for(var i = 0; i < usuarios.datos.length; i++){

        			if(usuarios.datos[i]['usuario'] == usu){

        				usu_temp = true;

        				//VALIDAR PASSWORD INGRESADO CON EL ALMACENADO
        				for(var x = 0; x < usuarios.datos.length; x++){

        					if(usuarios.datos[i]['clave'] == pass){

        						localStorage.setItem('usuario', usu);
        						window.location.href = "/AGENDA/AGENDA.html";
        						pass_temp = true;
        					}
        				}
        			}
        		}

        		//REGRESAR ALERTA
        		if(usu_temp){

        			if(pass_temp == false){

        				alert('Clave incorrecta!');
        			}

        		}
        		else{
        			alert('Correo no registrado!');
        		}
        	}
        	else{
        		alert('Introduzca una clave, por favor.');
        	}
        }
		
	});

});